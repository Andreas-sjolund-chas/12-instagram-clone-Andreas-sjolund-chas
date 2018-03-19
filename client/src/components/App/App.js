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
      isMobile: false
    };

    this.innerWidth = window.innerWidth;

    this.handleLocalStorageChange = this.handleLocalStorageChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };
  
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange); // Adds resize event listener on window
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
    if (window.innerWidth <= 500 && !this.state.isMobile)
      this.setState({ isMobile: true })

    if (window.innerWidth >= 500 && this.state.isMobile)
      this.setState({ isMobile: false })

  };

  handleLocalStorageChange() {
    this.context.router.history.push('/user');
  }

  render() {
    const { isMobile } = this.state;

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
