import React, { useState, useRef } from 'react';
import { 
  Home, Folder, Play, Search, 
  Settings, HelpCircle, MapPin, Globe, 
  Layers, Filter, AlertTriangle, Map as MapIcon
} from 'lucide-react';

const Sidebar = ({ 
  onVideoUpload, 
  onGeospatialFilter, 
  onNavigate, 
  activeView 
}) => {
  const fileInputRef = useRef(null);
  const [geospatialSettings, setGeospatialSettings] = useState({
    activeRegions: [],
    alertThresholds: {
      suspiciousActivity: false,
      restrictedAreaEntry: false,
      unusualMovement: false
    }
  });

  // Predefined regions for geospatial monitoring
  const predefinedRegions = [];

  const handleNewClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      onVideoUpload(Array.from(files));
    }
  };

  const toggleRegionMonitoring = (regionId) => {
    setGeospatialSettings(prev => {
      const currentRegions = prev.activeRegions;
      const newRegions = currentRegions.includes(regionId)
        ? currentRegions.filter(id => id !== regionId)
        : [...currentRegions, regionId];
      
      onGeospatialFilter({
        activeRegions: newRegions,
        alertThresholds: prev.alertThresholds
      });

      return {
        ...prev,
        activeRegions: newRegions
      };
    });
  };

  const toggleAlertType = (alertType) => {
    setGeospatialSettings(prev => {
      const newSettings = {
        ...prev,
        alertThresholds: {
          ...prev.alertThresholds,
          [alertType]: !prev.alertThresholds[alertType]
        }
      };

      onGeospatialFilter(newSettings);

      return newSettings;
    });
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div 
        className="flex items-center mb-8 cursor-pointer" 
        onClick={() => onNavigate('overview')}
      >
        <div className="w-10 h-10 bg-gray-700 mr-3 rounded"></div>
        <span className="font-bold text-lg">ISS</span>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple 
        accept="video/*" 
        className="hidden"
      />
      
      <button 
        onClick={handleNewClick}
        className="bg-green-600 text-white w-full py-2 rounded mb-6"
      >
        + New Video
      </button>
      
      {/* Geospatial Monitoring Section */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Globe className="mr-2" size={16} />
          <h3 className="font-semibold">Geospatial Monitoring</h3>
        </div> 
      </div>
      
      <nav className="space-y-2 flex-grow">
        <SidebarItem 
          icon={Home} 
          label="Overview" 
          active={activeView === 'overview'}
          onClick={() => onNavigate('overview')}
        />
        <SidebarItem icon={Folder} label="Indexes" />
        <SidebarItem icon={Play} label="Examples" />
        <SidebarItem 
          icon={MapIcon} 
          label="Geospatial Map" 
          active={activeView === 'map'}
          onClick={() => onNavigate('map')}
        />
      </nav>
      
      <nav className="border-t border-gray-700 pt-4 space-y-2">
        <SidebarItem icon={Search} label="Search" />
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={HelpCircle} label="Help" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={`flex items-center p-2 rounded cursor-pointer ${
      active ? 'bg-blue-600' : 'hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    <Icon className="mr-3" size={20} />
    <span>{label}</span>
  </div>
);

export default Sidebar;
