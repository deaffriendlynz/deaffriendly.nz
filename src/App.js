import React, { Component } from 'react';
import {slide as Menu } from 'react-burger-menu'
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import {Courses, About, Contact} from './Pages'
import AddLocation from './AddLocation'
import FilteredMap from './FilteredMap'
import './App.css';
import './BurgerMenu.css';
import logo from './nzsl-friendly-logo.png'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu right="right">
            <Link to='/'>Home</Link>
            <Link to='/courses'>Courses</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
          </Menu>
          <header className="App-header">
            <img src={logo} alt='NZSL Friendly' />
          </header>
          <Route path='/' exact={true} render={() => (
            <div>
              <FilteredMap />
              <AddLocation />
            </div>
          )} />
          <Route path='/courses' exact={true} component={Courses} />
          <Route path='/about' exact={true} component={About} />
          <Route path='/contact' exact={true} component={Contact} />
        </div>
      </Router>
    );
  }
}

export default App;
