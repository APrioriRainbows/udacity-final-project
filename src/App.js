import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/map.js'
import Script from 'react-load-script'
import ALL_LOCATIONS from './locations'

class App extends Component {
    constructor(props){
	super(props)
    }
    state = {
	AllLocations: [],
	FilteredLocations: [],
        ActiveLocation:''
    }

    componentDidMount(){
    	this.setState({AllLocations: ALL_LOCATIONS})
        this.setState({FilteredLocations: ALL_LOCATIONS})

    }
    //this function takes in query string and filters down all available locations to match query string.
    //sets a state variable with that array of locations to be used elsewhere
    filterLocations(e){
        e.preventDefault();
        let val = document.querySelector('input').value.trim().toLowerCase();
        const AllLocations = this.state.AllLocations;
        let FilteredLocations = AllLocations.filter(location => location.name.trim().toLowerCase().includes(val));
        this.setState({FilteredLocations: FilteredLocations});
    }
    //when you click an item it sets a state on the app for ActiveLocation
    setTarget(location){
        console.log(location);
        const activeLocation = location;
        console.log(activeLocation);
        this.setState({ActiveLocation:activeLocation});
    }
    render() {
        const FilteredLocations = this.state.FilteredLocations;
        const ActiveLocation = this.state.ActiveLocation;
        return (
            <div className="App" id="layout">
              <header className="App-header pure-u-1">West Philly Coffee Shops</header>
		<Map locations={FilteredLocations} target={ActiveLocation} mapTarget={location => this.setTarget(location)}/>
              <a href="#menu" id="menuLink" className="menu-link">
		<span></span>
	      </a>
              <div id="menu" className="">
                <div className="pure-menu">
		  <form className="pure-form">
		    <fieldset>
		      <input type="text" className="pure-input-rounded" placeholder="Filter locations" onChange={e => this.filterLocations(e)}/>
		    </fieldset>
                  </form>
                  <ul className="pure-menu-list">
		    {FilteredLocations.map(location =>
                        <li className="pure-menu-item" key={location.name}><a onClick={_e => this.setTarget(location)} className="pure-menu-link">{location.name}</a></li>
                    )
                    }
                  </ul>
                </div>
              </div>
         </div>
        );
    }
}

export default App;
