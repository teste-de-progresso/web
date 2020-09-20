import React, { useState } from "react";
import { useUserContext } from "../../utils";
import { AvatarEditor, Navigator } from "../../widgets";
import { Avatar } from "../../layout";

export const UserProfile = () => {
  const [avatarEditorExhibit, setAvatarEditorExhibition] = useState(false);
  const userContextData = useUserContext();
  const userInfo = userContextData?.userInfo;

  return (
    <>
      {avatarEditorExhibit && <AvatarEditor setAvatarEditorExhibition={setAvatarEditorExhibition} />}
      <div className="bg-primary-normal h-full w-full">
        <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
          <Navigator />
          <div className="flex items-center flex-col max-w-4xl m-auto">
            <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full mt-12 mb-4 relative">
              <div
                className="w-20 absolute cursor-pointer"
                style={{ top: "-3.10rem" }}
                onClick={() => setAvatarEditorExhibition(!avatarEditorExhibit)}
              >
                <Avatar src={userInfo.avatarUrl} />
              </div>
              <div className="mt-8 text-center">
                <h2 className="font-bold">{userInfo.name}</h2>
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
