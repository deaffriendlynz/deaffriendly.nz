/*global google*/
import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap} from "react-google-maps"
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox'
import {locationsFromStorage, listenForLocations} from './utils'
import './LocationMap.css'
import heart from './heart-24.png'
import FontAwesome from 'react-fontawesome'

const filters = [
  {name: 'shopping-cart', title: 'Shopping', code: 'shopping'},
  {name: 'cutlery', title: 'Eating Out', code: 'eating-out'},
  {name: 'bed', title: 'Accommodation', code: 'accommodation'},
  {name: 'signing', title: 'All', code: 'all'}
]
class LocationMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: false,
      showLocation: false,
      filter: 'all',
      locations: []
    }
    this.setLocation()
    this.loadLocations()
  }
  loadLocations() {
    locationsFromStorage().then((locations) => {
      this.setState({locations})
    })
    listenForLocations(locations => this.setState({locations}))
  }
  setLocation() {
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

  filterButton(filter) {
    let className = 'category-selector'
    if (filter.code === this.state.filter) {
      className += ' selected'
    }
    return <FontAwesome
              key={filter.code}
              className={className}
              onClick={() => this.setState({filter: filter.code})}
              name={filter.name}
              title={filter.title}
              size='3x' />
  }

  googleMap() {
    let showInfo = (loc) => this.setState({showLocation: loc})
    return withGoogleMap(props =>
      <GoogleMap
        defaultCenter={this.state.props.center}
        defaultZoom={this.state.props.zoom}
      >
      {this.state.locations
        .filter(loc => {
          return this.state.filter === 'all' || this.state.filter === loc.category
        })
        .map((loc,i) => {
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

  render() {
    let Map = this.googleMap()
    return (
      <div className='LocationMap'>
        <div className='filters'>
          {filters.map(filter => this.filterButton(filter))}
        </div>

        {this.state.showMap ? <Map
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> : ''}
      </div>
    )
  }
}

export default LocationMap
