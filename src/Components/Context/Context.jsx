import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/Firebase-config';
import LoadingIndicator from '../Loading/Loading';
const BlogContext = createContext();

function Context({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser }}>
      {loading ? <LoadingIndicator /> : children}
    </BlogContext.Provider>
  );
}

export default Context;

export const Blog = () => useContext(BlogContext);
