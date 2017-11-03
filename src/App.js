import React, { Component } from 'react';
import AddLocation from './AddLocation'
import LocationMap from './LocationMap'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Deaf Friendly NZ</h1>
          <AddLocation />
          <LocationMap />
        </header>
        <p className="App-intro">
          An online travel guide by and for the deaf community.
        </p>
      </div>
    );
  }
}

export default App;
