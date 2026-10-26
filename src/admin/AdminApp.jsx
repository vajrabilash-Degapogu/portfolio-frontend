import { useEffect, useState } from 'react';
import { apiRequest, assetUrl } from './adminApi';
import './admin.css';

const blankProject = { id:'', title:'', type:'PERSONAL PROJECT', description:'', technologies:'', projectUrl:'', githubUrl:'' };
const sections = [['overview','Overview'],['projects','Projects'],['media','Resume & images'],['settings','Site settings'],['changes','Changes']];

function AdminApp() {
  const [user,setUser] = useState(null);
  const [email,setEmail] = useState('');
  const [code,setCode] = useState('');
  const [step,setStep] = useState('email');
  const [section,setSection] = useState('overview');
  const [config,setConfig] = useState(null);
  const [projects,setProjects] = useState([]);
  const [changes,setChanges] = useState([]);
  const [draft,setDraft] = useState(blankProject);
  const [editing,setEditing] = useState(false);
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);

  async function refresh() {
    const c = await apiRequest('/api/public'); setConfig(c);
    const p = await apiRequest('/api/admin/projects'); setProjects(p.projects || []);
  }
  useEffect(() => { apiRequest('/api/auth/me').then(async u => { setUser(u); await refresh(); }).catch(() => {}); }, []);
  useEffect(() => { if (user && section === 'changes') apiRequest('/api/admin/changes').then(d=>setChanges(d.changes || [])).catch(e=>setStatus(e.message)); }, [user,section]);

  async function requestCode(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    try { const r=await apiRequest('/api/auth/request-otp',{method:'POST',body:{email}}); setStep('code'); setStatus(r.message || 'Check your email for a code.'); }
    catch(e) { setStatus(e.message); } finally { setBusy(false); }
  }
  async function verifyCode(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    try { const r=await apiRequest('/api/auth/verify-otp',{method:'POST',body:{email,code}}); setUser(r); await refresh(); setStatus('Signed in successfully.'); }
    catch(e) { setStatus(e.message); } finally { setBusy(false); }
  }
  async function logout() {
    await apiRequest('/api/auth/logout',{method:'POST'}).catch(()=>{});
    setUser(null); setStep('email'); setCode(''); setStatus('Signed out.');
  }
  function editProject(project) {
    setDraft({...project,technologies:(project.technologies || []).join(', ')});
    setEditing(true); window.scrollTo({top:0,behavior:'smooth'});
  }
  async function saveProject(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    const body={...draft,technologies:draft.technologies.split(',').map(t=>t.trim()).filter(Boolean)};
    try {
      await apiRequest(draft.id ? `/api/admin/projects/${encodeURIComponent(draft.id)}` : '/api/admin/projects',{method:draft.id?'PUT':'POST',body});
      setDraft(blankProject); setEditing(false); await refresh(); setStatus('Project saved.');
    } catch(e) { setStatus(e.message); } finally { setBusy(false); }
  }
  async function deleteProject(p) {
    if(!window.confirm(`Delete "${p.title}"?`)) return;
    try { await apiRequest(`/api/admin/projects/${encodeURIComponent(p.id)}`,{method:'DELETE'}); await refresh(); setStatus('Project deleted.'); }
    catch(e) { setStatus(e.message); }
  }
  async function upload(kind,file) {
    if(!file) return;
    const form=new FormData(); form.append('file',file); setBusy(true); setStatus('');
    try { await apiRequest(`/api/admin/upload/${kind}`,{method:'POST',body:form}); await refresh(); setStatus(`${kind[0].toUpperCase()+kind.slice(1)} updated successfully.`); }
    catch(e) { setStatus(e.message); } finally { setBusy(false); }
  }
  async function saveSettings(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    try { const r=await apiRequest('/api/admin/settings',{method:'PUT',body:{siteTitle:config.siteTitle,siteDescription:config.siteDescription}}); setConfig(r.config); setStatus('Site settings saved.'); }
    catch(e) { setStatus(e.message); } finally { setBusy(false); }
  }

  if(!user) return <main className="pa-login-shell"><section className="pa-login-card">
    <div className="pa-mark">VD<span>.</span></div><p className="pa-eyebrow">PRIVATE WORKSPACE</p><h1>Portfolio admin</h1>
    <p className="pa-muted">Sign in with the authorised owner email to manage your portfolio.</p>
    {step==='email' ? <form onSubmit={requestCode}><label>Email address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="owner@example.com" required autoComplete="email"/><button disabled={busy}>{busy?'Sending…':'Send one-time code'}</button></form> :
    <form onSubmit={verifyCode}><label>Six-digit code</label><input inputMode="numeric" pattern="[0-9]{6}" maxLength="6" value={code} onChange={e=>setCode(e.target.value.replace(/\\D/g,'').slice(0,6))} placeholder="000000" required autoComplete="one-time-code"/><button disabled={busy}>{busy?'Verifying…':'Verify and sign in'}</button><button type="button" className="pa-link-button" onClick={()=>{setStep('email');setCode('');}}>Use another email</button></form>}
    {status && <p className="pa-status" role="status">{status}</p>}<p className="pa-footnote">Codes expire after 5 minutes. Never share your code.</p>
  </section></main>;

  return <main className="pa-shell">
    <aside className="pa-sidebar"><a className="pa-brand" href="/">VD<span>.</span> <small>ADMIN</small></a><p className="pa-nav-label">WORKSPACE</p>
      {sections.map(([id,label])=><button key={id} className={section===id?'active':''} onClick={()=>setSection(id)}>{label}</button>)}
      <div className="pa-sidebar-bottom"><span>{user.email}</span><button className="pa-logout" onClick={logout}>Sign out ↗</button></div>
    </aside>
    <section className="pa-main">
      <header className="pa-header"><div><p className="pa-eyebrow">PORTFOLIO CONTROL CENTER</p><h1>{sections.find(s=>s[0]===section)?.[1]}</h1></div><a href="/" target="_blank" rel="noreferrer">View live site ↗</a></header>
      {status && <div className="pa-alert" role="status">{status}<button onClick={()=>setStatus('')} aria-label="Dismiss status">×</button></div>}
      {section==='overview' && <><div className="pa-welcome"><div><p className="pa-eyebrow">WELCOME BACK</p><h2>Keep your portfolio current.</h2><p>Manage the projects, resume and visual identity shown to visitors.</p></div><div className="pa-welcome-icon">✳</div></div><div className="pa-stat-grid"><div><span>PROJECTS</span><strong>{projects.length}</strong></div><div><span>RESUME</span><strong>{config?.resumeUrl?'Uploaded':'Not uploaded'}</strong></div><div><span>PROFILE IMAGE</span><strong>{config?.profileImage?'Custom image':'Default image'}</strong></div><div><span>FAVICON</span><strong>{config?.faviconUrl?'Custom icon':'Default icon'}</strong></div></div><div className="pa-panel"><h3>Quick actions</h3><div className="pa-quick-actions"><button onClick={()=>{setDraft(blankProject);setEditing(true);setSection('projects');}}>＋ Add a project</button><button onClick={()=>setSection('media')}>↑ Replace resume</button><button onClick={()=>setSection('settings')}>✎ Edit site metadata</button></div></div></>}
      {section==='projects' && <><div className="pa-panel"><div className="pa-panel-title"><div><h3>{editing?(draft.id?'Edit project':'Add a project'):'Project library'}</h3><p>Add or update a project shown on the public portfolio.</p></div>{editing && <button className="pa-secondary" onClick={()=>{setDraft(blankProject);setEditing(false);}}>Cancel</button>}</div>
        {editing && <form className="pa-form-grid" onSubmit={saveProject}><label>Project title<input required maxLength="120" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label><label>Project type<input value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})}/></label><label className="wide">Description<textarea rows="3" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/></label><label className="wide">Technologies (comma separated)<input value={draft.technologies} onChange={e=>setDraft({...draft,technologies:e.target.value})} placeholder="React, Node.js, PostgreSQL"/></label><label>Project URL<input type="url" value={draft.projectUrl} onChange={e=>setDraft({...draft,projectUrl:e.target.value})} placeholder="https://…"/></label><label>GitHub URL<input type="url" value={draft.githubUrl} onChange={e=>setDraft({...draft,githubUrl:e.target.value})} placeholder="https://github.com/…"/></label><div className="wide"><button disabled={busy}>{busy?'Saving…':'Save project'}</button></div></form>}
      </div><div className="pa-project-list">{projects.map((p,i)=><article className="pa-project-row" key={p.id}><span className="pa-project-number">{String(i+1).padStart(2,'0')}</span><div className="pa-project-copy"><strong>{p.title}</strong><span>{p.type || 'PROJECT'} · {(p.technologies || []).join(', ')}</span><p>{p.description}</p></div><div className="pa-row-actions"><button onClick={()=>editProject(p)}>Edit</button><button className="danger" onClick={()=>deleteProject(p)}>Delete</button></div></article>)}</div></>}
      {section==='media' && <><div className="pa-panel"><h3>Resume</h3><p className="pa-muted">Upload a PDF. The public resume URL changes after upload.</p>{config?.resumeUrl && <a className="pa-current-link" href={assetUrl(config.resumeUrl)} target="_blank" rel="noreferrer">View current resume ↗</a>}<label className="pa-upload"><span>↑</span><strong>Choose new resume PDF</strong><small>PDF only · maximum 5 MB</small><input type="file" accept="application/pdf,.pdf" onChange={e=>upload('resume',e.target.files?.[0])} disabled={busy}/></label></div>
      <div className="pa-media-grid"><div className="pa-panel"><h3>Profile image</h3><p className="pa-muted">Replace the public profile portrait.</p><div className="pa-avatar-preview">{config?.profileImage?<img src={assetUrl(config.profileImage)} alt="Current profile"/>:<span>VD</span>}</div><label className="pa-upload compact"><strong>Choose image</strong><small>JPG, PNG, WebP or SVG · 5 MB max</small><input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={e=>upload('profile',e.target.files?.[0])} disabled={busy}/></label></div>
      <div className="pa-panel"><h3>Browser favicon</h3><p className="pa-muted">Change the icon used in the browser tab.</p><div className="pa-favicon-preview">{config?.faviconUrl?<img src={assetUrl(config.faviconUrl)} alt="Current favicon"/>:<span>VD.</span>}</div><label className="pa-upload compact"><strong>Choose favicon</strong><small>PNG, JPG, WebP, SVG or ICO · 5 MB max</small><input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon,.ico" onChange={e=>upload('favicon',e.target.files?.[0])} disabled={busy}/></label></div></div></>}
      {section==='settings' && config && <form className="pa-panel pa-settings-form" onSubmit={saveSettings}><h3>Website metadata</h3><p className="pa-muted">These values are available from the public API. Social preview metadata in static HTML may still require a redeploy.</p><label>Site title<input maxLength="250" value={config.siteTitle || ''} onChange={e=>setConfig({...config,siteTitle:e.target.value})}/></label><label>Site description<textarea rows="3" maxLength="250" value={config.siteDescription || ''} onChange={e=>setConfig({...config,siteDescription:e.target.value})}/></label><button disabled={busy}>Save settings</button></form>}
      {section==='changes' && <div className="pa-panel"><h3>Recent changes</h3><p className="pa-muted">Admin uploads and project edits are recorded here.</p>{changes.length===0?<p>No changes recorded yet.</p>:<div className="pa-change-list">{changes.map(c=><div key={c.id}><span className="pa-change-dot"/><div><strong>{c.action}</strong><p>{c.detail}</p><small>{new Date(c.createdAt).toLocaleString()}</small></div></div>)}</div>}</div>}
      <footer className="pa-footer">Portfolio Admin · Owner-only controls · <a href="/" target="_blank" rel="noreferrer">Open public site</a></footer>
    </section>
  </main>;
}
export default AdminApp;
