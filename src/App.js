import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import Resume from "./components/Resume";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";
import AdminApp from "./admin/AdminApp";
import { apiRequest, assetUrl } from "./admin/adminApi";
function App() {
 const [admin,setAdmin]=useState(window.location.pathname.replace(/\/$/,'')==='/admin');
 const [config,setConfig]=useState(null);
 useEffect(()=>{const f=()=>setAdmin(window.location.pathname.replace(/\/$/,'')==='/admin');window.addEventListener('popstate',f);return()=>window.removeEventListener('popstate',f)},[]);
 useEffect(()=>{if(admin)return;apiRequest('/api/public').then(d=>{setConfig(d);if(d.siteTitle)document.title=d.siteTitle;if(d.faviconUrl){let i=document.querySelector('link[rel="icon"]');if(!i){i=document.createElement('link');i.rel='icon';document.head.appendChild(i)}i.href=assetUrl(d.faviconUrl)}}).catch(()=>{})},[admin]);
 if(admin)return <AdminApp/>;
 return <div className="App"><Navbar/><Hero siteConfig={config}/><About/><Experience/><Skills/><Projects siteConfig={config}/><Education/><Certifications/><Resume siteConfig={config}/><Contact/><Footer/></div>;
}
export default App;
