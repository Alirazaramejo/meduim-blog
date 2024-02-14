import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nav } from "../../../data.js";
import Auth from './Auth/Auth.jsx';

function DemoHeader() {
  const [colorActive, setColorActive] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 480 ? setColorActive(true) : setColorActive(false);
    }

    window.addEventListener('scroll', scrollHandler);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={`border-b border-black sticky top-0 z-50 ${colorActive ? "bg-white" : "bg-banner"} transition-all duration-500`}>
      <div className='size h-[75px] flex items-center justify-between'>
        <Link to={"/"}>
          <img className='h-[2.5rem]' src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png" alt='logo'/>
        </Link>
        <div className='flex items-center gap-5'>
          <div className='hidden sm:flex items-center gap-5'>
            {nav.map((link, i) => (
              <Link key={i} to={link.path} className='text-sm'>{link.title}</Link>
            ))}
            <div className="relative">
              <button onClick={()=> setModal(true)} className='hidden text-sm sm:flex items-center gap-5'>Sign in</button>
              <Auth modal={modal} setModal={setModal}/>
            </div>
          </div>
          <div>
            <button className={`text-white rounded-full px-3 p-2 ${colorActive ? "bg-green-700" : "bg-black"}`}>Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DemoHeader;
