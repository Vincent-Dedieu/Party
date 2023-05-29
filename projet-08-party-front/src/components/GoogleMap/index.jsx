import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode'; 

import './styles.scss';

const GoogleApiMap = ({ events }) => {

  const mapOptions = {
    disableDefaultUI: true,
    zoom: 10,
  };
  
  const [eventsPosition, setEventsPosition] = useState([])
  const [currentPosition, setCurrentPosition] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_API_KEY,
  });

  Geocode.setApiKey(import.meta.env.VITE_APP_GEOCODING_API_KEY);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    events.forEach((event) => {
      Geocode.fromAddress(`${event.address} ${event.city}`)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location
        const addressComponents = response.results[0].address_components;
        const firstComponentTypes = addressComponents[0].types;
        if(firstComponentTypes.includes("street_number", "route")) {
          setEventsPosition((state) => ({
            ...state,
          [event.id]: { lat, lng }
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }, [events]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      
      center={currentPosition}
      mapContainerClassName="map-container"
      options={mapOptions}
    >
    <Marker position={currentPosition} />
    {events.map((event) => {
      return <Marker key={event.id} position={eventsPosition[event.id]} title={event.title} />
    })}

    </GoogleMap>
  );
};

export default GoogleApiMap;
