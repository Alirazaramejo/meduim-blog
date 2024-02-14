import React, { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import SignUp from "../Auth/SignUp"
import SignIn from "../Auth/SignIn"

import Modal from "../../../../utils/Modal";
import { auth, db, provider } from "../../../../Firebase/Firebase-config";

function Auth({ modal, setModal }) {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");

  // Function to handle Google authentication
  const GoogleAuth = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const newUser = userCredential.user;
      const ref = doc(db, "users", newUser.uid);
      const userDoc = await getDoc(ref);
      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: "",
        });
        Navigate("/"); // Redirect to home page
        setModal(false); // Close the modal
        toast.success("Sign in with Google successful");
      }
    } catch (error) {
      toast.error("Error signing in with Google: " + error.message);
    }
  };

  // CSS class to control visibility of the modal
  const hidden = modal ? "visible opacity-100" : "invisible opacity-0";

  return (
    <Modal modal={modal} setModal={setModal} hidden={hidden}>
      <section className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadows transition-all duration-500 ${hidden}`}>
        <button onClick={() => setModal(false)} className="absolute top-8 right-8 text-2xl hover:opacity-50">
          <LiaTimesSolid />
        </button>
        <div className="flex flex-col justify-center items-center gap-[3rem]">
          {signReq === "" ? (
            // Show sign-in/sign-up options
            <>
              <h2 className="text-2xl p-[5rem]">{createUser ? "Join Medium" : "Welcome Back"}</h2>
              <div className="flex flex-col gap-2 w-fit mx-auto">
                <Button click={GoogleAuth} icon={<FcGoogle className="text-xl" />} text={`${createUser ? "Sign Up " : "Sign In"} With Google`} />
                <Button icon={<MdFacebook className="text-xl" />} text={`${createUser ? "Sign Up " : "Sign In"} With Facebook`} />
                <Button click={() => setSignReq(createUser ? "sign-In" : "sign-up")} icon={<AiOutlineMail className="text-xl" />} text={`${createUser ? "Sign Up " : "Sign In"} With Email`} />
                {!createUser && (
                  <div className="main">
                    <div>
                      <Button icon={<FaApple className="text-xl" />} text="Sign In With Apple" />
                    </div>
                    <div className="mt-2">
                      <Button icon={<BsTwitterX className="text-xl" />} text="Sign In With Twitter" />
                    </div>
                  </div>
                )}
              </div>
              <p>
                {createUser ? "Already have an account?" : "No Account?"}
                <button className="text-green-600 hover:text-green-700 font-bold ml-1" onClick={() => setCreateUser(!createUser)}>
                  {createUser ? "Create One" : "Sign In"}
                </button>
              </p>
            </>
          ) : signReq === "sign-In" ? (
            // Show sign-in form
            <SignIn setModal={setModal} setSignReq={setSignReq} />
          ) : signReq === "sign-up" ? (
            // Show sign-up form
            <SignUp setModal={setModal} setSignReq={setSignReq} />
          ) : null}
          {!createUser && (
            // Forgot password or sign-in trouble message
            <p>
              Forgot email or trouble signing in? <button className="underline">Get help.</button>
            </p>
          )}
          <p className="md:[30rem] mx-auto text-center text-sm md-[3rem]">
            {`Click ${createUser ? "Sign In" : "Sign Up"} to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.`}
          </p>
        </div>
      </section>
    </Modal>
  );
}

// Button component
const Button = ({ icon, text, click }) => {
  return (
    <button onClick={click} className="flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full">
      {icon} {text}
    </button>
  );
};

export default Auth;
