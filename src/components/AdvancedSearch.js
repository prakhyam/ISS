import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

const AdvancedSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    confidenceLevel: 'medium',
    eventTypes: [],
    dateRange: {
      start: null,
      end: null
    },
    locationFilter: ''
  });

  const eventTypeOptions = [
    'Suspicious Activity',
    'Unknown Person',
    'Restricted Area Entry',
    'Unusual Movement',
    'Vehicle Tracking'
  ];

  const handleParamChange = (key, value) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="mb-4">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sliders className="mr-2" size={16} />
        <span>Advanced Search Parameters</span>
      </div>
      
      {isOpen && (
        <div className="border p-4 rounded mt-2 space-y-4 bg-gray-50">
          <div>
            <label className="block text-sm mb-2">Confidence Threshold</label>
            <select 
              className="w-full border rounded p-2"
              value={searchParams.confidenceLevel}
              onChange={(e) => handleParamChange('confidenceLevel', e.target.value)}
            >
              <option value="low">Low (&gt;50%)</option>
              <option value="medium">Medium (&gt;75%)</option>
              <option value="high">High (&gt;90%)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm mb-2">Event Types</label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypeOptions.map(type => (
                <label key={type} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={searchParams.eventTypes.includes(type)}
                    onChange={() => {
                      const currentTypes = searchParams.eventTypes;
                      const newTypes = currentTypes.includes(type)
                        ? currentTypes.filter(t => t !== type)
                        : [...currentTypes, type];
                      handleParamChange('eventTypes', newTypes);
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2">Date Range</label>
            <div className="flex space-x-2">
              <input 
                type="date" 
                className="w-full border rounded p-2"
                onChange={(e) => handleParamChange('dateRange', {
                  ...searchParams.dateRange,
                  start: e.target.value
                })}
              />
              <input 
                type="date" 
                className="w-full border rounded p-2"
                onChange={(e) => handleParamChange('dateRange', {
                  ...searchParams.dateRange,
                  end: e.target.value
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Location Filter</label>
            <input 
              type="text" 
              placeholder="Enter location name"
              className="w-full border rounded p-2"
              value={searchParams.locationFilter}
              onChange={(e) => handleParamChange('locationFilter', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;