import { View, Text, Image, TextInput, FlatList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { Searchbar } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { ServicesSVG, electronics, health, property, vehicle } from '../../svg/svg';
import { ImageSlider } from "react-native-image-slider-banner";
import FeaturedAds from '../FeaturedAds/FeaturedAds';
import AllAds from '../AllAds/AllAds';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';


const array = [
  {
    id: 1, filename: ServicesSVG, name: "Services"
  },
  {
    id: 2, filename: electronics, name: "Electronics"
  },
  {
    id: 3, filename: health, name: "Health"
  },
  {
    id: 4, filename: property, name: "Property"
  },
  {
    id: 5, filename: vehicle, name: "Vehicle"
  }
];
const CategoryList = () => {
  const navigation = useNavigation();

  return (
    <View>

      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Select Categories" />
      </Appbar.Header>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={array}
          vertical
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 120,
                width: 120,
                borderRadius: 15,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
                marginTop: 10,
                marginBottom: 10,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <SvgXml
                xml={item.filename}
                width="50px"
                height="50px"
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>


    </View>
  )
}

export default CategoryList