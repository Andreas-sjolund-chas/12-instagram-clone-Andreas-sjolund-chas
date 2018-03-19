import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';
import { CameraCapture, PhotoForm } from '../components';

// import './Upload.css';

class Upload extends Component {
  constructor() {
    super();
    
  }

  render() {
    return (
      <div className="Upload">
      <Link to="/upload/photo">Upload photo</Link>
      <Link to="/upload/newphoto">Snap a photo</Link>
      
      <Route path="/upload/photo" component={PhotoForm} />
      <Route path="/upload/newphoto" component={CameraCapture} />
      </div>
    );
  }
}

// Upload = connect(mapStateToProps)(Upload);

export default Upload;
