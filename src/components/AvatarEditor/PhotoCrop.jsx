import React from "react";
import Avatar from "react-avatar-edit";

export class PhotoCrop extends React.Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      preview: null,
      src,
    };

    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
    this.props.callback(preview);
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 120000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  render() {
    const sizes = 300;
    return (
      <div className="flex flex-row justify-between p-2 max-w-screen-sm m-auto">
        <Avatar
          width={sizes}
          height={sizes}
          imageWidth={sizes}
          imageHeight={sizes}
          onCrop={(e) => this.onCrop(e)}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        <img
          width={sizes}
          height={sizes}
          src={this.state.preview}
          alt="Preview"
          className="hidden"
        />
      </div>
    );
  }
}
