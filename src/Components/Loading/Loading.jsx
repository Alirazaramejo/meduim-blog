import React from 'react';
import loadingImg from "../../assets/img/Loading.gif";

function Loading() {
  return (
    <div className='fixed inset-0 grid place-items-center bg-white z-30'>
        <img src={loadingImg} alt="loading" />
    </div>
  );
}

export default Loading;
