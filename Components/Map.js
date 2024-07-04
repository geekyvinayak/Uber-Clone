import {View, Text} from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {selectDestination, selectOrigin, setTravelTimeInformation} from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null)
  const dispatch = useDispatch();

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


  useEffect(()=>{
    if (!origin || !destination) return;
    const getTravelTime = async() =>{
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=metric&key=${process.env.MAP_API}`)
      .then((res)=>res.json())
      .then(data=>{dispatch(setTravelTimeInformation(data.rows[0].elements[0]))})
    }
    setTimeout(() => {  getTravelTime() }, 1500);
  },[origin,destination,process.env.MAP_API])

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
          <Polyline origin={origin.description} destination={destination.description} apikey={process.env.MAP_API} strokeColor='black' strokeWidth={3}
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
