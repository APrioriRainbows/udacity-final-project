import React, { Component } from 'react';
import MAPS_API_KEY from '../keys.js';
import Script from 'react-load-script';

export default class Map extends Component {
    constructor(props){
	super(props);
    }
    state = {
        LocationList: []
    }
    handleScriptLoad() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
        });

        const locations = this.props.locations;
        const bounds = new window.google.maps.LatLngBounds();
        locations.map(item => {
            const marker = new window.google.maps.Marker(
                { position: item.geometry.location,
                  map: this.map,
                  title: item.name }
            )
            bounds.extend(item.geometry.location);
            return marker;
        });
        this.map.fitBounds(bounds);
    }
    render(){
        const key = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`
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
