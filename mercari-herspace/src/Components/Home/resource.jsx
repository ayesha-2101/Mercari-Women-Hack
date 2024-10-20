import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import resource1 from '../../assets/resources.jpeg';
import resource2 from '../../assets/resource2.jpeg';
import resource3 from '../../assets/resource3.jpeg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Resource = () => {
    const navigate = useNavigate(); // Initialize useNavigate

  const handleNext = () => {
    navigate('/blog'); // Navigate to the Blogs page
        
    };

    return (
        <div className="flex flex-col items-center my-20"> {/* Changed to flex-col for vertical stacking */}
            <h2 className="text-2xl font-bold mb-6">Resources</h2> {/* Added heading */}

            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6"> {/* Responsive layout */}
                {/* Image 1: Blogs */}
                <div className="relative group w-full md:w-[400px]"> {/* Adjust width for larger images */}
                    <img
                        src={resource1}
                        alt="/blog"
                        className="w-full h-44 object-cover transition-transform duration-300 transform group-hover:scale-105 opacity-50" // Adjust to full width
                    />
                    <div className="absolute text-xl top-2 left-2 text-accent font-semibold">Blogs</div>
                    <button
                        onClick={handleNext}
                        className="absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition focus:outline-none"
                    >
                        &gt; {/* Right Arrow */}
                    </button>
                </div>

                {/* Image 2: Media */}
                <div className="relative group w-full md:w-[400px]">
                    <Link to="/media"> {/* Wrap the entire card in Link */}
                        <img
                            src={resource2}
                            alt="Media"
                            className="w-full h-44 object-cover transition-transform duration-300 transform group-hover:scale-105 opacity-50"
                        />
                        <div className="absolute text-xl top-2 left-2 text-accent font-semibold">Media</div>
                    </Link>
                    <Link to="/media"> {/* Link the button as well */}
                        <button
                            className="absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition focus:outline-none"
                        >
                            &gt; {/* Right Arrow */}
                        </button>
                    </Link>
                </div>

                {/* Image 3: Guides */}
                <div className="relative group w-full md:w-[400px]">
                    <Link to="/guides"> {/* Wrap the entire card in Link */}
                        <img
                            src={resource3}
                            alt="Guides"
                            className="w-full h-44 object-cover transition-transform duration-300 transform group-hover:scale-105 opacity-50"
                        />
                        <div className="absolute text-xl top-2 left-2 text-accent font-semibold">Guides</div>
                    </Link>
                    <Link to="/guides"> {/* Link the button as well */}
                        <button
                            className="absolute bottom-2 right-2 h-10 w-10 flex items-center justify-center bg-white text-black rounded-full hover:bg-gray-200 transition focus:outline-none"
                        >
                            &gt; {/* Right Arrow */}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resource;
