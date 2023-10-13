import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './header.css';

export default function Header() {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/"){
            setActiveTab("Home")
        }else if(location.pathname === "/add"){
            setActiveTab("AddContact")
        }else if(location.pathname === "/about"){
            setActiveTab("About")
        }
    }, [location])

  return (
    <div className='header'>
      <div className='logo'>ContactApp</div>
      <div className='links'>
        <Link to="/" className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>Home</Link>
        <Link to="/add" className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={() => setActiveTab("AddContact")}>Add Contact</Link>
        <Link to="/about" className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>About</Link>
      </div>
    </div>
  )
}
