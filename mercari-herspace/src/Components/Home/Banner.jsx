import React from 'react';
import PropTypes from 'prop-types';
import girl from '../../assets/girl.jpeg'; // Ensure the image path is correct

const Banner = ({ imageSrc = girl, title, description }) => {
  return (
    <div className="relative w-full h-[400px] md:h-[400px] flex items-center justify-center">
      {/* Text Container */}
      <div className="text-black text-center px-10 w-full lg:w-2/3">
        <h2 className="text-5xl font-bold mb-4 cursive">{title}</h2>
        <p className="mt-2 text-4xl cursive">{description}</p>
      </div>
    </div>
  );
};

Banner.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Banner;



