import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowRightIcon, ChevronLeftIcon } from 'react-native-heroicons/micro'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelTimeInformation, setRideStatus } from '../slices/navSlice'


const data = [
    {
        id: 'Uber-Moto-456',
        title: 'Uber-Moto',
        image:
            'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_654,h_436/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
        multiplier: 1,
    },
    {
        id: 'Uber-LUX-456',
        title: 'Uber Auto',
        image:
            'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_588,h_330/v1597151228/assets/fc/101ff8-81a1-46c3-995a-67b4bbd2f2bf/original/TukTuk.jpg',
        multiplier: 1.5,
    },
    {
        id: 'Uber-X-123',
        title: 'Uber-X',
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
        multiplier: 2.5,
    },
    {
        id: 'Uber-LUX-4563',
        title: 'Uber Lux',
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png',
        multiplier: 3.5,
    },
];

const RideOptionCard = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const distanceData = useSelector(selectTravelTimeInformation)
    const dispatch = useDispatch()
    const getPrice = (distance,multiplier) =>{
        return (distance/1000)*7*multiplier
    }
    return (
        <SafeAreaView className='bg-white flex-grow'>
            <View className='absolute top-5 left-5 z-50'>
                <TouchableOpacity className='rounded-full bg-gray-200 p-2' onPress={() => { navigation.navigate('NavigateCrad') }} >
                    <ChevronLeftIcon color={'black'} size={20} />
                </TouchableOpacity>
            </View>
            <View className='pl-8'>
                <Text className='text-center py-5 text-xl'>Select a Ride { -  distanceData?.distance.text}</Text>
            </View>
            <View className='flex-1'>
                <FlatList
                    data={data}
                    contentContainerStyle={{ paddingTop: 5, paddingBottom:2 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity className={`rounded-xl p-2 pl-6 pb-8 m-2 h-20 ${item.id === selected?.id ? "border-2" : ""}`} onPress={() => setSelected(item)}>
                            <View className='flex-row w-full justify-between items-center pr-5 pb-2'>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ height: 60, width: 60 }}
                                 />
                                <View>
                                    <Text className='text-xl font-semibold'>
                                        {item.title}
                                    </Text>
                                    <Text className='text-xs font-semibold'>
                                    Travel Time {distanceData?.duration.text}
                                    </Text>
                                </View>
                                <Text className='text-xl'>₹{getPrice(distanceData?.distance.value,item.multiplier).toFixed(2)}</Text>
                                {/* <View className='bg-black p-1 rounded-full w-8'>
                                    <ArrowRightIcon color={'white'} size="20" />
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {selected && <View>
                <TouchableOpacity className='bg-black py-3' onPress={()=>{dispatch(setRideStatus(true));navigation.navigate('OnGoindRide')}}>
                    <Text className='text-center text-white text-xl'>Choose {selected.title}</Text>
                    </TouchableOpacity>
            </View>}
        </SafeAreaView>
    )
}

export default RideOptionCard