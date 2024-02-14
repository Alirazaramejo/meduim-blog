import React from 'react';
import reactImg from '../../../../assets/react.svg';

function Banner() {
  return (
    <div className='bg-banner border-b border-black'>
      <div className='size py-[5rem] flex flex-col items-start gap-[1rem]'>
        {/* Main heading */}
        <h1 className='font-title text-[3rem] sm:text-[4rem] md:text-[6rem] font-normal'>Stay curious.</h1>
        {/* Subheading */}
        <p className='w-full md:w-[31rem] text-[1.3rem] md:text-[1.5rem] font-medium leading-7'>
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        {/* Button */}
        <button className='btn bg-black1 rounded-full text-white !text-[1.2rem] !px-6 !mt-[2.5rem]'>
          Start Reading
        </button>
      </div>
    </div>
  );
}

export default Banner;
