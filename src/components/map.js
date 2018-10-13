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
        const infowindow = new window.google.maps.InfoWindow();
        locations.map(item => {
            const marker = new window.google.maps.Marker(
                { position: item.geometry.location,
                  map: this.map,
                  title: item.name }
            );
            marker.addListener('click', function(e){
                infowindow.setContent(`${item.name}<br/>${item.formatted_address}`)
                infowindow.open(this.map, marker);
            });
            bounds.extend(item.geometry.location);
            return marker;
        });
        this.map.fitBounds(bounds);
    }
    toggleMarkers() {
	if (!this.markers) { return }
	// for each marker
	this.markers.forEach(marker => marker.setMap(null))
	const visible_markers = []
	this.props.locations.forEach(location => {
	    this.markers.forEach(marker => {
		    if(marker.title === location.name){visible_markers.push(marker)}
	    })
	})
	visible_markers.forEach(marker => marker.setMap(this.map))	
    }
    render(){
	this.toggleMarkers();
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
