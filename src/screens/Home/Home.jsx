import React, { useState } from "react";
import { useAuth } from "../../utils/contexts";
import { QuestionsList } from './QuestionsList';

export const Home = () => {
  const auth = useAuth();

  return (
    <div className="bg-gray-100 h-full w-full">
      <main className="px-8 rounded-t-xlg h-full flex">
        <div className="w-2/3 mr-4 flex flex-col">
          <div className="bg-gray-200 p-4 rounded my-2">
            <h2 className="text-gray-500 font-medium text-xl">Aguardando Revisão</h2>
            <hr className="border-t border-gray-400 m-px" />
            <div className="p-2">
              <QuestionsList where={{}} limit={2} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} editable={true} />
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded my-2">
            <h2 className="text-gray-500 font-medium text-xl">Rascunhos</h2>
            <hr className="border-t border-gray-400 m-px" />
            <div className="p-2">
              <QuestionsList where={{}} limit={3} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} editable={true} />
            </div>
          </div>
          <div className="bg-gray-200 p-4 rounded my-2">
            <h2 className="text-gray-500 font-medium text-xl">Aprovadas</h2>
            <hr className="border-t border-gray-400 m-px" />
            <div className="p-2">
              <QuestionsList where={{}} limit={4} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} />
            </div>
          </div>
        </div>
        <div className="w-1/3 ml-4">
          <div className="bg-gray-200 p-4 rounded my-2">
            <h2 className="text-gray-500 font-medium text-xl">Minhas revisões</h2>
            <hr className="border-t border-gray-400 m-px" />
            <div className="p-2">
              <QuestionsList where={{}} limit={4} page={1} userId={auth.user.userId} setIsFirstPage={() => { }} setIsLastPage={() => { }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
