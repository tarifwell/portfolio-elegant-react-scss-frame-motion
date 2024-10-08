import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import './Work.scss';
import { AppWrap, MotionWrap } from '../../wrapper';
import { images } from '../../constants';
import { getAllWorks } from '../../api/apiWorks';

const Work = () => {

  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [animateIcon, setAnimateIcon] = useState({ y: 0, opacity: 0 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    getAllWorks()
      .then((data) => {
        setWorks(data.data);
        setFilterWork(data.data);
        //console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching works:", error);
      });
    }, []); 


  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      } 
    }, 500);
  };
  
  return (
    <>
      <h2 className='head-text'> My creative <span>Portfolio</span> Section </h2>

      <div className='app__work-filter'>
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={`work-item-${index}`}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}

      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
        // variants={fadeIn('up', 'spring', 0.5, 0.75)}
        // initial='hidden'
        // whileInView='show'
        // viewport={{ once: false, amount: 0.25 }}
      >
        {filterWork.map((work, index) => (
          <div className='app__work-item app__flex' key={`work-${index}`}>
            <div className='app__work-img app__flex' >
              <img src={images[work.imgUrl]} alt={work.title} />

              <motion.div
                animate={animateIcon}
                whileHover={{ opacity: [0, 1] }}
                onMouseOut={() => setAnimateIcon([{ y: 0, opacity: 0 }])}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{work.name}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>

              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

// export default AppWrap(Work, 'work');

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);
