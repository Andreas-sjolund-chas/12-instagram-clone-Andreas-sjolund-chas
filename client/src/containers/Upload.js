import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';
import { CameraCapture, PhotoForm } from '../components';

import './Upload.css';

class Upload extends Component {
  constructor() {
    super();
    
  }

  render() {
    return (
      <div className="Upload">
      <Link to="/upload/picture" className="Upload-link"><button>Upload photo</button></Link>
      <Link to="/upload/newphoto" className="Upload-link"><button>Snap a photo</button></Link>
      
      <Route path="/upload/picture" component={PhotoForm} />
      <Route path="/upload/newphoto" component={CameraCapture} />
      </div>
    );
  }
}

// Upload = connect(mapStateToProps)(Upload);

export default Upload;
