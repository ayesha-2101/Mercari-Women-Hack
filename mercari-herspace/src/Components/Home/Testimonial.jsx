import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from 'prop-types';

// Arrow components with margin-top, rounded background, and active/inactive states
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-30px] md:left-[-30px] lg:left-[-30px] top-1/2 transform -translate-y-1/2 z-10 ml-2 mt-52 cursor-pointer"
  >
    <div className="rounded-full bg-gray-300 p-2 hover:bg-gray-500 active:bg-gray-300 transition duration-300">
      <FaArrowLeft className="text-teal-900 w-6 h-6" />
    </div>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-30px] md:right-[-30px] lg:right-[-30px] top-1/2 transform -translate-y-1/2 z-10 mr-2 mt-52 cursor-pointer"
  >
    <div className="rounded-full bg-gray-300 p-2 hover:bg-gray-500 active:bg-gray-300 transition duration-300">
      <FaArrowRight className="text-teal-900 w-6 h-6" />
    </div>
  </div>
);

PrevArrow.propTypes = { onClick: PropTypes.func };
NextArrow.propTypes = { onClick: PropTypes.func };

const Testimonial = () => {
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur leo a aliquam, efficitur at himenaeos. Fusce primis iaculis facilisis lectus dictum donec penatibus pulvinar.",
    },
    {
      text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur leo a aliquam, efficitur at himenaeos. Fusce primis iaculis facilisis lectus dictum donec penatibus pulvinar.",
    },
    {
      text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur leo a aliquam, efficitur at himenaeos. Fusce primis iaculis facilisis lectus dictum donec penatibus pulvinar.",
    },
    {
      text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur leo a aliquam, efficitur at himenaeos. Fusce primis iaculis facilisis lectus dictum donec penatibus pulvinar.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
      <div style={{ marginTop: '50px' }}>
        <ul> {dots} </ul>
      </div>
    ),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  return (
    <motion.div
      ref={carouselRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="mx-auto p-8 bg-gray-100"
      style={{ minHeight: '400px' }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-teal-900 text-center">Testimonial</h2>
      
      <div className="w-full max-w-5xl mx-auto  mb-20 relative">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center h-64 flex flex-col justify-center items-center"
                   style={{ minHeight: '310px', maxWidth: '350px', margin: '0 auto' }}>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default Testimonial;
