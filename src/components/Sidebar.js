import React, { useRef } from 'react';
import { 
  Home, Folder, Play, Search, 
  Settings, HelpCircle 
} from 'lucide-react';

const Sidebar = ({ onVideoUpload }) => {
  const fileInputRef = useRef(null);

  const handleNewClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Convert FileList to Array and pass to parent component
      onVideoUpload(Array.from(files));
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div className="flex items-center mb-8">
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
        + New
      </button>
      
      <nav className="space-y-2 flex-grow">
        <SidebarItem icon={Home} label="Overview" />
        <SidebarItem icon={Folder} label="Indexes" />
        <SidebarItem icon={Play} label="Examples" />
      </nav>
      
      <nav className="border-t border-gray-700 pt-4 space-y-2">
        <SidebarItem icon={Search} label="Search" />
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={HelpCircle} label="Help" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label }) => (
  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
    <Icon className="mr-3" size={20} />
    <span>{label}</span>
  </div>
);

export default Sidebar;