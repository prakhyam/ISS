import React, { useState, useRef } from 'react';
import { Search, Image as ImageIcon, X } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview of the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSearch = () => {
    if (selectedImage) {
      // Implement your image search logic here
      console.log('Searching with image:', selectedImage.file);
      // You would typically send this to a backend service for frame matching
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            className="w-full pl-10 pr-3 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>
        
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        
        <button 
          onClick={triggerFileInput}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <ImageIcon className="mr-2" size={20} />
          Search by image
        </button>
      </div>

      {/* Image Preview and Search Section */}
      {selectedImage && (
        <div className="mt-4 bg-gray-50 border rounded p-4 flex items-center">
          <div className="mr-4">
            <img 
              src={selectedImage.preview} 
              alt="Upload preview" 
              className="w-20 h-20 object-cover rounded"
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm">{selectedImage.file.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedImage.file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleImageSearch}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
            >
              Search Frames
            </button>
            <button 
              onClick={handleRemoveImage}
              className="text-red-500 hover:bg-red-50 p-2 rounded"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;