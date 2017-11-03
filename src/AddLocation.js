/*global google */
import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './AddLocation.css';
import {saveLocation} from './utils'

class AddLocation extends Component {
  constructor(props) {
    super(props)
    let map = new google.maps.Map(document.getElementById('map'));
    this.placesService = new google.maps.places.PlacesService(map)
    this.state = { address: '', showForm: false }
    this.onChange = (address) => this.setState({ address })
    this.toggleForm = () => {this.setState({showForm: !this.state.showForm})}
  }
  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => {
        this.placesService.getDetails({
            placeId: results[0].place_id
        }, async (place, status) => {
          let latlng = await getLatLng(place)
          saveLocation(place, latlng)
          this.setState({showForm: false, address: ''})
        });
        return results })
      .catch(error => console.error('Error', error))
  }
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    )
    const form = <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} autocompleteItem={AutocompleteItem}/>
        <button type="submit">Add</button>
      </form>
    return (
      <div className='AddLocation'>
        <button onClick={this.toggleForm}>{this.state.showForm ? 'Cancel' : 'Add Location'}</button>
        {this.state.showForm && form}
      </div>
    )
  }
}

export default AddLocation
