import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {

    if(this.props.isMobile) {
      var footerStyle = {
        position: "fixed"
      }
    }
    return (
      <div className="Footer">
        <footer className="Footer-container" style={footerStyle}>
          {this.props.isMobile ? 
            <nav className="Header-nav">
              <Link to="/" className="Header-nav-link"><i className="fas fa-home"></i></Link>
              <Link to="/search" className="Header-nav-link"><i className="fas fa-search"></i></Link>
              <Link to="/upload" className="Header-nav-link"><i className="fas fa-camera-retro"></i></Link>
              <Link to="/login/signin" className="Header-nav-link"><i className="fas fa-user"></i></Link>
              <Link to="/liked" className="Header-nav-link"><i className="fas fa-heart"></i></Link>
            </nav>
            :
            <p>Desktop footer</p>
          }
        </footer>
      </div>
    );
  }
}

export default Footer;
