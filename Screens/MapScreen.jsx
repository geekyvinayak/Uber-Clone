import React from 'react'
import { Text, View } from 'react-native'
import Map from '../Components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from './NavigateCard';
import RideOptionCard from './RideOptionCard';
import { useSelector } from 'react-redux';
import { selectRideStatus } from '../slices/navSlice';
import OngoingRide from '../Components/OngoingRide';

const Stack = createStackNavigator();
function MapScreen() {
  const ridestatus = useSelector(selectRideStatus)
  return (
    <View>
      <View className={`${ridestatus?"h-3/4":"h-1/2"}`}><Map /></View>
      <View className={`${ridestatus?"h-1/4":"h-1/2"}`}>
        <Stack.Navigator>
        <Stack.Screen 
         name='NavigateCrad'
         component={NavigateCard}
         options={{
          headerShown:false
         }} />
         <Stack.Screen 
         name='RideOptionCard'
         component={RideOptionCard}
         options={{
          headerShown:false
         }} />
         <Stack.Screen 
         name='OnGoindRide'
         component={OngoingRide}
         options={{
          headerShown:false
         }} />
         </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen