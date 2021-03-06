import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { PropsRoute } from 'react-router-with-props';
import { Login, MainFeed, Upload } from './';
import { Search, CameraCapture } from '../components';

import auth from "../containers/Authenticated"

class Root extends Component {
  render() {
    return (
      <main className="Root-container">
          <PropsRoute exact path="/" component={auth(MainFeed)} isMobile={this.props.isMobile} />
          <Route path="/search" component={auth(Search)} />

          <Route path="/upload" component={auth(Upload)} />
          <Route path="/user" component={Login} />

      </main>
    );
  }
}

export default Root;
