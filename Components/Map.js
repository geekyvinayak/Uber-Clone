import { View, Text, Animated, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectPolylineCoordinates, selectRideStatus, setPolyLine, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { decode, encode } from "@googlemaps/polyline-codec";
import CAR from '../assets/car_1.png';
import { useNavigation } from '@react-navigation/native';
async function getDirections(originData, destinationData) {
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const apiKey = process.env.MAP_API;

  const body = {
    origin: {
      location: {
        latLng: {
          latitude: originData.lat,
          longitude: originData.lng
        }
      }
    },
    destination: {
      location: {
        latLng: {
          latitude: destinationData.lat,
          longitude: destinationData.lng
        }
      }
    },
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false
    },
    languageCode: "en-US",
    units: "METRIC"
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

export const getRotationAngle = (previousPosition, currentPosition) => {
  const x1 = previousPosition.latitude;
  const y1 = previousPosition.longitude;
  const x2 = currentPosition.latitude;
  const y2 = currentPosition.longitude;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
};


const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const polycord = useSelector(selectPolylineCoordinates)
  const ridestatus = useSelector(selectRideStatus)
  const mapRef = useRef(null)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination || !mapRef.current) return;

    setTimeout(async () => {
      const data = await getDirections(origin.location, destination.location);
      const coordinates = [];
      decode(data.routes[0].polyline.encodedPolyline, 5).forEach(point => {
        coordinates.push({ latitude: point[0], longitude: point[1] });
      });
      dispatch(setPolyLine(coordinates))
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


  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=metric&key=${process.env.MAP_API}`)
        .then((res) => res.json())
        .then(data => { dispatch(setTravelTimeInformation(data.rows[0].elements[0])) })
    }
    setTimeout(() => { getTravelTime() }, 1500);
  }, [origin, destination, process.env.MAP_API])

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
      {origin && destination && polycord.length > 0 && (
        <Polyline coordinates={polycord}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
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
      {origin && destination && ridestatus && <AnimateBlock
        polyline={polycord}
        startPolylineIndex={0}
        endPolylineIndex={polycord.length - 1}
        mapRef={mapRef}
      />}
    </MapView>
  );
};


function AnimateBlock({
  polyline,
  startPolylineIndex,
  endPolylineIndex,
  mapRef,
}) {
  const navigator = useNavigation()
  const markerRef = useRef(null);
  const [animatedRegion, setNewAnimatedRegion] = useState(
    new AnimatedRegion(polyline[startPolylineIndex])
  );
  const animationRegionRef = useRef(null);
  const [polylineIndex, setPolylineIndex] = useState(startPolylineIndex);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    animationRegionRef.current = new AnimatedRegion(
      polyline[startPolylineIndex]
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newPolylineIndex = polylineIndex + 1;
      const newCoords = polyline[newPolylineIndex];
      const isLastPoint = newPolylineIndex === endPolylineIndex;
      if (endPolylineIndex - newPolylineIndex <= 3) {
        setTimeout(() => {
          navigator.navigate('RideCompleted')
        }, 3000);
      }
      animationRegionRef.current
        .timing(new AnimatedRegion(newCoords))
        .start(() => {
          if (polylineIndex < endPolylineIndex) {
            const angle = getRotationAngle(
              polyline[polylineIndex],
              polyline[newPolylineIndex]
            );
            setAngle(angle);
            setNewAnimatedRegion(new AnimatedRegion(newCoords));
            if (mapRef) {
              mapRef.current?.animateCamera({
                center: polyline[newPolylineIndex],
                zoom: 17,
              });
            }
            setPolylineIndex(
              isLastPoint ? newPolylineIndex : newPolylineIndex + 1
            );
          }
        });
    });
    return () => {
      clearTimeout(timeout);
    };
  }, [polylineIndex, startPolylineIndex, endPolylineIndex, animatedRegion]);

  return (
    <Marker.Animated
      ref={markerRef}
      coordinate={animatedRegion}
      style={{
        transform: [{ rotate: `${angle}deg` }],
      }}
      anchor={{ x: 0.5, y: 0.5 }}
      rotation={angle}>
      <Animated.View
        style={{
          width: 60,
          height: 60,
        }}>
        <Image
          source={CAR}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Animated.View>
    </Marker.Animated>
  );
}

export default Map;
