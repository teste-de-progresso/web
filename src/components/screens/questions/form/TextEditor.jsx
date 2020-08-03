import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const toolbarOptions = [
  "bold",
  "italic",
  "blockQuote",
  "numberedList",
  "bulletedList",
  "imageUpload",
  "insertTable",
  "tableColumn",
  "tableRow",
  "mergeTableCells",
  "|",
  "undo",
  "redo",
];

export const TextEditor = (props) => {
  const inputHandler = (_, editor) => {
    props.setCkData(editor.getData());
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={props.data}
      config={{
        toolbar: toolbarOptions,
        ckfinder: {
          uploadUrl:
            "https://progress-test-backend.herokuapp.com/picture/upload",
        },
      }}
      onChange={inputHandler}
    />
  );
};
