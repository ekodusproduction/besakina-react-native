import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Baseurl} from '../../constant/globalparams';
import {handleGetToken} from '../../constant/tokenUtils';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SvgXml} from 'react-native-svg';
import {location} from '../../svg/svg';
import style from '../../style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Custom_Wishist from '../../components/Custom_Wishist';

const Mywishlist = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const imageHeight = Dimensions.get('window').height / 2.5;
  const [data, setData] = useState(null);
  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCreatedAtLabel = createdAt => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths =
      Math.abs(currentDate.getMonth() - createdDate.getMonth()) +
      12 * (currentDate.getFullYear() - createdDate.getFullYear());
    const diffYears = Math.abs(
      currentDate.getFullYear() - createdDate.getFullYear(),
    );

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else if (diffMonths === 1) {
      return 'Last month';
    } else if (diffMonths > 1) {
      return `${diffMonths} months ago`;
    } else if (diffYears === 1) {
      return 'Last year';
    } else if (diffYears > 1) {
      return `${diffYears} years ago`;
    } else {
      return createdAt;
    }
  };

  const fetchMywishlistApi = () => {
    setLoading(true);
    handleGetToken().then(token => {
      if (token) {
        axios
          .get(`${Baseurl}/api/users/myads`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            console.log('response ---', response.data.data);
            setData(response.data.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
            setLoading(false);
          });
      } else {
        console.log('Token not retrieved !');
        setLoading(false);
        setShowTokenModal(true);
      }
    });
  };

  useEffect(() => {
    if (isfocused == true) {
      fetchMywishlistApi();
    }
  }, [isfocused]);



  useEffect(() => {
    if (data && data.length > 0) {
      setSwitchState(data[0].is_active === 1);
    }
  }, [data]);



  if (loading) {
    return (
      <SkeletonPlaceholder speed={500}>
        {[1, 2, 3, 4].map((item, index) => (
          <View
            style={{
              height: 200,
              width: '90%',
              top: 80,
              marginBottom: 15,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            key={index}
          />
        ))}
      </SkeletonPlaceholder>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="My Favourite" />
      </Appbar.Header>

      {data == null || data.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../../assets/404.json')}
            autoPlay
            loop
            style={{height: 200, width: 200}}
            onAnimationFinish={() => console.log('Animation Finished')}
            onError={error => console.log('Lottie Error:', error)}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log(item);
            let imageurl = `${item.images[0]}`;
            return (
              <View style={{padding: 10}}>
                <View
                  style={{
                    paddingVertical: 5,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      color: '#3184b6',
                      fontSize: 12,
                    }}>
                    {item.category.charAt(0).toUpperCase() +
                      item.category.substring(1)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderWidth: 0.5,
                    borderRadius: 12,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '50%',
                      borderWidth: 0.8,
                      borderRadius: 12,
                    }}
                    onPress={() =>
                      item.category == 'education'
                        ? navigation.navigate('EducationCategoryDetails', {
                            data: item,
                            edit: 'edit',
                          })
                        : item.category == 'property'
                        ? navigation.navigate('PropertyCategoryDetails', {
                            data: item,
                            edit: 'edit',
                          })
                        : item.category == 'vehicles'
                        ? navigation.navigate('VehicleCategoryDetails', {
                            data: item,
                            edit: 'edit',
                          })
                        : item.category == 'hospitality'
                        ? navigation.navigate('HospitalityCategoryDetails', {
                            data: item,
                            edit: 'edit',
                          })
                        : item.category == 'doctors'
                        ? navigation.navigate('DoctorCategoryDetails', {
                            data: item,
                            edit: 'edit',
                          })
                        : item.category == 'hospitals'
                        ? navigation.navigate(
                            'HospitalorClinicCategoryDetails',
                            {
                              data: item,
                              edit: 'edit',
                            },
                          )
                        : null
                    }>
                    <View
                      style={{
                        position: 'relative',
                        borderRadius: 12,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: imageurl}}
                        style={{
                          height: imageHeight / 2,
                          width: '100%',
                          resizeMode: 'cover',
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
                    </View>
                  </TouchableOpacity>

                  <View style={{width: '50%', marginTop: 10, marginLeft: 5}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginRight: 10,
                      }}>
                      <Custom_Wishist index={index} category={item.category} />
                    </View>
                    <Text
                      numberOfLines={2}
                      style={[
                        style.subsubtitle,
                        {width: 150, textAlign: 'left', overflow: 'hidden'},
                      ]}
                      variant="bodyMedium">
                      {item.title}
                    </Text>
                    <Text variant="titleLarge" style={{marginTop: 10}}>
                      ₹ {item.price}
                    </Text>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        width: '95%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 5,
                          marginBottom: 10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <SvgXml
                            xml={location}
                            width="15px"
                            height="15px"
                            style={{marginTop: 3, marginRight: 0}}
                          />
                          <Text
                            variant="titleLarge"
                            numberOfLines={1}
                            style={{width: 100}}>
                            {item.state}
                          </Text>
                        </View>
                        <Text>{getCreatedAtLabel(item.created_at)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Mywishlist;
