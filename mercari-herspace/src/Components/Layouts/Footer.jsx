import React from 'react';
import logo from '../../assets/logo.png'; // Ensure the path to your logo is correct

const Footer = () => {
  return (
    <footer className="bg-[#164453] text-white py-12">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 items-start">
          {/* Left Section - Logo and Description */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <img src={logo} alt="Shambhala Logo" className="w-24 mb-4" />
            <h3 className="text-3xl font-bold ">Shambhala </h3>
            <h6 className='mb-4 text-[18px] font-regular'>Spiritual Foundation</h6>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nascetur leo a aliquam efficitur at himenaeos. Fusce
              primis iaculis facilisis lectus dictum donec penatibus pulvinar.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col text-center md:text-left mt-8 md:mt-16">
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline hover:text-gray-300 transition">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:underline hover:text-gray-300 transition">About</a>
              </li>
              <li>
                <a href="/programs" className="hover:underline hover:text-gray-300 transition">Programs</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col text-center md:text-left mt-8 md:mt-16">
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blogs" className="hover:underline hover:text-gray-300 transition">Blogs</a>
              </li>
              <li>
                <a href="/media" className="hover:underline hover:text-gray-300 transition">Media</a>
              </li>
              <li>
                <a href="/guides" className="hover:underline hover:text-gray-300 transition">Guides</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col text-center md:text-left mt-8 md:mt-16">
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="hover:underline hover:text-gray-300 transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline hover:text-gray-300 transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col text-center md:text-left mt-8 md:mt-14">
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <p className="text-sm leading-relaxed">
              shambhala@gmail.com<br />
              +91 12345-67890<br />
              123, XYZ Colony, New Delhi, India
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm">
          &copy; 2024 Shambhala Spiritual Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
