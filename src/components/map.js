import React, { Component } from 'react';
import { MAPS_API_KEY } from '../keys.js';
import Script from 'react-load-script';
import cmarker from '../coffeeMarker.png';

export default class Map extends Component {
    state = {
        LocationList: []
    }

    handleScriptLoad() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12
        });
        const locations = this.props.locations;
        const bounds = new window.google.maps.LatLngBounds();
	const markerIMG = {
	    url: cmarker,
	    scaledSize: new window.google.maps.Size(35, 45)
	};
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
	    item.marker = marker;
	    marker.addListener("click", (_e) => this.props.mapTarget(marker.location));
            bounds.extend(item.geometry.location);
            return marker;
        });
        this.map.fitBounds(bounds);
    }

    filterMarkers() {
	// this will reset markers on render so that they match the filtered location list
	if (!this.markers) { return }
	this.markers.forEach(marker => {
	    marker.hidden = this.props.locations.indexOf(marker.location) == -1;
	    if (marker.hidden) {
		marker.infowindow.close();
		marker.setMap(null);
	    } else {
		// if it is not on the map, add it to the map
		!marker.map && marker.setMap(this.map)
	    }
	});
    }

    highlightMarker() {
	if (!this.markers) { return }
        const activeLocation = this.props.target;
	const activeMarker = activeLocation.marker;
	//if the marker clicked is a new, different marker apply highlight
	if (this.activeMarker !== activeMarker) {
	    this.activeMarker = activeMarker;
	    this.markers.forEach(marker => {
		marker.map && marker.setAnimation(null);
		marker.infowindow.close();
            });
            activeMarker.setAnimation(window.google.maps.Animation.BOUNCE);
            activeMarker.infowindow.setContent(`${activeLocation.name}<br/>${activeLocation.formatted_address}<br/><img src="${activeLocation.photoURL}" alt=${activeLocation.name}/>`);
            activeMarker.infowindow.open(this.map, activeMarker);
	}
    }
    render(){
	this.highlightMarker();
	this.filterMarkers();
        const mapsAPICall = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`;
        return(
            <div className="pure-u-1">
              <Script
            url={mapsAPICall}
            onLoad={this.handleScriptLoad.bind(this)}
              />
              <div id="map-container" className="pure-u-1">
                <div id="map" className="pure-u-1">
                </div>
              </div>
            </div>
        );
    }
}
