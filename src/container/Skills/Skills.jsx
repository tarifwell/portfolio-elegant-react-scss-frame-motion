import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

import "./Skills.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import { getAllExperiences } from "../../api/apiExperiences";
import { getAllSkills } from "../../api/apiSkills";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getAllExperiences()
      .then((data) => {
        // Note: data.data is an array of objects "years (of experience)", in which we need another array of "works"
        setExperiences(data.data);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      });

    getAllSkills()
      .then((data) => {
        // Note: data.data is an array of objects for needed "skills"
        setSkills(data.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <h2>
        I know that <span>Good Developemt</span> means{" "}
        <span>Good Business</span>
      </h2>

      <div className="app__skills-container">
        <motion.div
          // whileInView={{ opacity: [0, 1] }}
          // transition={{ duration: 0.5 }}
          className="app__skills-list"
        >
          {skills?.map((skill, index) => (
            <motion.div
              key={`skill-${index}`}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={images[skill.icon]} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="app__skills-exp">
          {experiences.length > 0 &&
            experiences?.map((experience, index) => (
              <motion.div
                key={`experience-${index}`}
                // key={experience.year}
                className="app__skills-exp-item"
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>

                <motion.div className="app__skills-exp-works">
                  {experience.works &&
                    experience?.works?.map((work, index) => (
                      <React.Fragment key={`experience-work-${index}`}>
                        <motion.div
                          whileInView={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5 }}
                          className="app__skills-exp-work"
                          data-tooltip-id={`tooltip-${work.name}`}
                          data-tooltip-content={work.description}
                        >
                          <h4 className="bold-text">{work.name}</h4>
                          <p className="p-text">{work.company}</p>
                        </motion.div>

                        <Tooltip 
                          id={`tooltip-${work.name}`} 
                          effect="solid" 
                          arrowColor="#fff" 
                          className="skills-tooltip" 
                        />
                      </React.Fragment>
                    ))}
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </>
  );
};

// export default AppWrap(Skills, "skills");

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);

