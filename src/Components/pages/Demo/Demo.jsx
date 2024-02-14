import React from 'react';
import Banner from './Auth/Banner';
import Trending from './Auth/Trending';
import Posts from '../../common/Posts/Posts';
import Discover from './Auth/Discover';

function Demo() {
  return (
    <>
      <Banner />
      <Trending />
      <div className='size py-7 flex flex-col-reverse md:flex-row gap-[7rem]'>
        <div className='flex-[1.5]'>
          <Posts />
        </div>
        <div className='flex-[1] relative'>
          <Discover />
        </div>
      </div>
    </>
  );
}

export default Demo;
