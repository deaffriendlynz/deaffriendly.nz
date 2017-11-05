/*global google */
import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './AddLocation.css';
import {saveLocation} from './utils'

const categories = [
  {value: 'eating-out', label: 'Eating Out'},
  {value: 'accommodation', label: 'Accommodation'},
  {value: 'shopping', label: 'Shopping'},
  {value: 'other', label: 'Other'}
]

class AddLocation extends Component {
  constructor(props) {
    super(props)
    let map = new google.maps.Map(document.getElementById('map'));
    this.placesService = new google.maps.places.PlacesService(map)
    this.state = { address: '', showForm: false, category: '', error: ''}
    this.onChange = (address) => this.setState({ address })
    this.toggleForm = () => {
      this.setState({showForm: !this.state.showForm, error: ''})
    }
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    if (!this.state.category || !this.state.address) {
      this.setState({error: <span>Please select a business and a category, if you can't find the business you are looking for <a target="_blank" rel="noopener noreferrer" href='https://support.google.com/maps/answer/6320846?co=GENIE.Platform%3DDesktop&hl=en'>add it to Google Places</a></span>})
      return
    }

    geocodeByAddress(this.state.address)
      .then(results => {
        this.placesService.getDetails({
            placeId: results[0].place_id
        }, async (place, status) => {
          let latlng = await getLatLng(place)
          saveLocation(place, latlng, this.state.category)
          this.setState({showForm: false, address: ''})
        });
        return results })
      .catch(error => console.error('Error', error))
  }
  render() {
    const inputProps = {
      value: this.state.address,
      placeholder: 'Search for a business in google places',
      onChange: this.onChange,
    }
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    )
    const form = <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          inputProps={inputProps}
          autocompleteItem={AutocompleteItem}
        />
        <Select name='category'
          options={categories}
          value={this.state.category}
          onChange={(opt) => this.setState({category: opt.value})}
        />
        <button type="submit">Add</button>
      </form>
    const error = <div className='error'>{this.state.error}</div>
    return (
      <div className='AddLocation'>
        {this.state.error && error}
        <button onClick={this.toggleForm}>{this.state.showForm ? 'Cancel' : 'Add Location'}</button>
        {this.state.showForm && form}
      </div>
    )
  }
}

export default AddLocation
