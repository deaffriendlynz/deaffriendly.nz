import React from 'react';
import {Link} from 'react-router-dom'

export const Courses = () => {
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

export const About = () => {
  return <div style={{width: '80%', margin: 'auto'}}>
      NZSL Friendly was built at <a href='http://communities.techstars.com/new-zealand/wellington/startup-weekend/11522'>Startup Weekend Pasifika 2017</a>. It is a work in progress, please <Link to='/contact'>contact us</Link> with any questions or suggestions.
    </div>
}
export const Contact = () => {
  return <div style={{width: '80%', margin: 'auto'}}>
      <h3><a href='mailto:info@nzslfriendly.org'>info@nzslfriendly.org</a></h3>
    </div>
}
