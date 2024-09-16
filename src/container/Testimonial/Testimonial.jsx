import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "./Testimonial.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import { getAllTestimonials } from "../../api/apiTestimonials";
import { getAllBrands } from "../../api/apiBrands";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  // "currentIndex" correspond to index of testimonial that we're currently viewing
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllTestimonials()
      .then((data) => {
        setTestimonials(data.data);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      });

    getAllBrands()
      .then((data) => {
        setBrands(data.data);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={images[currentTestimonial.imgUrl]} alt="testimonial" />

            <div className="app__testimonial-content">
              <p className="p-text">{currentTestimonial.feedback}</p>
              <div>
                <h4 className="bold-text">{currentTestimonial.name}</h4>
                <h5 className="p-text">{currentTestimonial.company}</h5>
              </div>
            </div>
          </div>
          {/* The following code is for the left and right arrows, to navigate between testimonials */}
          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={"brand-" + brand.id}
          >
            <img src={images[brand.imgUrl]} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

// export default AppWrap(Testimonial, 'testimonial');

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
