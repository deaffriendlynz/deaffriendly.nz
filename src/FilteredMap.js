import React, { Component } from 'react'
import LocationMap from './LocationMap'
import FontAwesome from 'react-fontawesome'

export default class FilteredMap extends Component {
  constructor(props) {
    super(props)
    this.state={filter: 'all'}
    this.filters = [
      {name: 'shopping-cart', title: 'Shopping', code: 'shopping'},
      {name: 'cutlery', title: 'Eating Out', code: 'eating-out'},
      {name: 'bed', title: 'Accommodation', code: 'accommodation'},
      {name: 'signing', title: 'All', code: 'all'}
    ]
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

  render() {
    return <div>
        <div className='filters'>
          {this.filters.map(filter => this.filterButton(filter))}
        </div>
        <LocationMap filter={this.state.filter} />
      </div>
  }
}
