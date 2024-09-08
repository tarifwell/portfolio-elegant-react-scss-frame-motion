import React from 'react';


import './NavigationDots.scss';

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
      {['home', 'about', 'work', 'skills', 'testimonials', 'contact'].map((item, index) => (
        <a
          href={`#${item}`} 
          key={`nav-dot-${index}`} 
          className='app__navigation-dot' 
          style={active === item ? { backgroundColor: '#313BAC' } : { }}
        />
      ))}
    </div>
  )
}

export default NavigationDots