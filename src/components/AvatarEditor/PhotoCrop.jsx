import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const PhotoCrop = ({ callback }) => {
  const [result, setResult] = useState();
  const [fileSizeIsBig, setFileSizeBig] = useState(false);
  const onCrop = (cropped) => {
    setResult(cropped);
    callback(result);
  };

  const onClose = () => {
    setResult(null);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 180000) {
      elem.target.value = "";
      setFileSizeBig(true);
    }
  };

  const dimention = 300;

  return (
    <>
      <Snackbar open={fileSizeIsBig} onClose={() => setFileSizeBig(false)} autoHideDuration={6000}>
        <Alert severity="error">
          A imagem selecionada é grande de mais!
        </Alert>
      </Snackbar>
      <Avatar
        width={dimention}
        height={dimention}
        imageWidth={dimention}
        imageHeight={dimention}
        onCrop={(e) => onCrop(e)}
        onClose={() => onClose()}
        onBeforeFileLoad={onBeforeFileLoad}
      />
    </>
  );
};
