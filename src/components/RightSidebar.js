import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  MessageCircle, 
  Send, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';

// Sample notifications (you'd typically fetch these dynamically)
const sampleNotifications = [
  {
    id: 1,
    type: 'alert',
    icon: AlertCircle,
    iconColor: 'text-yellow-500',
    message: 'Suspicious activity detected in Sector 3',
    timestamp: '2m ago'
  },
  {
    id: 2,
    type: 'success',
    icon: CheckCircle,
    iconColor: 'text-green-500',
    message: 'Security checkpoint cleared',
    timestamp: '10m ago'
  }
];

// Sample frames (you'd replace this with actual frame retrieval logic)
const sampleFrames = [
  'https://via.placeholder.com/300x200?text=Red+Shirt+Frame+1',
  'https://via.placeholder.com/300x200?text=Red+Shirt+Frame+2',
  'https://via.placeholder.com/300x200?text=Red+Shirt+Frame+3'
];

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [retrievedFrames, setRetrievedFrames] = useState([]);
  const chatEndRef = useRef(null);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: chatInput
    };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on input
    const aiResponse = {
      id: Date.now() + 1,
      type: 'ai',
      text: processAIResponse(chatInput)
    };
    setChatMessages(prev => [...prev, aiResponse]);

    // Clear input
    setChatInput('');
  };

  const processAIResponse = (input) => {
    // Basic AI response simulation
    if (input.toLowerCase().includes('red shirt')) {
      // Simulate frame retrieval
      setRetrievedFrames(sampleFrames);
      return 'I found 3 frames with a red shirt.';
    }
    return 'I understood your request. Processing...';
  };

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="w-96 bg-white border-l h-screen flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 p-4 flex items-center justify-center ${
            activeTab === 'notifications' ? 'bg-gray-100' : ''
          }`}
        >
          <Bell className="mr-2" size={20} />
          Notifications
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 p-4 flex items-center justify-center ${
            activeTab === 'chat' ? 'bg-gray-100' : ''
          }`}
        >
          <MessageCircle className="mr-2" size={20} />
          Chat
        </button>
      </div>

      {/* Content */}
      {activeTab === 'notifications' && (
        <div className="p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          {sampleNotifications.map(notification => (
            <div 
              key={notification.id} 
              className="flex items-center bg-gray-50 p-3 rounded-lg mb-2"
            >
              <notification.icon 
                className={`mr-3 ${notification.iconColor}`} 
                size={24} 
              />
              <div className="flex-grow">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {chatMessages.map(message => (
              <div 
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div 
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Retrieved Frames */}
          {retrievedFrames.length > 0 && (
            <div className="p-4 border-t">
              <h3 className="font-semibold mb-2">Retrieved Frames</h3>
              <div className="grid grid-cols-3 gap-2">
                {retrievedFrames.map((frame, index) => (
                  <img 
                    key={index} 
                    src={frame} 
                    alt={`Retrieved frame ${index + 1}`} 
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form 
            onSubmit={handleChatSubmit}
            className="p-4 border-t flex items-center"
          >
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about frames or events..."
              className="flex-grow mr-2 p-2 border rounded"
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;