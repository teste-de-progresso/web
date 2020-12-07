import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "ckeditor5-mathtype/build/ckeditor";

export const WysiwygViewer = ({ defaultValue = "" }) => (
  <CKEditor
    editor={ClassicEditor}
    disabled
    data={defaultValue}
    config={{
      ckfinder: {
        uploadUrl: `${process.env.REACT_APP_BACKEND_URL}/picture/upload`,
      },
      toolbar: [],
      isReadOnly: true,
    }}
    onInit={(editor) => {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element,
      );
    }}
  />
);
