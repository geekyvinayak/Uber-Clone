import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowRightIcon, ChevronLeftIcon } from 'react-native-heroicons/micro'
import { useNavigation } from '@react-navigation/native'


const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber-X',
        image:'https://link.papareact.com/3pn',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Car',
        image:
            'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
        screen: 'FoodScreen',
    },
    {
        id: '4456',
        title: 'Auto',
        image:
            'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
        screen: 'FoodScreen',
    },
];

const RideOptionCard = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='bg-white flex-grow'>
            <View>
                <TouchableOpacity className='absolute top-5  rounded-full left-5 bg-gray-200 z-50' onPress={() => { navigation.navigate('NavigateCrad') }} >
                    <ChevronLeftIcon color={'black'} size={35} />
                </TouchableOpacity>
                <Text className='text-center py-5 text-xl'>Select a Ride</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity className={`rounded-xl p-2 pl-6 pb-8 pt-4  bg-gray-200 m-2 h-20`} >
                                <View className={`flex-row w-full justify-between items-center`}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <Text className="mt-2 text-lg font-semibold  ">
                                        {item.title}
                                    </Text>
                                    <View className='bg-black p-1 rounded-full w-8' >
                                        <ArrowRightIcon color={'white'} size="20" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default RideOptionCard