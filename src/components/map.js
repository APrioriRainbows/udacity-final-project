import React, { Component } from 'react';
import MAPS_API_KEY from '../keys.js';
import Script from 'react-load-script';
export default class Map extends Component {
    state = {
        LocationList: [
            { name: 'asldkfj',
              position: {lat: 37.7749300, lng: -122.4194200}, // I think this neeeds a special syntax
              title: 'Hello World!'
            }
        ]
    }
    handleScriptLoad() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 37.7749300, lng: -122.4194200}
        });
        this.state.LocationList.map(location => {
            const marker = new window.google.maps.Marker(
                { position: location.position,
                  map: this.map,
                  title: location.title }
            )
            return marker
        })
    }
    render(){
        const key = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}`
            return(
                <div className="pure-u-1">
                  <Script
            url={key}
            onLoad={this.handleScriptLoad.bind(this)}
                  />
                  <div id="map-container" className="pure-u-1 pure-img-responsive">
                    <div id="map" className="pure-u-1">
                    </div>
                  </div>
                </div>	
            )
        }
}
