import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  MapPin, 
  AlertTriangle, 
  Eye, 
  Send 
} from 'lucide-react';

const RightSidebar = ({ notifications = [], selectedFrames = [] }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: chatInput
    };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI-assisted response for surveillance context
    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      text: processAIResponse(chatInput)
    };
    setChatMessages(prev => [...prev, aiResponse]);

    setChatInput('');
  };

  const processAIResponse = (input) => {
    // Context-aware AI response simulation
    if (input.toLowerCase().includes('suspicious')) {
      return 'Analyzing recent event logs for suspicious activities...';
    }
    return 'Understood. Searching surveillance records.';
  };

  return (
    <div className="w-96 bg-white border-l h-screen flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('events')}
          className={`flex-1 p-4 flex items-center justify-center ${
            activeTab === 'events' ? 'bg-gray-100' : ''
          }`}
        >
          <AlertTriangle className="mr-2" size={20} />
          Event Log
        </button>
        <button 
          onClick={() => setActiveTab('locations')}
          className={`flex-1 p-4 flex items-center justify-center ${
            activeTab === 'locations' ? 'bg-gray-100' : ''
          }`}
        >
          <MapPin className="mr-2" size={20} />
          Locations
        </button>
      </div>

      {/* Content */}
      {activeTab === 'events' && (
        <div className="p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Detected Events</h2>
          {notifications.map((event, index) => (
            <div 
              key={index} 
              className="flex items-center bg-gray-50 p-3 rounded-lg mb-2"
            >
              <AlertTriangle 
                className={`mr-3 ${
                  event.confidence > 0.8 
                    ? 'text-red-500' 
                    : 'text-yellow-500'
                }`} 
                size={24} 
              />
              <div className="flex-grow">
                <p className="text-sm font-medium">{event.type}</p>
                <p className="text-xs text-gray-500">
                  {event.location} • {event.timestamp}
                </p>
                <div className="text-xs mt-1">
                  Confidence: {(event.confidence * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Location Tab */}
      {activeTab === 'locations' && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Selected Frames</h2>
          <div className="grid grid-cols-2 gap-2">
            {selectedFrames.map((frame, index) => (
              <div 
                key={index} 
                className="border rounded overflow-hidden"
              >
                <img 
                  src={frame.thumbnail} 
                  alt={`Frame ${index + 1}`} 
                  className="w-full h-24 object-cover" 
                />
                <div className="p-1 text-xs text-center">
                  {frame.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;