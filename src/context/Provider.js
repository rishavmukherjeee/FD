import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
WebBrowser.maybeCompleteAuthSession();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [allData, setAllData] = useState({
    userData: null,
    guestData: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "23464134108-uqr508fog7oijqeih54tetr14iv81b3u.apps.googleusercontent.com",
    expoClientId: "",
  });

  useEffect(() => {
    if (response && response.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (user) => {
    setLoading(true);
    return updateProfile(auth.currentUser, user);
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      setUser(null);
      await AsyncStorage.removeItem("@mahbubmorshed");
      await signOut(auth);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          await AsyncStorage.setItem(
            "@mahbubmorshed",
            JSON.stringify(currentUser)
          );
          setUser(currentUser);
        } else {
          const localUser = await getLocalUser();
          setUser(localUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("@mahbubmorshed");
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      // Handle AsyncStorage error
      return null;
    }
  };

  const authInfo = {
    createUser,
    signIn,
    signOutUser,
    user,
    setLoading,
    updateUser,
    allData,
    setAllData,
    promptAsync,
    error,
    setError,
    refetch,
    setRefetch,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const userContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export { auth };
