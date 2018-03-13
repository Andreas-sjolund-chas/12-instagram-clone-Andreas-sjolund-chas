import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-container">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-title">Instamang</h1>
          
          {!this.props.isMobile ? 
            <nav className="Header-nav">
              <Link to="/" className="Header-nav-link"><i className="fas fa-home"></i></Link>
              <Link to="/search" className="Header-nav-link"><i className="fas fa-search"></i></Link>
              <Link to="/upload" className="Header-nav-link"><i className="fas fa-camera-retro"></i></Link>
              <Link to="/login" className="Header-nav-link"><i className="fas fa-user"></i></Link>
              <Link to="/liked" className="Header-nav-link"><i className="fas fa-heart"></i></Link>
            </nav>
            :
            ''}
        </header>
      </div>
    );
  }
}

export default Header;
