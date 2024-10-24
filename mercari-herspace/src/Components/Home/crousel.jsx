import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Banner from './Banner'; // Import the Banner component

const CarouselComponent = () => {
  const banners = [
    {
      title: "You Are Beautiful",
      description: "We are a gorgeous, infinite circle of women of all shades, all styles, in all the ways we were made. Inside of us, everything blooms.",
      bgColor: "bg-pink-100", // Soft pink
    },
    {
      title: "You Are Enough",
      description: "Your worth is not measured by your looks. You are enough, just as you are.",
      bgColor: "bg-blue-100", // Soft blue
    },
    {
      title: "Celebrate Your Body",
      description: "Love the skin you're in. Every inch of you is worth celebrating.",
      bgColor: "bg-green-100", // Soft green
    },
    {
      title: "Embrace Your Flaws",
      description: "Your 'imperfections' make you unique. Own them, love them, embrace them.",
      bgColor: "bg-purple-100", // Light lavender
    },
    {
      title: "Radiate Confidence",
      description: "Confidence is the best outfit. Rock it and own the world!",
      bgColor: "bg-yellow-100", // Soft pastel yellow
    },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[400px] overflow-hidden mb-0">
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        className="h-[60vh]"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${banner.bgColor} h-full`}
          >
            <Banner 
              title={banner.title} 
              description={banner.description} 
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;


