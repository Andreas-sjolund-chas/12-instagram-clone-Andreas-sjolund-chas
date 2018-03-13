import React, { Component } from 'react';
import Camera from 'react-camera';
import './CameraCapture.css';

class CameraCapture extends Component {
  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {
      this.img.src = URL.createObjectURL(blob);
      this.img.onload = () => { URL.revokeObjectURL(this.src); }

    })
  }

  render() {
    return (
      <div className="CameraCapture-container">
        <Camera
          className="preview"
          ref={(cam) => {
          this.camera = cam;
          }}
        >
        <div className="captureContainer" onClick={this.takePicture}>
          <button className="captureButton"> Capture </button>
        </div>
      </Camera>
      <img
        className="captureImage"
        ref={(img) => {
          this.img = img;
        }}
        alt="No picture captured yet"
      />
      </div>
    );
  }
}

export default CameraCapture;
