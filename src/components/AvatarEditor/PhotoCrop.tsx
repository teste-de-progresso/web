import React, { FC, useState } from "react";
import Avatar from "react-avatar-edit";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


type Props = {
  callback: (value: any) => void
}

export const PhotoCrop: FC<Props> = ({ callback }) => {
  const [result, setResult] = useState<any>();
  const [fileSizeIsBig, setFileSizeBig] = useState(false);
  const onCrop = (cropped: any) => {
    setResult(cropped);
    callback(result);
  };

  const onClose = () => {
    setResult(null);
  };

  const onBeforeFileLoad = (elem: any) => {
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
        label="Escolha uma imagem"
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
