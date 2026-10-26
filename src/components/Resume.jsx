import {useEffect,useState} from "react";
import defaultResume from "../assets/resume/Vajrabilash_Degapogu.pdf";
import "../css/Resume.css";
import {apiRequest,assetUrl} from "../admin/adminApi";
function Resume({siteConfig}) {
 const [resume,setResume]=useState(siteConfig?.resumeUrl||"");
 useEffect(()=>{if(siteConfig?.resumeUrl!==undefined){setResume(siteConfig.resumeUrl||"");return}let active=true;apiRequest('/api/public').then(d=>{if(active)setResume(d.resumeUrl||"")}).catch(()=>{});return()=>{active=false}},[siteConfig]);
 const file=resume?assetUrl(resume):defaultResume;
 return <section className="resume-section" id="resume"><div className="resume-container"><p className="section-label">MY RESUME</p><h2 className="resume-title">Let's build something <span>meaningful.</span></h2><p className="resume-description">View my resume to learn more about my skills, projects, education and development experience.</p><div className="resume-buttons"><a href={file} target="_blank" rel="noopener noreferrer" className="resume-btn resume-btn-primary">View Resume</a><a href={file} download="Vajrabilash_Resume.pdf" className="resume-btn resume-btn-secondary">Download Resume</a></div></div></section>;
}
export default Resume;
