import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Change to named export
export const MapView = ({ events, selectedFrames }) => {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[37.7749, -122.4194]} 
        zoom={13} 
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event, index) => (
          <Marker 
            key={index} 
            position={[event.coordinates.lat, event.coordinates.lng]}
          >
            <Popup>
              <div>
                <strong>{event.type}</strong>
                <p>Confidence: {(event.confidence * 100).toFixed(2)}%</p>
                <p>Timestamp: {event.timestamp}</p>
                <p>Location: {event.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// If you need a default export, you can add this:
export default MapView;