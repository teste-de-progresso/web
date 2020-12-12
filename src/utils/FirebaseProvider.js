import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

import firebaseConfig from "./firebaseConfig";

export const FirebaseProvider = ({ children }) => (
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    {children}
  </FirebaseAuthProvider>
);
