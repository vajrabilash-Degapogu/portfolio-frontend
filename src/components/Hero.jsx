import {useEffect,useState} from "react";
import defaultProfile from "../assets/images/profile.jpg";
import "../css/Hero.css";
import {apiRequest,assetUrl} from "../admin/adminApi";
function Hero({siteConfig}) {
 const [profile,setProfile]=useState(siteConfig?.profileImage||"");
 useEffect(()=>{if(siteConfig?.profileImage!==undefined){setProfile(siteConfig.profileImage||"");return}let active=true;apiRequest('/api/public').then(d=>{if(active)setProfile(d.profileImage||"")}).catch(()=>{});return()=>{active=false}},[siteConfig]);
 return <section className="hero" id="home"><div className="hero-container"><div className="hero-content"><p className="hero-role">PYTHON FULL STACK DEVELOPER</p><h1>Hi, I'm <span>Vajrabilash</span></h1><h2>I build modern web applications.</h2><p className="hero-description">I'm a developer focused on building reliable and user-friendly web applications using Python, Django, React and PostgreSQL.</p><div className="hero-buttons"><a href="#projects" className="btn btn-primary">View Projects</a><a href="#resume" className="btn btn-secondary">View Resume</a></div></div><div className="hero-image-container"><div className="hero-image-wrapper"><img src={profile?assetUrl(profile):defaultProfile} alt="Vajrabilash - Python Full Stack Developer" className="hero-image"/></div></div></div></section>;
}
export default Hero;
