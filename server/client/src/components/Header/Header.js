import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-container">
          <Link to="/"><h1 className="Header-title"><i className="fa fa-camera-retro Header-logo"></i><hr width="1" size="30" />Instamang</h1></Link>
          
          {!this.props.isMobile ? 
            <nav className="Header-nav">
              <Link to="/" className="Header-nav-link"><i className="fa fa-home"></i></Link>
              <Link to="/search" className="Header-nav-link"><i className="fa fa-search"></i></Link>
              <Link to="/upload" className="Header-nav-link"><i className="fa fa-camera-retro"></i></Link>
              {localStorage.getItem('token') ?
                <Link to="/user" className="Header-nav-link"><i className="fa fa-user"></i></Link>
                :
                <Link to="/user/signin" className="Header-nav-link"><i className="fa fa-user"></i></Link>

              }

              <Link to="/liked" className="Header-nav-link"><i className="fa fa-heart"></i></Link>
            </nav>
            :
            ''}
        </header>
      </div>
    );
  }
}

export default Header;
