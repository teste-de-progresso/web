import React from "react";
import { Form } from "../screens/questions/Form";

export const Page = () => {

  const questionData = {
    body: "<p>fon</p>"
  }

  return (
    <div className="bg-gray-100 py-4 px-8 rounded-t-xlg h-full w-full">
      <main className="max-w-2xl">
        <Form questionData={questionData} />
      </main>
    </div>
  );
};
