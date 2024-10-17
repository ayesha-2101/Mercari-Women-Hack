import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to import the CSS file

const App = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [response, setResponse] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputSentence(transcript);
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const handleSubmit = async () => {
    if (inputSentence) {
      try {
        const res = await axios.post('http://127.0.0.1:5000/recommend', { input_sentence: inputSentence });
        setResponse(res.data);
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance("Here is a suggestion for you");
        synth.speak(utterThis);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">MyApp</div>
        <div className="navbar-links">
          <a href="#home">WhisList</a>
          <a href="#about">Bag</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <div className="container">
        <h1>Voive Assistant</h1>
        <button className="button" onClick={startListening} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start Speaking'}
        </button>
        <button className="button" onClick={handleSubmit} disabled={!inputSentence}>
          Submit
        </button>
        {response && (
          <div className="response-container">
            <h2>Recommendation</h2>
            <p>Product ID: {response.product_id}</p>
            <p>Product Name: {response.product_name}</p>
            {response.product_description && (
              <img src={response.product_description} alt="Product" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;