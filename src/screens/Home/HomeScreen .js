import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, ScrollView, StatusBar, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { SvgXml } from 'react-native-svg';
import { ServicesSVG, health, property, vehicle, location, Education, Hospitality } from '../../svg/svg';
import { SliderBox } from "react-native-image-slider-box";
import FeaturedAds from '../FeaturedAds/FeaturedAds';
import AllAds from '../AllAds/AllAds';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleGetToken } from '../../constant/tokenUtils';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const image = [
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
    require('../../../assets/banner2.png'),
    require('../../../assets/banner2.png'),
    require('../../../assets/banner2.png'),
  ]
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const isfocused = useIsFocused();

  useEffect(() => {
    if (isfocused == true) {
      <View>
        <FeaturedAds />
        <AllAds />
      </View>
    }
  }, [isfocused]);

  return (
    <ScrollView
      style={{ flex: 1, marginBottom: 70 }}
      alwaysBounceVertical
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <StatusBar animated={true} backgroundColor="" translucent={false} />

      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ justifyContent: "center", alignItems: "center", height: 40 }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Image
              source={require('../../../assets/logo2.png')}
              style={{ resizeMode: "contain", height: 40, width: 150 }}
            />
            <TouchableOpacity >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                gap: 5,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}>
                <SvgXml
                  xml={location}
                  width="15px"
                  height="15px"
                />
                <Text style={{ fontSize: 14, fontWeight: "500" }}>Guwahati</Text>
                <AntDesign name="caretdown" size={12} />
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View style={{ marginTop: 15 }}>
          <View style={style.inputContainer}>
            <MaterialIcons name="search" size={24} color="gray" style={style.icon} />
            <TextInput
              placeholder="Search product, business or Services"
              placeholderTextColor="gray"
              style={style.input}
              onPressIn={() => navigation.navigate('SearchScreen')}
            />
            <MaterialIcons name="mic" size={24} color="gray" style={[style.icon, { marginRight: 10 }]} />
          </View>
        </View>


        <View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Text style={style.subtitle}>Categories</Text>
            <Text style={[style.subtitle, { color: "#3184b6" }]} onPress={() => navigation.navigate('ViewCategories')}>See all</Text>
          </View>
        </View>

 
        <View>
          <FlatList
            data={[
              {
                id: 1, filename: Education, name: "Education"
              },
              {
                id: 2, filename: health, name: "Health"
              },
              {
                id: 3, filename: property, name: "Property"
              },
              {
                id: 4, filename: vehicle, name: "Vehicle"
              },
              {
                id: 5, filename: Hospitality, name: "Hospitality"
              }
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                height: 85,
                width: 85,
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
                onPress={() => navigation.navigate('CategoryDetails', { item })}
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

 
        <View style={style.sliderContainer}>
          <SliderBox
            images={image}
            dotStyle={{ height: 10, width: 10, borderRadius: 5 }}
            dotColor="#3184b6"
            inactiveDotColor="white"
            imageLoadingColor="white"
            autoplay={true}
            circleLoop={true}
            resizeMode="cover"
            autoplayInterval={5000}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
              console.log(`image ${index} pressed`)
            }
            paginationBoxVerticalPadding={20}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
          />

        </View>

 
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={[
              { id: 1, img: require('../../../assets/banner1.png') },
              { id: 2, img: require('../../../assets/banner2.png') }
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={item.img}
                style={{ objectFit: "contain", height: 150 }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <FeaturedAds />

        <AllAds />

      </View>
    </ScrollView>
  )
}

export default HomeScreen;
