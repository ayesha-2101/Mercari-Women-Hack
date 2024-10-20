import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import Home from './Components/Pages/Home';
import FloatingChatIcon from './Components/FloatingChatIcon';
import Footer from './Components/Layouts/Footer';






// import YouTubeEvents from './YouTubeEvents';

import  {AuthProvider}  from './AuthContext';
// testing pull works 

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        
          
          {/* <Route path="/events" element={<YouTubeEvents />} /> */}
        </Routes>
        <FloatingChatIcon />

      </div>
     
    </Router>
    </AuthProvider>
  );
}

export default App;
