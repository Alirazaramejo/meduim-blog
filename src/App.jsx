import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/pages/Home/Home';
import Demo from './Components/pages/Demo/Demo';
import HomeHeader from './Components/pages/Home/Header/HomeHeader';
import DemoHeader from './Components/pages/Demo/DemoHeader';
import { ToastContainer } from 'react-toastify';
import { Blog } from './Components/Context/Context';

function App() {
  const { currentUser } = Blog();

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/Demo" element={<Demo />} />}
        <Route path="*" element={<Navigate to={!currentUser ? '/demo' : '/'} />} />
      </Routes>
    </>
  );
}

export default App;
