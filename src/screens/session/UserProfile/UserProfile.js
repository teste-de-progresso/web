import React, { useState } from "react";
import firebase from "firebase";

import { Navigator, Avatar } from "../../../components";

export const UserProfile = () => {
  const [avatarEditorExhibit, setAvatarEditorExhibition] = useState(false);

  const { displayName, photoURL } = firebase.auth().currentUser;

  return (
    <>
      <Navigator home />
      <div className="bg-gray-100 w-full my-3">
        <main>
          <div className="flex items-center flex-col max-w-4xl m-auto">
            <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full mt-12 mb-4 relative">
              <div
                className="w-20 absolute"
                style={{ top: "-3.10rem" }}
                onClick={() => setAvatarEditorExhibition(!avatarEditorExhibit)}
              >
                <Avatar src={photoURL} />
              </div>
              <div className="mt-8 text-center">
                <h2 className="font-bold">{displayName}</h2>
                <h2 className="py-4">TODO: Centro</h2>
                <h2 className="">TODO: Cargo</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
