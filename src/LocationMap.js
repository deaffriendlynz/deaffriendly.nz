/*global google*/
import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap} from "react-google-maps"
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'
import {locationsFromStorage} from './utils'
import './LocationMap.css'
import heart from './heart-24.png'
import FontAwesome from 'react-fontawesome'

class LocationMap extends Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({props: {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 15
      },
        showMap: true
      })
    })
    this.locations = locationsFromStorage()
    this.state = {
      showMap: false,
      showLocation: false
    }
  }
  showLocation(place_id) {
    this.setState({showLocation: this.locations.find(loc => loc.place_id === place_id)})

  }
  infoBox() {
    let locationInfo = ''
      if (this.state.showLocation) {
        let loc = this.state.showLocation
        let {lat, lng} = loc.latlng
        locationInfo = <InfoBox
            defaultPosition={ new google.maps.LatLng(lat, lng) }
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
            onCloseClick={e => console.log}
          >
              <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `16px`, color: `#000` }}>
                  {loc.name}
                </div>
              </div>
            </InfoBox>
      }
    return locationInfo
  }
  render() {
    let Map
    let showInfo = (loc) => this.setState({showLocation: loc})
    if (this.state.showMap) {
      Map = withGoogleMap(props =>
        <GoogleMap
          defaultCenter={this.state.props.center}
          defaultZoom={this.state.props.zoom}
        >
        {this.locations.map((loc,i) => {
          return(
            <Marker
              key={i}
              position={{lat:loc.latlng.lat, lng: loc.latlng.lng}}
              icon={heart}
              onClick={e => showInfo(loc)} title={loc.name}
            />
          )
          })}
        {this.infoBox()}
        </GoogleMap>
      )
    }
    return (
      <div className='LocationMap'>
        <div className='filters'>
          <FontAwesome className='category-selector' name='shopping-cart' size='3x' />
          <FontAwesome className='category-selector' name='cutlery' size='3x' />
          <FontAwesome className='category-selector' name='bed' size='3x' />
        </div>

        {Map ? <Map
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> : ''}
      </div>
    )
  }
}

export default LocationMap
