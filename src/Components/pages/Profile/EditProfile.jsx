import React, { useRef, useState, useEffect } from "react";
import Modal from "../../../utils/Modal";
import { FaTimes } from "react-icons/fa";
import profileImg from "../../../assets/img/profile.jpg";
import { storage, db, uploadBytes, getDownloadURL, ref, doc } from "../../../Firebase/Firebase-config.js";
import { toast } from "react-toastify";
import { updateDoc } from "firebase/firestore";

function EditProfile({ editModal, setEditModal, getAllUsersData }) {
  const imgReference = useRef(null);
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    bio: "",
    userImg: ""
  });

  const openFile = () => {
    imgReference.current.click();
  };

  const buttonStyle = "border border-gray-600 py-2 px-5 rounded-full text-green-600";

  useEffect(() => {
    if (getAllUsersData) {
      setForm({
        username: getAllUsersData.username,
        bio: getAllUsersData.bio,
        userImg: getAllUsersData.userImg,
      });
    }
  }, [getAllUsersData]);

  const saveForm = async () => {
    if (form.username.length < 1 || form.bio.length < 1) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    const storageRef = ref(storage, `usersImg/${form.username}`);
    await uploadBytes(storageRef, form?.userImg);
    const imageURL = await getDownloadURL(storageRef);
    try {
      const uploadDocRef = doc(db, "users", getAllUsersData.id);
      await updateDoc(uploadDocRef, {
        username: form.username,
        bio: form.bio,
        userImg: imgURL ? imageURL : form.userImg
      });
      toast.success("Profile Updated");
      setLoading(false);
      setEditModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile Information</h2>
          <button onClick={() => setEditModal(false)} className="text-xl">
            <FaTimes />
          </button>
        </div>
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              <img
                className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-500 rounded-full"
                src={imgURL ? imgURL : form.userImg ? form.userImg : profileImg}
                alt="image"
              />
              <input
                onChange={(e) => {
                  setImgURL(URL.createObjectURL(e.target.files[0]));
                  setForm({ ...form, userImg: e.target.files[0] });
                }}
                accept="image/jpg, image/png, image/jpeg"
                ref={imgReference}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button onClick={openFile} className="text-green-600">
                  Update
                </button>
                <button className="text-red-600">Remove</button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                Recommended: Square JPG, PNG, or GIF, at least 1000 pixels per side
              </p>
            </div>
          </div>
        </section>
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="">
            Name*
          </label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            type="text"
            className="p-1 border-black w-full outline-none"
            placeholder="Username..."
            maxLength={50}
          />
          <p className="text-sm text-gray-600 pt-2">
            Appears on your Profile page, as your byline, and in your responses. {form.username.length}/50
          </p>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="">
              Bio*
            </label>
            <input
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              value={form.bio}
              type="text"
              className="p-1 border-black w-full outline-none"
              placeholder="Bio..."
              maxLength={50}
            />
            <p className="text-sm text-gray-600 pt-2">
              Appears on your Profile and next to your stories. {form.bio.length}/160
            </p>
          </section>
        </section>
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button onClick={() => setEditModal(false)} className={buttonStyle}>
            Cancel
          </button>
          <button onClick={saveForm} className={`${buttonStyle} bg-green-800 text-white`}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfile;
