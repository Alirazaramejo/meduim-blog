import React from 'react';
import { LiaUserSolid } from "react-icons/lia";
import { MdLocalLibrary } from "react-icons/md"; // Changed from MdOutlineLocalLibrary
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import { Link } from "react-router-dom";
import { secretEmail } from "../../../../utils/Helper";
import { signOut } from "firebase/auth";

import { toast } from "react-toastify";

function UserModal({ setModal }) {
  const { currentUser } = Blog();
  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${currentUser?.uid}`,
    },
    {
      title: "Library",
      icon: <MdLocalLibrary />, // Changed from MdOutlineLocalLibrary
      path: "/library",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <HiOutlineChartBar />,
      path: "/stats",
    },
  ];

  const logout = () => {
    signOut().then(() => {
      toast.success("Logged out successfully!");
      setModal(false);
    }).catch(error => {
      toast.error(error.message);
    });
  };

  return (
    <section
      className="absolute w-[18rem] p-6 bg-white right-0 top-[100%]
    shadows rounded-md z-50 text-gray-500">
      <Link
        to="/write"
        className="flex md:hidden items-center gap-1 text-gray-500">
        <span className="text-3xl">
          <LiaEditSolid />
        </span>
        <span className="text-sm mt-2">Write</span>
      </Link>
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
        {userModal.map((link, i) => (
          <Link
            onClick={() => setModal(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-black/70"
            key={i}
            to={link.path}>
            <span className="text-2xl">{link.icon}</span>
            <h2 className="text-md">{link.title}</h2>
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        className="flex flex-col pt-5 cursor-pointer hover:text-black/70">
        Sign Out
        <span className="text-sm">{secretEmail(currentUser?.email)}</span>
      </button>
    </section>
  );
}

export default UserModal;
