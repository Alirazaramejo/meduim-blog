import React, { useState } from "react";
import ProfileAbout from "./Activites/ProfileAbout";
import ProfileList from "./Activites/ProfileList";
import ProfileHome from "./Activites/ProfileHome";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";
import profileImg from "../../../assets/img/profile.jpg";
import { discoverActions } from "../../../data";

import EditProfile from "./EditProfile";
import { Blog } from "../../Context/Context";
import { useParams } from "react-router-dom";

function Profile() {
  const {allUsers} = Blog();
  const {userId} = useParams();
  const activity = [
    { title: "Home", comp: ProfileHome },
    { title: "Lists", comp: ProfileList },
    { title: "About", comp: ProfileAbout },
  ];

  const [currentActive, setCurrentActive] = useState(activity[0]);
  const [modal, setModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const getAllUsersData = allUsers.find((user) => user.id === userId);
  console.log("all data", getAllUsersData);
  return (
    <section className="size flex gap-[4rem] relative ">
      {/* User activity */}
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {getAllUsersData?.username || "Ali Raza"}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">Followers(2)</p>
          <p className="text-gray-500 text-xs sm:text-sm">Following(2)</p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-200 mb-[3rem]">
          {activity.map((item, index) => (
            <div
              key={index}
              className={`py-[0.5rem] ${
                item.title === currentActive.title
                  ? "border-b border-gray-500"
                  : ""
              }`}
            >
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp setEditModal={setEditModal} getAllUsersData={getAllUsersData} />
      </div>
      {/* btn add to close and open side bar */}
      <button
        onClick={() => setModal(true)}
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
      >
        <IoSettingsSharp />
      </button>
      {/* User Full details here */}
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-300 p-[2rem] z-10
        fixed right-0 bottom-0 top-0 w-[18rem] bg-white md:sticky
        ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
        transition-all duration-500`}
        >
          {/* Icons make to close the profile */}
          <div className="pb-4 text-right ">
            <button
              onClick={() => setModal(false)}
              className="inline-block md:hidden "
            >
              <LiaTimesSolid />
            </button>
          </div>
          {/* Profile details make */}
          <div className="sticky top-7 flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src={getAllUsersData?.userImg || profileImg}
              alt="profile-Img"
            />
            <h2 className="py-2 font-bold capitalize">Ali Raza</h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
              I am Ali Raza
            </p>

            <button
              className="text-green-700 pt-6 text-sm w-fit"
              onClick={() => setEditModal(true)}
            >
              {" "}
              Edit Profile
            </button>
            {/* Nav data from datajs file get */}
            <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
              {discoverActions.map((item, index) => (
                <button key={index} className="text-xs text-sm text-black">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {editModal && (
        <EditProfile getAllUsersData={getAllUsersData} editModal={editModal} setEditModal={setEditModal} />
      )}
    </section>
  );
}

export default Profile;
