//sufyan
import React, { useState, useEffect } from 'react';
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import Modal from "../../../../utils/Modal";
import Search from '../Search';
import UserModal from './UserModal';
import Profile from "../../../../assets/img/profile.jpg";
import { Blog } from '../../../Context/Context';
import Loading from '../../../Loading/Loading';

function HomeHeader() {
  const { currentUser, allUsers, userLoading } = Blog(); // Destructuring Blog context
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userLoading && currentUser && allUsers.length > 0) {
      const getUserData = allUsers.find((user) => user.id === currentUser.uid);
      setUserData(getUserData);
    }
  }, [userLoading, currentUser, allUsers]);

  return (
    <header className='border-b border-gray-200'>
      {userLoading && <Loading/>}
      <div className='size h-[60px] flex items-center justify-between'>
        {/* left side div */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <span className='text-5xl'>
              <BsMedium/>
            </span>
          </Link>
          <Search modal={search} setModal={setSearch}/>
        </div>
        {/* right side div we make */}
        <div className='flex items-center gap-3 sm:gap-7'>
          <span onClick={()=> setSearch(true)} className='flex sm:hidden text-3xl text-gray-100 cursor-pointer'><CiSearch/></span>
          <Link to={"/write"} className='hidden md:flex items-center gap-1 text-gray-500'>
            <span className='text-3xl'><RiEditCircleLine/></span>
            <span className='text-sm mt-2'>Write</span>
          </Link>
          <span className='text-3xl text-gray-500 cursor-pointer'><IoMdNotificationsOutline/></span>
            
          <div className='flex items-center relative'>
            <img onClick={()=> setModal(true)} className='w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer' src={userData?.userImg ? userData.userImg : Profile} alt="Profile Image" />
            <span className='text-gray-500 cursor-pointer'>
              <MdKeyboardArrowDown/>
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div className={`${modal ? "visible opacity-100%" : "invisible opacity-0"} transition-all duration-100`}>
                <UserModal setModal={setModal}/>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
