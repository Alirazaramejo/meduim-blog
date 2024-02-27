import React from 'react'

function ProfileAbout({getAllUsersData,setEditModal}) {
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
        {getAllUsersData?.bio ? getAllUsersData.username : "Hasn't added a bio yet."}
      </p>
      <div className="text-right">
        <button
        onClick={() => setEditModal(true)}
         className='border border-black py-2 px-5 rounded-full text-black mt-[3rem]'>Edit</button>
      </div>
    </div>
  )
}

export default ProfileAbout