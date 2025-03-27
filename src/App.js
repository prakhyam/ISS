import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import SearchBar from './components/SearchBar';
import VideoGrid from './components/VideoGrid';
import AdvancedSearch from './components/AdvancedSearch';
import { MapView } from './components/MapView';
import 'leaflet/dist/leaflet.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [activeView, setActiveView] = useState('overview');
  const [geospatialFilter, setGeospatialFilter] = useState({
    activeRegions: [],
    alertThresholds: {
      suspiciousActivity: false,
      restrictedAreaEntry: false,
      unusualMovement: false
    }
  });

  const handleVideoUpload = (uploadedFiles) => {
    const newVideos = uploadedFiles.map(file => ({
      title: file.name,
      duration: 'Processing...',
      thumbnail: URL.createObjectURL(file),
      file: file
    }));
    
    setVideos(prevVideos => [...prevVideos, ...newVideos]);
  };

  const handleGeospatialFilter = (filterSettings) => {
    setGeospatialFilter(filterSettings);
    console.log('Geospatial Filter Updated:', filterSettings);
  };

  const handleSidebarNavigation = (view) => {
    setActiveView(view);
  };

  const renderMainContent = () => {
    switch(activeView) {
      case 'overview':
        return (
          <>
            <SearchBar />
            <AdvancedSearch />
            <VideoGrid videos={videos} />
          </>
        );
      case 'map':
        return (
          <div className="h-full w-full p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Geospatial Monitoring</h2>
              <p className="text-gray-600">Real-time event tracking across monitored regions</p>
            </div>
            <MapView 
              events={[
                {
                  type: 'Suspicious Activity',
                  coordinates: { lat: 37.7749, lng: -122.4194 },
                  confidence: 0.85,
                  timestamp: '2025-03-26T14:30:00Z',
                  location: 'Sector 1'
                },
                {
                  type: 'Unusual Movement',
                  coordinates: { lat: 37.7833, lng: -122.4167 },
                  confidence: 0.72,
                  timestamp: '2025-03-26T14:35:00Z',
                  location: 'Sector 2'
                }
              ]} 
              selectedFrames={[]} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        onVideoUpload={handleVideoUpload} 
        onGeospatialFilter={handleGeospatialFilter}
        onNavigate={handleSidebarNavigation}
        activeView={activeView}
      />
      <main className="flex-grow overflow-auto">
        {renderMainContent()}
      </main>
      <RightSidebar />
    </div>
  );
}

export default App;