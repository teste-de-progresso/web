import "firebase/auth";
import React, { FC } from "react";
import firebase from "firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { InitializeAppArgs } from "@react-firebase/auth/dist/types";

const firebaseConfig = {
  firebase,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
} as InitializeAppArgs;

export const FirebaseProvider: FC = ({ children }) => (
  <FirebaseAuthProvider {...firebaseConfig}>
    {children}
  </FirebaseAuthProvider>
);