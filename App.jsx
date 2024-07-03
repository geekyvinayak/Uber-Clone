import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import HomeScreen from './Screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './Screens/MapScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App