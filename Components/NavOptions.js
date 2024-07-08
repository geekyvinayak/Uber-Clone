import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/micro';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order Food',
    image:
      'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
    screen: 'FoodScreen',
  },
];

const NavOptions = () => {
  const navigator = useNavigation()
  const origin = useSelector(selectOrigin)
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity disabled={!origin} className={`rounded-xl p-2 pl-6 pb-8 pt-4  bg-gray-200 m-2 w-40`} onPress={()=>navigator.navigate(item.screen)}>
              <View className={`justify-center items-center gap-2 ${!origin?"opacity-50":""}`}>
                <Image
                  source={{uri: item.image}}
                  style={{height: 120, width: 120}}
                />
                <Text className="mt-2 text-lg font-semibold  ">
                  {item.title}
                </Text>
                <View className='bg-black p-1 rounded-full w-8' >
                <ArrowRightIcon color={'white'} size="20"/>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default NavOptions;
