import React from "react";
import { Form } from "../screens/questions/form";

export const Page = () => {

  const questionData = {
    body: "<p>fon</p>"
  }

  return (
    <div className="flex justify-center bg-gray-100 py-4 px-8 rounded-t-xlg h-full w-full">
      <main className="min-w-full max-w-6xl">
        <Form questionData={questionData} />
      </main>
    </div>
  );
};
