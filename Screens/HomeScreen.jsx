import { Image, View } from 'react-native'
import React from 'react'
import NavOptions from '../Components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFav from '../Components/NavFav';
import { decode, encode } from "@googlemaps/polyline-codec";

const HomeScreen = () => {
  const encoded = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";
  console.log(decode(encoded, 5));
  
  const dispatch = useDispatch()
  return (
    <View className='p-5'>
      <Image style={{ width: 100, height: 100, resizeMode: 'contain' }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png", }} />
      <GooglePlacesAutocomplete
        placeholder='Search'
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0
          },
          textInput: {
            fontSize: 18
          }
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
        //  console.log("data",data,details)
          dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description
          }))
          dispatch(setDestination(null));
        }}
        debounce={400}
        returnKey={'search'}
        nearbyPlacesAPI='GooglePlacesSearch'
        query={{
          key: process.env.MAP_API,
          language: 'en',
        }}
      />
      <NavOptions />
      <NavFav />
    </View>
  )
}
export default HomeScreen