import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import SearchBar from './components/SearchBar';
import VideoGrid from './components/VideoGrid';
import AdvancedSearch from './components/AdvancedSearch';

function App() {
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = (uploadedFiles) => {
    const newVideos = uploadedFiles.map(file => ({
      title: file.name,
      duration: 'Processing...',
      thumbnail: URL.createObjectURL(file),
      file: file
    }));
    
    setVideos(prevVideos => [...prevVideos, ...newVideos]);
  };

  return (
    <div className="flex">
      <Sidebar onVideoUpload={handleVideoUpload} />
      <main className="flex-grow p-6">
        <SearchBar />
        <AdvancedSearch />
        <VideoGrid videos={videos} />
      </main>
      <RightSidebar />
    </div>
  );
}

export default App;