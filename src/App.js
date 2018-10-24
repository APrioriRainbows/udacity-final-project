import React, { Component } from 'react';
import './App.css';
import Map from './components/map.js';
import ALL_LOCATIONS from './locations';
import fourSquareLocationData from './foursquare';
import * as keys from "./keys";

class App extends Component {
    state = {
	AllLocations: [],
	FilteredLocations: [],
        ActiveLocation:''
    }
    componentDidMount(){
    	this.setState({AllLocations: ALL_LOCATIONS});
        this.setState({FilteredLocations: ALL_LOCATIONS});
        for (let fsq of fourSquareLocationData) {
            const venueId = fsq.venueId;
            //takes in client id and client secret for the foursquare api. PLEASE INSERT YOUR OWN IF REVIEWING.
            const qs = `&client_id=${keys.FS_CLIENT_ID}&client_secret=${keys.FS_CLIENT_SECRET}`;
            const v = "&v=20181020";
            const url = `https://api.foursquare.com/v2/venues/${venueId}/photos?limit=1`+qs+v;
            fetch(url).then((response) => response.json()).then(json => {
                for (let location of this.state.AllLocations) {                    
                    if (location.name === fsq.venueName) {
                        let photo = json.response.photos.items[0] || undefined;
                        if(photo){
                            location.photoURL = `${photo.prefix}200x200${photo.suffix}`;
                        }
                    }
                }
            })
                .catch(err => console.error('Caught error: ', err));
        }
     }
    //this function takes in query string and filters down all available locations to match query string.
    //sets a state variable with that array of locations to be used elsewhere
    filterLocations(e){
        e.preventDefault();
        const val = document.querySelector('input').value.trim().toLowerCase();
        let AllLocations = this.state.AllLocations;
        let FilteredLocations = AllLocations.filter(location => location.name.trim().toLowerCase().includes(val));
        this.setState({FilteredLocations: FilteredLocations});
    }
    //when you click an item it sets a state on the app for ActiveLocation
    setTarget(location){
        const activeLocation = location;
        this.setState({ActiveLocation:activeLocation});
    }
    //when the user clicks the hamburger menu icon this will toggle the class necessary to hide/show the search panel.
    toggleSearch(){
        const layout = document.getElementById('layout');
        layout.classList.toggle('active');
    }
    render() {
        let FilteredLocations = this.state.FilteredLocations;
        const ActiveLocation = this.state.ActiveLocation;
        return (
            <div className="App" id="layout">
              <header className="App-header pure-u-1">West Philly Coffee Shops</header>
	      <Map aria-label="map of coffee shop locations" locations={FilteredLocations} target={ActiveLocation} mapTarget={location => this.setTarget(location)} role="application"/>
              <a href="#menu" id="menuLink" className="menu-link" aria-hidden="true" onClick={this.toggleSearch}>
		<span></span>
	      </a>
              <div id="menu" className="">
                <div className="pure-menu">
		  <form className="pure-form" role="search">
		    <fieldset>
		      <input role="search" type="text" aria-label="search text" aria-live="polite" className="pure-input-rounded" placeholder="Filter locations" onChange={e => this.filterLocations(e)}/>
		    </fieldset>
                  </form>
                  <ul className="pure-menu-list" aria-live="polite" id="locations">
		    {FilteredLocations.map(location =>
                                           <li className="pure-menu-item pure-menu-link" aria-describedby="locations" key={location.name} tabIndex="0" onClick={_e => this.setTarget(location)} aria-labelledby={location.name}>{location.name}</li>
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
