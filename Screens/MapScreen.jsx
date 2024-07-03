import React from 'react'
import { Text, View } from 'react-native'
import Map from '../Components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from './NavigateCard';
import RideOptionCard from './RideOptionCard';

const Stack = createStackNavigator();
function MapScreen() {
  return (
    <View>
      <View className='h-1/2'><Map /></View>
      <View className='h-1/2'>
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
         </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen