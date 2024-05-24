import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {Baseurl} from '../constant/globalparams';
import style from '../style';
import {SvgXml} from 'react-native-svg';
import {location} from '../svg/svg';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SearchScreen = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (search.length !== 0) {
      searchapi();
    }
  }, [search]);

  const searchapi = () => {
    setLoading(true);
    axios
      .get(`${Baseurl}/api/home/search`, {params: {search: search}})
      .then(response => {
        console.log('response ---', response.data.data.advertisements);
        setData(response.data.data?.advertisements);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  const getCreatedAtLabel = createdAt => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return createdAt;
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            style={{marginRight: 10, marginTop: 25}}
            size={30}
            color={'black'}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <View style={{marginTop: 15}}>
            <View style={style.inputContainer}>
              <MaterialIcons
                name="search"
                size={24}
                color="gray"
                style={style.icon}
              />
              <TextInput
                placeholder="Search ..."
                placeholderTextColor="gray"
                style={style.input}
                value={search}
                onChangeText={setSearch}
                autoFocus={true}
                focusable={true}
              />
              <MaterialIcons
                name="mic"
                size={24}
                color="gray"
                style={[style.icon, {marginRight: 10}]}
              />
            </View>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="gray" style={{marginTop: 50}} />
      ) : data?.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 200,
          }}>
          <LottieView
            source={require('../../assets/404.json')}
            autoPlay
            loop
            style={{height: 300, width: 300}}
            onAnimationFinish={() => console.log('Animation Finished')}
            onError={error => console.log('Lottie Error:', error)}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          horizontal={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={{flex: 1, margin: 5}}>
                <TouchableOpacity
                  style={{borderRadius: 12, borderWidth: 0.8}}
                  onPress={() =>
                    item.category == 'education'
                      ? navigation.navigate('EducationCategoryDetails', {
                          data: item,
                        })
                      : item.category == 'property'
                      ? navigation.navigate('PropertyCategoryDetails', {
                          data: item,
                        })
                      : item.category == 'vehicles'
                      ? navigation.navigate('VehicleCategoryDetails', {
                          data: item,
                        })
                      : item.category == 'hospitality'
                      ? navigation.navigate('HospitalityCategoryDetails', {
                          data: item,
                        })
                      : item.category == 'doctors'
                      ? navigation.navigate('DoctorCategoryDetails', {
                          data: item,
                        })
                      : item.category == 'hospitals'
                      ? navigation.navigate('HospitalorClinicCategoryDetails', {
                          data: item,
                        })
                      : null
                  }>
                  <Image
                    source={{uri: `${item.images[0]}`}}
                    style={{
                      height: 120,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      right: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 2,
                        paddingVertical: 2,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <AntDesign
                        name="checkcircle"
                        style={{color: '#3184b6', marginRight: 5}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          color: '#3184b6',
                          fontSize: 12,
                        }}>
                        Verified
                      </Text>
                    </View>
                  </View>
                  <View style={{marginTop: 10, marginLeft: 10}}>
                    <Text style={style.subsubtitle}>$ {item.price}</Text>
                    <Text numberOfLines={1} style={{width: 150}}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <SvgXml
                        xml={location}
                        width="15px"
                        height="15px"
                        style={{marginTop: 3, marginRight: 5}}
                      />
                      <Text>{item.city}</Text>
                    </View>
                    <Text variant="titleLarge">
                      {getCreatedAtLabel(item.created_at)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default SearchScreen;
