import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import './About.scss';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import { getAllAbouts } from '../../api/apiAbouts';

const About = () => {

  const [abouts, setAbouts] = useState([]);

    useEffect(() => {
      getAllAbouts()
        .then((data) => {
          setAbouts(data.data);
        })
        .catch((error) => {
          console.error("Error fetching abouts:", error);
        });
    }, []);  

  return (
    <>
      <h2 className='head-text'> I know that <span>Good Developemt</span> <br /> means <span>Good Business</span></h2>

      <div className='app__profiles'>
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='app__profile-item'
            // key={about.title + index}
            key={`about-${index}`}
          >            
            <img src={images[about.imgUrl.slice(0, -4).toString()]} alt={about.title} />
            <h2 className='bold-text' style={{ marginTop: 20 }}>{about.title}</h2>
            <p className='p-text' style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(About, 'about');