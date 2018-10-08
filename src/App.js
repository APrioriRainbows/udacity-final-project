import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App" id="layout">
              <header className="App-header pure-u-1">West Philly Coffee Shops</header>
              <a href="#menu" id="menuLink" className="menu-link">
		<span></span>
	      </a>
              <div id="menu" className="">
                <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>
                  <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">About</a></li>                  
                    <li className="pure-menu-item menu-item-divided pure-menu-selected">
                      <a href="#" className="pure-menu-link">Services</a>
                    </li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
        );
    }
}

export default App;
