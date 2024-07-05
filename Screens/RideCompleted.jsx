import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setResetState } from '../slices/navSlice'

const RideCompleted = () => {
    const navigator = useNavigation()
    const dispatch = useDispatch()
    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-xl font-bold '>RideCompleted Screen will come here </Text>
            <TouchableOpacity className='bg-gray-400 rounded-xl p-4 mt-5' onPress={() => { dispatch(setResetState()); navigator.navigate('Home') }}><Text>Home</Text></TouchableOpacity>
        </View>
    )
}

export default RideCompleted