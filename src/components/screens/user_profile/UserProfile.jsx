import React from "react";
import { useUserContext } from "../../utils";
import { Avatar } from "../../layout/Avatar";

export const UserProfile = () => {
  const userContextData = useUserContext();
  const userInfo = userContextData?.userInfo;

  return (
    <div className="bg-primary-normal h-full w-full">
      <main className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full">
        <div className="flex items-center flex-col max-w-4xl m-auto">
          <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full mt-12 mb-4 relative">
            <div className="w-20 absolute" style={{ top: "-3.10rem" }}>
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
  );
};
