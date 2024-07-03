import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
  return (
    <SafeAreaView className='bg-white flex-1'>
      <Text className='text-center py-5 text-xl font-semibold'>Good Morning, User</Text>
    <View className='border-t border-gray-200 flex-shrink'>
    <GooglePlacesAutocomplete
        placeholder='Where To?'
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0,
            backgroundColor:'white',
            paddingTop:20
          },
          textInput: {
            backgroundColor: '#DDDDDF',
            borderRadius:10,
            fontSize: 18
          },
          textInputContainer:{
            paddingHorizontal:20,
            paddingBottom:0
          }
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          dispatch(setDestination({
            location: details.geometry.location,
            description: data.description
          }))
          navigation.navigate('RideOptionCard')
        //   dispatch(setDestination(null));
        }}
        debounce={400}
        returnKey={'search'}
        nearbyPlacesAPI='GooglePlacesSearch'
        query={{
          key: process.env.MAP_API,
          language: 'en',
        }}
      />
    </View>
    </SafeAreaView>
  )
}

export default NavigateCard