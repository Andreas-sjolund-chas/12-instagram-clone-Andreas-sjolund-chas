import React, { Component } from "react";
import { CookiesProvider } from "react-cookie";
import PropTypes from "prop-types";

import { Header, Footer } from "..";
import { Root } from "../../containers";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      width: window.innerWidth
    };

    this.handleLocalStorageChange = this.handleLocalStorageChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange); // Adds resize event listener on window
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleLocalStorageChange);
    }

    if (this.props.isAuthenticated) {
      const token = localStorage.getItem('token');
      return this.props.fetchUser(token);
    }

  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.handleLocalStorageChange);
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth }); // Sets current width to this.state
  };

  handleLocalStorageChange() {
    this.context.router.history.push('/login/signin');
  }

  render() {
    const { width } = this.state.width;
    const isMobile = window.innerWidth <= 500;

    return (
      <CookiesProvider>
        <div className="App">
          <Header isMobile={isMobile} />
          <Root isMobile={isMobile} />
          <Footer isMobile={isMobile} />
        </div>
      </CookiesProvider>
    );
  }
}

export default App;
