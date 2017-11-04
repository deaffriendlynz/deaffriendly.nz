import React, { Component } from 'react';
import AddLocation from './AddLocation'
import LocationMap from './LocationMap'
import './App.css';
import logo from './nzsl-friendly-logo.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt='Deaf Friendly NZ' />
        </header>
        <p className="App-intro">

        </p>
        <AddLocation />
        <LocationMap />
      </div>
    );
  }
}

export default App;
