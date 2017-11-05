import React, { Component } from 'react';
import './Courses.css'

export default class Courses extends Component {
  render() {
    return <div>
      <h1>Learn New Zealand Sign Language</h1>

      <div className='course'>
      <h3>Introduction</h3>
<iframe title="introduction" width="560" height="315" src="https://www.youtube.com/embed/dJ8LmQj-MYE" frameborder="0" gesture="media" allowfullscreen></iframe>
  </div>
      <div className='course'>
      <h3>Fire Safety</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/jer-BOa3qdA" frameborder="0" gesture="media" allowfullscreen title="Fire Safety"></iframe>
      </div>
      <div className='course'>
      <h3>NZSL Slang</h3>
<iframe title="slang" width="560" height="315" src="https://www.youtube.com/embed/dFxh2vNRpIc" frameborder="0" gesture="media" allowfullscreen></iframe>
      </div>
    </div>
  }
}
