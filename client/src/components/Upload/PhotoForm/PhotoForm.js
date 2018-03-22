import React, { Component } from 'react';
import Camera from 'react-camera';

import { connect } from 'react-redux';
import { createPhotoCard } from '../../../actions/photoCardActions';
import './PhotoForm.css';

const mapDispatchToProps = {
  createPhotoCard
}

class PhotoForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    this.props.createPhotoCard(formData)
  }

  render() {
    return (
    <div className="PhotoForm--Container">
      <form name="photoForm" onSubmit={this.handleSubmit} encType="multipart/form-data">
        <input type="file" name="photo" />
        <button type="submit">Upload</button>
      </form>
    </div>
    );
  }
}

PhotoForm = connect(null, mapDispatchToProps)(PhotoForm);

export default PhotoForm;
