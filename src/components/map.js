import React, { Component } from 'react';
import MAPS_API_KEY from '../keys.js';
import Script from 'react-load-script';
import cmarker from '../coffeeMarker.png'
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
	const markerIMG = {
	    url: cmarker,
	    scaledSize: new window.google.maps.Size(35, 45)
	}
        this.markers = locations.map(item => {
            let marker = new window.google.maps.Marker(
                { position: item.geometry.location,
                  map: this.map,
                  title: item.name,
		  icon: markerIMG
		}
            );
            marker.infowindow = new window.google.maps.InfoWindow();
	    marker.location = item;
	    marker.addListener("click", () => this.clickMarker(marker))
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
    }
    bounceMarker() {
        const clickedListItem = this.props.target;
	console.log('target',this.props.target);
	if (!this.markers || !clickedListItem) { return }
        this.markers.forEach(marker => {
            if(marker.title == clickedListItem) {
		this.clickMarker(marker)
	    }
	})
    }
    clickMarker(marker) {
	this.markers.forEach(marker => {
	    marker.map && marker.setAnimation(null);
	    marker.infowindow.close()
	});
	const location = marker.location;
	marker.setAnimation(window.google.maps.Animation.BOUNCE);
	marker.infowindow.setContent(`${location.name}<br/>${location.formatted_address}`)
        marker.infowindow.open(this.map, marker);
    }
    render(){
	this.bounceMarker();
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
