import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const JWT_SECRET = process.env.JWT_SECRET || '';
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(__dirname, 'uploads'));
const DB_PATH = path.resolve(process.env.DATABASE_PATH || path.join(__dirname, 'data', 'portfolio.sqlite'));
const IS_PROD = process.env.NODE_ENV === 'production';

if (!ADMIN_EMAIL || !JWT_SECRET || JWT_SECRET.length < 32) {
  console.warn('CONFIG WARNING: Set ADMIN_EMAIL and a strong JWT_SECRET (at least 32 characters).');
}
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS projects (
 id TEXT PRIMARY KEY, title TEXT NOT NULL, type TEXT DEFAULT '', description TEXT DEFAULT '',
 technologies TEXT NOT NULL DEFAULT '[]', projectUrl TEXT DEFAULT '', githubUrl TEXT DEFAULT '',
 sortOrder INTEGER NOT NULL DEFAULT 0, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS otp_challenges (
 email TEXT PRIMARY KEY, hash TEXT NOT NULL, expiresAt INTEGER NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0, sentAt INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS audit_log (
 id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL, detail TEXT NOT NULL, createdAt TEXT NOT NULL
);
`);

const now = () => new Date().toISOString();
const settingGet = db.prepare('SELECT value FROM settings WHERE key = ?');
const settingSet = db.prepare(`INSERT INTO settings(key,value,updated_at) VALUES(?,?,?)
 ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at`);
function getSetting(key, fallback = '') {
 const row = settingGet.get(key);
 return row ? row.value : fallback;
}
function setSetting(key, value) { settingSet.run(key, String(value), now()); }
function audit(action, detail) {
 db.prepare('INSERT INTO audit_log(action,detail,createdAt) VALUES(?,?,?)').run(action, detail, now());
}

const DEFAULT_PROJECTS = [
 {id:'owntag',title:'owntag.in',type:'FULL STACK WEB APPLICATION',description:'A real-world web application developed as part of my full-stack development journey.',technologies:['React.js','Spring Boot','PostgreSQL'],projectUrl:'https://www.owntag.in',githubUrl:''},
 {id:'portfolio',title:'Portfolio Website',type:'PERSONAL PROJECT',description:'A responsive developer portfolio built to showcase my skills, projects, education and development journey.',technologies:['Python','Django','PostgreSQL'],projectUrl:'https://vajrabilash.in',githubUrl:'https://github.com/vajrabilash-Degapogu/portfolio-frontend'},
 {id:'crud',title:'Python CRUD Application',type:'PYTHON PROJECT',description:'A practical CRUD application built while developing Python programming and backend development fundamentals.',technologies:['Python','Django','PostgreSQL'],projectUrl:'',githubUrl:''}
];
if (!settingGet.get('profileImage')) setSetting('profileImage', '');
if (!settingGet.get('resumeUrl')) setSetting('resumeUrl', '');
if (!settingGet.get('faviconUrl')) setSetting('faviconUrl', '');
if (!settingGet.get('siteTitle')) setSetting('siteTitle', 'Vajrabilash Degapogu | Python Developer');
if (!settingGet.get('siteDescription')) setSetting('siteDescription', 'Explore my portfolio, projects, skills, and software development work.');
if (db.prepare('SELECT count(*) AS count FROM projects').get().count === 0) {
 const ins = db.prepare(`INSERT INTO projects(id,title,type,description,technologies,projectUrl,githubUrl,sortOrder,createdAt,updatedAt)
 VALUES(@id,@title,@type,@description,@technologies,@projectUrl,@githubUrl,@sortOrder,@createdAt,@updatedAt)`);
 const tx = db.transaction(() => DEFAULT_PROJECTS.forEach((p,i) => ins.run({...p,technologies:JSON.stringify(p.technologies),sortOrder:i,createdAt:now(),updatedAt:now()})));
 tx();
}

app.set('trust proxy', IS_PROD ? 1 : false);
app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));
app.use(cors({origin: FRONTEND_ORIGIN.split(',').map(s=>s.trim()), credentials:true}));
app.use(express.json({limit:'1mb'}));
app.use(cookieParser());
app.use('/uploads', express.static(UPLOAD_DIR, {fallthrough:false, maxAge: IS_PROD ? '1d' : 0}));
app.get('/api/health', (_req,res)=>res.json({ok:true,service:'portfolio-admin-api'}));

const otpLimiter = rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:true,legacyHeaders:false,message:{error:'Too many OTP requests. Please try again later.'}});
const verifyLimiter = rateLimit({windowMs:15*60*1000,limit:10,standardHeaders:true,legacyHeaders:false,message:{error:'Too many attempts. Please try again later.'}});
const authLimiter = rateLimit({windowMs:15*60*1000,limit:100,standardHeaders:true,legacyHeaders:false});
function cookieOptions() { return {httpOnly:true,secure:IS_PROD,sameSite:'lax',path:'/',maxAge:8*60*60*1000}; }
function requireAdmin(req,res,next) {
 const token = req.cookies?.portfolio_admin;
 if (!token) return res.status(401).json({error:'Please sign in again.'});
 try {
   const payload = jwt.verify(token, JWT_SECRET, {issuer:'portfolio-admin-api',audience:'portfolio-admin'});
   if (payload.email !== ADMIN_EMAIL || payload.role !== 'admin') throw new Error('Invalid role');
   req.admin = payload;
   next();
 } catch {
   res.clearCookie('portfolio_admin', cookieOptions());
   return res.status(401).json({error:'Session expired. Please sign in again.'});
 }
}
function safeProject(row) { return {...row,technologies:JSON.parse(row.technologies || '[]')}; }
function allProjects() { return db.prepare('SELECT * FROM projects ORDER BY sortOrder ASC, createdAt DESC').all().map(safeProject); }
function publicConfig() {
 return {
  profileImage:getSetting('profileImage'),
  resumeUrl:getSetting('resumeUrl'),
  faviconUrl:getSetting('faviconUrl'),
  siteTitle:getSetting('siteTitle'),
  siteDescription:getSetting('siteDescription'),
  projects:allProjects()
 };
}
app.get('/api/public', (_req,res)=>res.json(publicConfig()));
app.get('/api/public/changes', (_req,res)=>res.json(db.prepare('SELECT action,detail,createdAt FROM audit_log ORDER BY id DESC LIMIT 20').all()));

app.post('/api/auth/request-otp',otpLimiter,async(req,res)=>{
 const email=String(req.body?.email||'').trim().toLowerCase();
 if(!email||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return res.status(400).json({error:'Enter a valid email address.'});
 if(!ADMIN_EMAIL||JWT_SECRET.length<32||email!==ADMIN_EMAIL) return res.status(200).json({message:'If this address is authorised, a one-time code will be sent.'});
 const previous=db.prepare('SELECT sentAt FROM otp_challenges WHERE email=?').get(email);
 if(previous&&Date.now()-previous.sentAt<60_000) return res.status(429).json({error:'Please wait 60 seconds before requesting another code.'});
 const ready=process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS&&process.env.MAIL_FROM;
 if(!ready) return res.status(503).json({error:'Email delivery is not configured. Add SMTP settings to the backend environment.'});
 const code=String(crypto.randomInt(0,1_000_000)).padStart(6,'0');
 const hash=await bcrypt.hash(code,10);
 db.prepare(`INSERT INTO otp_challenges(email,hash,expiresAt,attempts,sentAt) VALUES(?,?,?,0,?)
 ON CONFLICT(email) DO UPDATE SET hash=excluded.hash,expiresAt=excluded.expiresAt,attempts=0,sentAt=excluded.sentAt`).run(email,hash,Date.now()+5*60*1000,Date.now());
 try {
  const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||465),secure:String(process.env.SMTP_SECURE||'true')==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
  await transporter.sendMail({from:process.env.MAIL_FROM,to:email,subject:'Your portfolio admin sign-in code',
   text:'Your sign-in code is '+code+'. It expires in 5 minutes. If you did not request it, ignore this email.',
   html:'<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px"><h2>Portfolio Admin</h2><p>Your sign-in code is:</p><p style="font-size:32px;font-weight:700;letter-spacing:8px">'+code+'</p><p>This code expires in 5 minutes. Never share it with anyone.</p></div>'});
  audit('OTP requested','Administrator requested an email login code.');
  return res.json({message:'If this address is authorised, a one-time code will be sent.'});
 } catch(err) {
  console.error('SMTP send failed:',err?.message||err);
  return res.status(502).json({error:'Unable to send email right now. Check SMTP configuration.'});
 }
});
app.post('/api/auth/verify-otp',verifyLimiter,async(req,res)=>{
 const email=String(req.body?.email||'').trim().toLowerCase();
 const code=String(req.body?.code||'').trim();
 if(!ADMIN_EMAIL||JWT_SECRET.length<32||email!==ADMIN_EMAIL||!/^\\d{6}$/.test(code)) return res.status(401).json({error:'Invalid or expired code.'});
 const row=db.prepare('SELECT * FROM otp_challenges WHERE email=?').get(email);
 if(!row||row.expiresAt<Date.now()||row.attempts>=5) {
  db.prepare('DELETE FROM otp_challenges WHERE email=?').run(email);
  return res.status(401).json({error:'Invalid or expired code.'});
 }
 if(!await bcrypt.compare(code,row.hash)) {
  db.prepare('UPDATE otp_challenges SET attempts=attempts+1 WHERE email=?').run(email);
  return res.status(401).json({error:'Invalid or expired code.'});
 }
 db.prepare('DELETE FROM otp_challenges WHERE email=?').run(email);
 const token=jwt.sign({email,role:'admin'},JWT_SECRET,{expiresIn:'8h',issuer:'portfolio-admin-api',audience:'portfolio-admin'});
 res.cookie('portfolio_admin',token,cookieOptions());
 audit('Login','Administrator signed in using email OTP.');
 res.json({ok:true,email});
});
app.get('/api/auth/me',authLimiter,requireAdmin,(req,res)=>res.json({ok:true,email:req.admin.email}));
app.post('/api/auth/logout',authLimiter,(req,res)=>{res.clearCookie('portfolio_admin',cookieOptions());res.json({ok:true});});

const allowedTypes=new Map([['image/jpeg','jpg'],['image/png','png'],['image/webp','webp'],['image/svg+xml','svg'],['image/x-icon','ico'],['image/vnd.microsoft.icon','ico'],['application/pdf','pdf']]);
const storage=multer.diskStorage({destination:(_req,_file,cb)=>cb(null,UPLOAD_DIR),filename:(_req,file,cb)=>cb(null,crypto.randomUUID()+'.'+(allowedTypes.get(file.mimetype)||'bin'))});
const upload=multer({storage,limits:{fileSize:5*1024*1024,files:1},fileFilter:(_req,file,cb)=>{
 const isPdf=file.mimetype==='application/pdf'&&/\\.pdf$/i.test(file.originalname);
 const isImg=file.mimetype.startsWith('image/')&&/\\.(jpe?g|png|webp|svg|ico)$/i.test(file.originalname);
 if((!isPdf&&!isImg)||!allowedTypes.has(file.mimetype)) return cb(new Error('Only PDF resumes or JPG, PNG, WebP, SVG, and ICO images are allowed.'));
 cb(null,true);
}});
app.post('/api/admin/upload/:kind',requireAdmin,upload.single('file'),(req,res)=>{
 const kind=req.params.kind;
 if(!['resume','profile','favicon'].includes(kind)){if(req.file)fs.unlinkSync(req.file.path);return res.status(400).json({error:'Unknown upload type.'});}
 if(!req.file)return res.status(400).json({error:'Choose a file to upload.'});
 if(kind==='resume'&&req.file.mimetype!=='application/pdf'){fs.unlinkSync(req.file.path);return res.status(400).json({error:'Resume must be a PDF.'});}
 if(kind!=='resume'&&req.file.mimetype==='application/pdf'){fs.unlinkSync(req.file.path);return res.status(400).json({error:'Choose an image file.'});}
 const url='/uploads/'+path.basename(req.file.filename);
 const key={resume:'resumeUrl',profile:'profileImage',favicon:'faviconUrl'}[kind];
 setSetting(key,url);
 audit('Updated '+kind,kind==='resume'?'Uploaded a replacement resume.':kind==='profile'?'Changed the profile image.':'Changed the site favicon.');
 res.json({ok:true,kind,url});
});
app.put('/api/admin/settings',requireAdmin,(req,res)=>{
 const allowed=['siteTitle','siteDescription'];
 const entries=Object.entries(req.body||{});
 for(const [key,value] of entries) {
  if(!allowed.includes(key)) return res.status(400).json({error:'Unsupported setting: '+key});
  if(typeof value!=='string'||value.length>250) return res.status(400).json({error:'Setting value is invalid or too long.'});
 }
 for(const [key,value] of entries)setSetting(key,value);
 if(entries.length)audit('Updated site metadata','Updated '+entries.map(e=>e[0]).join(', ')+'.');
 res.json({ok:true,config:publicConfig()});
});
app.get('/api/admin/projects',requireAdmin,(_req,res)=>res.json({projects:allProjects()}));
function validateProject(body) {
 const title=String(body?.title||'').trim(), type=String(body?.type||'').trim(), description=String(body?.description||'').trim();
 const projectUrl=String(body?.projectUrl||'').trim(), githubUrl=String(body?.githubUrl||'').trim();
 let technologies=body?.technologies;
 if(typeof technologies==='string')technologies=technologies.split(',').map(s=>s.trim()).filter(Boolean);
 if(!Array.isArray(technologies))technologies=[];
 technologies=technologies.map(t=>String(t).trim()).filter(Boolean).slice(0,20);
 const urlOk=u=>!u||/^https:\\/\\//i.test(u);
 if(!title||title.length>120)return{error:'Project title is required (maximum 120 characters).'};
 if(type.length>100||description.length>3000)return{error:'Project type or description is too long.'};
 if(!urlOk(projectUrl)||!urlOk(githubUrl))return{error:'Project and GitHub links must use HTTPS.'};
 return{value:{title,type,description,projectUrl,githubUrl,technologies}};
}
app.post('/api/admin/projects',requireAdmin,(req,res)=>{
 const p=validateProject(req.body);if(p.error)return res.status(400).json({error:p.error});
 const count=db.prepare('SELECT count(*) AS count FROM projects').get().count;
 const item={...p.value,id:crypto.randomUUID(),sortOrder:count,createdAt:now(),updatedAt:now()};
 db.prepare(`INSERT INTO projects(id,title,type,description,technologies,projectUrl,githubUrl,sortOrder,createdAt,updatedAt)
 VALUES(@id,@title,@type,@description,@technologies,@projectUrl,@githubUrl,@sortOrder,@createdAt,@updatedAt)`).run({...item,technologies:JSON.stringify(item.technologies)});
 audit('Added project','Added project: '+item.title);
 res.status(201).json({project:item});
});
app.put('/api/admin/projects/:id',requireAdmin,(req,res)=>{
 const p=validateProject(req.body);if(p.error)return res.status(400).json({error:p.error});
 const existing=db.prepare('SELECT * FROM projects WHERE id=?').get(req.params.id);
 if(!existing)return res.status(404).json({error:'Project not found.'});
 const item={...p.value,id:existing.id,sortOrder:existing.sortOrder,createdAt:existing.createdAt,updatedAt:now()};
 db.prepare(`UPDATE projects SET title=@title,type=@type,description=@description,technologies=@technologies,projectUrl=@projectUrl,githubUrl=@githubUrl,updatedAt=@updatedAt WHERE id=@id`).run({...item,technologies:JSON.stringify(item.technologies)});
 audit('Edited project','Updated project: '+item.title);
 res.json({project:item});
});
app.delete('/api/admin/projects/:id',requireAdmin,(req,res)=>{
 const existing=db.prepare('SELECT title FROM projects WHERE id=?').get(req.params.id);
 if(!existing)return res.status(404).json({error:'Project not found.'});
 db.prepare('DELETE FROM projects WHERE id=?').run(req.params.id);
 audit('Deleted project','Deleted project: '+existing.title);
 res.json({ok:true});
});
app.get('/api/admin/changes',requireAdmin,(_req,res)=>res.json({changes:db.prepare('SELECT id,action,detail,createdAt FROM audit_log ORDER BY id DESC LIMIT 100').all()}));
app.use((err,_req,res,_next)=>{
 if(err instanceof multer.MulterError)return res.status(400).json({error:err.code==='LIMIT_FILE_SIZE'?'File must be 5 MB or smaller.':'Upload limit exceeded.'});
 if(err){const status=err.status||500;if(status>=500)console.error(err);return res.status(status).json({error:status>=500?'Server error. Check backend logs.':err.message||'Request failed.'});}
 return res.status(500).json({error:'Unexpected server error.'});
});
app.listen(PORT,()=>console.log('Portfolio admin API listening on port '+PORT));
