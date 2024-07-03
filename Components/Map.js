import {View, Text} from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {selectDestination, selectOrigin} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null)

  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }, 1500);
  }, [origin, destination, mapRef]);

  return (
    <MapView
     ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={{
        flex: 1,
      }}
      region={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
        {origin && destination && (
          <MapViewDirections origin={origin.description} destination={destination.description} apikey={process.env.MAP_API} strokeColor='black' strokeWidth={3}
          />
        )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier='origin'
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default Map;
