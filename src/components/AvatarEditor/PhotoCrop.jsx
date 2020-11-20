import React, { useState } from "react";
import Avatar from "react-avatar-edit";

export const PhotoCrop = ({ callback }) => {
  const [result, setResult] = useState();

  const onCrop = (cropped) => {
    setResult(cropped)
    callback(result)
  }

  const onClose = () => {
    setResult(null)
  }

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 180000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const dimention = 300;

  return (
    <Avatar
      width={dimention}
      height={dimention}
      imageWidth={dimention}
      imageHeight={dimention}
      onCrop={(e) => onCrop(e)}
      onClose={() => onClose()}
      onBeforeFileLoad={onBeforeFileLoad}
    />
  );
}
