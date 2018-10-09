import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/map.js'
import Script from 'react-load-script'
class App extends Component {
    state = {
	AllLocations: [
	    //The Green Line Cafe
	    {location: {}, googleID:'ChIJBQodP_DGxokR7BU-LHhMz7w'},
	    //Jezebel\'s Studio
	    {location: {}, googleID:'ChIJLxn5DfDGxokRrhtvTyksLPo'},
	    //Reanimator Coffee 
	    {location: {}, googleID:'ChIJFTrn7e7GxokR-hMwClmetUU'},
	    //Satellite Cafe 
	    {location: {}, googleID:'ChIJT8YkwurGxokRrG38CigmHRU'},
	    //Saxby\'s'
	    {location: {}, googleID:'ChIJKVKKvvfGxokRVsWjTa4tMqk'},
	    //Earthen Cup Cafe'
	    {location: {}, googleID:'ChIJ7ZuY5vHGxokRNt9zUNldZb4'},	    
	],
	FilteredLocation: []
    }
    filterLocation = () => {
    }
    render() {
        return (
            <div className="App" id="layout">
              <header className="App-header pure-u-1">West Philly Coffee Shops</header>
		<Map locations={this.state.AllLocations}/>
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
