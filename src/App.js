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
	FilteredLocations: []
    }

    filterLocation = () => {
    }

    componentDidMount(){
    	this.setState({AllLocations: ALL_LOCATIONS})
        this.setState({FilteredLocations: ALL_LOCATIONS})

    }
    filterLocations(e){
        e.preventDefault();
        console.warn(this)
        const AllLocations = this.state.AllLocations;
        let val = document.querySelector('input').value.trim().toLowerCase();
        console.log(val)
        let FilteredLocations = AllLocations.filter(location => location.name.trim().toLowerCase().includes(val));
        this.setState({FilteredLocations: FilteredLocations});
    }

    render() {
        const FilteredLocations = this.state.FilteredLocations
        return (
            <div className="App" id="layout">
              <header className="App-header pure-u-1">West Philly Coffee Shops</header>
		<Map locations={FilteredLocations}/>
              <a href="#menu" id="menuLink" className="menu-link">
		<span></span>
	      </a>
              <div id="menu" className="">
                <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>
		  <form className="pure-form" onSubmit={e => this.filterLocations(e)}>
		    <fieldset>
		      <input type="text" className="pure-input-rounded"/>
		      <button type="submit" className="pure-button">Filter</button>
                    </fieldset>
                  </form>
                  <ul className="pure-menu-list">
		    {FilteredLocations.map(location =>
                        <li className="pure-menu-item" key={location.name}><a href="#" className="pure-menu-link">{location.name}</a></li>
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
