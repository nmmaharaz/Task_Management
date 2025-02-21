import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user, "this is user");
  const [loading, setLoading] = useState(true);

  const SignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userUpdateProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubcribe();
    };
  });

  const authInfo = {
    SignUp,
    SignIn,
    setUser,
    GoogleSignIn,
    loading,
    setLoading,
    logout,
    userUpdateProfile,
    user,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
