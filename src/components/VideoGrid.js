import React, { useState, useEffect } from 'react';

const VideoGrid = ({ videos = [] }) => {
  const [processedVideos, setProcessedVideos] = useState([]);

  useEffect(() => {
    // Process videos to extract duration and generate thumbnails
    const processVideos = async () => {
      const processedVideoPromises = videos.map(video => {
        return new Promise((resolve, reject) => {
          // Create a video element to get duration and thumbnail
          const videoElement = document.createElement('video');
          videoElement.preload = 'metadata';
          videoElement.src = URL.createObjectURL(video.file);
          
          videoElement.onloadedmetadata = () => {
            // Create canvas to generate thumbnail
            const canvas = document.createElement('canvas');
            canvas.width = 300;  // Fixed width to match screenshot
            canvas.height = 200; // Fixed height to match screenshot
            
            // Seek to middle of the video to capture a representative frame
            videoElement.currentTime = videoElement.duration / 2;
            
            videoElement.onseeked = () => {
              // Draw video frame on canvas
              const context = canvas.getContext('2d');
              
              // Calculate scaling to maintain aspect ratio
              const scale = Math.max(
                canvas.width / videoElement.videoWidth,
                canvas.height / videoElement.videoHeight
              );
              
              const scaledWidth = videoElement.videoWidth * scale;
              const scaledHeight = videoElement.videoHeight * scale;
              
              // Center the image
              const offsetX = (canvas.width - scaledWidth) / 2;
              const offsetY = (canvas.height - scaledHeight) / 2;
              
              // Clear canvas and draw the video frame
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(
                videoElement, 
                offsetX, 
                offsetY, 
                scaledWidth, 
                scaledHeight
              );
              
              // Convert canvas to thumbnail
              const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
              
              // Convert seconds to MM:SS format
              const minutes = Math.floor(videoElement.duration / 60);
              const seconds = Math.floor(videoElement.duration % 60);
              
              resolve({
                ...video,
                duration: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                thumbnail: thumbnailDataUrl
              });
              
              // Revoke object URLs to free memory
              URL.revokeObjectURL(videoElement.src);
            };
            
            // Handle errors in video processing
            videoElement.onerror = () => {
              reject(new Error('Error processing video'));
            };
          };
        });
      });

      try {
        // Wait for all videos to be processed
        const processedVideoResults = await Promise.all(processedVideoPromises);
        setProcessedVideos(processedVideoResults);
      } catch (error) {
        console.error('Error processing videos:', error);
      }
    };

    // Only process if there are new videos
    if (videos.length > 0) {
      processVideos();
    }
  }, [videos]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">
          Videos • {processedVideos.length} videos
        </div>
        <div className="text-gray-600">
          Index created on Jan 13, 2025
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {processedVideos.map((video, index) => (
          <div key={index} className="border rounded overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title || video.file.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-3">
              <div className="font-semibold text-sm truncate">
                {video.file.name}
              </div>
              <div className="text-xs text-gray-500">
                {video.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;