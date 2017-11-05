/*global google*/
import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap} from "react-google-maps"
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'
import FontAwesome from 'react-fontawesome'

import {locationsFromStorage, listenForLocations} from './utils'
import './LocationMap.css'
import heart from './heart-24.png'

class LocationMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: false,
      showLocation: false,
      locations: []
    }
    this.setLocation()
    this.loadLocations()
  }
  componentWillReceiveProps(props) {
    if (props.filter !== this.props.filter) {
      this.setState({showLocation: ''})
    }
  }
  loadLocations() {
    locationsFromStorage().then((locations) => {
      this.setState({locations})
    })
    listenForLocations(locations => this.setState({locations}))
  }
  setLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({mapProps: {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 15
      },
        showMap: true
      })
    })
  }
  showLocation(place_id) {
    this.setState({showLocation: this.locations.find(loc => loc.place_id === place_id)})
  }
  infoBox() {
    let locationInfo = ''
      if (this.state.showLocation) {
        let loc = this.state.showLocation
        let {lat, lng} = loc.latlng
        console.log(loc)
        locationInfo = <InfoBox
            defaultPosition={ new google.maps.LatLng(lat, lng) }
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
              <div className='infoBox'>
                <div id='close'><FontAwesome name='times' onClick={() => this.setState({showLocation: ''})} style={{cursor: 'pointer', float:'right', color: '#999'}}/></div>
                <div>{loc.name}</div>
                <div>{loc.address}</div>
                <div>{loc.phone}</div>
                <div><a href={loc.website}>{loc.website}</a></div>
                <div>View in <a href={loc.url}>Google Maps</a></div>
              </div>
            </InfoBox>
      }
    return locationInfo
  }

  googleMap() {
    let showInfo = (loc) => this.setState({showLocation: loc})
    let locations = this.state.locations
        .filter(loc => {
          return this.props.filter === 'all' || this.props.filter === loc.category
        })
    return RenderMap(showInfo, this.state.mapProps, locations, this.infoBox())
  }

  render() {
    let Map = this.googleMap()
    return (
      <div className='LocationMap'>

        {this.state.showMap ? <Map
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> : ''}
      </div>
    )
  }
}

function RenderMap (showInfo, mapProps, locations, infoBox) {
    return withGoogleMap(props =>
      <GoogleMap
        defaultCenter={mapProps.center}
        defaultZoom={mapProps.zoom}
      >
      { locations.map((loc,i) => {
          return(
            <Marker
              key={i}
              position={{lat:loc.latlng.lat, lng: loc.latlng.lng}}
              icon={heart}
              onClick={e => showInfo(loc)} title={loc.name}
            />
          )
        })}
      {infoBox}
      </GoogleMap>
    )
}

export default LocationMap
