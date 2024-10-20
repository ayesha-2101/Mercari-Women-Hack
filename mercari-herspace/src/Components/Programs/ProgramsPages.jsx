import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import programimage from '../../assets/programsimages/programimage.png';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const Programs = () => {
  const [eventType, setEventType] = useState('All Events');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            channelId: channelId,
            type: 'video',
            key: apiKey,
            maxResults: 10
          },
        });
        const fetchedEvents = response.data.items.map(event => {
          const eventStatus = event.snippet.liveBroadcastContent || 'none';
          return {
            ...event,
            status: eventStatus === 'none' || eventStatus === '' ? 'Past' : eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1),
          };
        });
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents); // Initial state with all events
      } catch (error) {
        console.error('Error fetching YouTube events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDropdown = (type) => {
    setEventType(type);
    setDropdownOpen(false);

    if (type === 'All Events') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.status.toLowerCase() === type.toLowerCase()));
    }
  };

  const getStatusStyle = (status) => {
    let color, lightBackgroundColor, darkBackgroundColor;

    switch (status.toLowerCase()) {
      case 'live':
        color = '#ef4444'; // Red
        lightBackgroundColor = '#fee2e2'; // Light red
        darkBackgroundColor = '#dc2626'; // Dark red
        break;
      case 'upcoming':
        color = '#22c55e'; // Green
        lightBackgroundColor = '#d1fae5'; // Light green
        darkBackgroundColor = '#16a34a'; // Dark green
        break;
      case 'past':
      default:
        color = '#f59e0b'; // Orange
        lightBackgroundColor = '#ffedd5'; // Light orange
        darkBackgroundColor = '#d97706'; // Dark orange
        break;
    }

    return {
      color,
      backgroundColor: lightBackgroundColor,
      padding: '4px 8px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      animation: `blink-${status.toLowerCase()} 1.5s linear infinite alternate`,
      position: 'relative',
    };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-16">
      {/* Style for blinking animation */}
      <style>
        {`
          @keyframes blink-live {
            0% { background-color: #fee2e2; }
            50% { background-color: #dc2626; }
            100% { background-color: #fee2e2; }
          }
          @keyframes blink-upcoming {
            0% { background-color: #d1fae5; }
            50% { background-color: #16a34a; }
            100% { background-color: #d1fae5; }
          }
          @keyframes blink-past {
            0% { background-color: #ffedd5; }
            50% { background-color: #d97706; }
            100% { background-color: #ffedd5; }
          }
        `}
      </style>

      {/* Dropdown */}
      <div className="relative inline-block text-left mb-6 w-full md:w-auto">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-white border border-gray-300 text-black py-2 px-4 rounded-md shadow-md flex justify-between items-center w-full md:w-auto"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {eventType}
          {dropdownOpen ? (
            <ChevronUpIcon className="ml-2 w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="ml-2 w-5 h-5 text-gray-500" />
          )}
        </motion.button>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50"
          >
            <ul className="py-1">
              {['All Events', 'Live', 'Upcoming', 'Past'].map((type) => (
                <li
                  key={type}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleDropdown(type)}
                >
                  {type}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Program Cards or No Data Message */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredEvents.map((event, index) => {
            const eventStatus = event.status;
            const uploadDate = event.snippet.publishedAt ? formatDate(event.snippet.publishedAt) : 'Unknown Date';
            const videoId = event.id.videoId;

            return (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg shadow-lg overflow-hidden mx-auto flex flex-col h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
                style={{ maxWidth: '360px' }}
              >
                <img src={event.snippet.thumbnails.medium.url || programimage} alt="Program" className="w-full h-48 object-cover" />
                <div className="flex-grow p-4 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span style={getStatusStyle(eventStatus)}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor', marginRight: '6px' }}></span>
                      {eventStatus}
                    </span>
                  </div>
                  <p className="text-black text-sm font-medium mb-4 line-clamp-2">{event.snippet.title}</p>
                  <div className="flex items-center text-black font-medium text-sm mb-2">
                    <span className="mr-2">📅</span> {eventStatus === 'Past' ? `Uploaded on: ${uploadDate}` : 'Event Date TBD'}
                  </div>
                  <div className="flex items-center text-black text-sm font-medium mb-4">
                    <span className="mr-2">📍</span> Online Event
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full"
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-teal-600 text-white py-2 rounded-md shadow hover:bg-teal-700 transition duration-200"
                    >
                      Watch Now
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>No events available for &quot;{eventType}&quot;.</p>
        </div>
      )}
    </div>
  );
};

export default Programs;
