import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../Firebase/Firebase-config'; // Assuming db is your Firestore instance
import LoadingIndicator from '../Loading/Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';

const BlogContext = createContext();

function Context({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // return the unsubscribe function to clean up
  }, []); // no need to include currentUser in dependencies

  useEffect(() => {
    const getUsers = () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef);
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setUserLoading(false);
      });

      return unsubscribe; // return the unsubscribe function to clean up
    };

    getUsers();
  }, []); // empty dependency array to run only once when component mounts

  // console.log(allUsers);

  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser,allUsers,userLoading }}>
      {loading ? <LoadingIndicator /> : children}
    </BlogContext.Provider>
  );
}

export default Context;

export const Blog = () => useContext(BlogContext);
