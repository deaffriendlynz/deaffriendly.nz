import React, { Component } from 'react';
import AddLocation from './AddLocation'
import FilteredMap from './FilteredMap'
import './App.css';
import logo from './nzsl-friendly-logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt='NZSL Friendly' />
        </header>
        <p className="App-intro">

        </p>
        <FilteredMap />
        <AddLocation />
      </div>
    );
  }
}

export default App;
