import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import HomeScreen from './Screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './Screens/MapScreen'
import RideCompleted from './Screens/RideCompleted'

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider >
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.Od === 'ios' ? -64 : 0} behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RideCompleted" component={RideCompleted} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App