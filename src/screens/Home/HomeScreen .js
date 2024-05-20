import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import {SvgXml} from 'react-native-svg';
import {
  health,
  property,
  vehicle,
  location,
  Education,
  Hospitality,
  briefcase,
} from '../../svg/svg';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {Baseurl} from '../../constant/globalparams';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FeaturedAds from '../FeaturedAds/FeaturedAds';
import AllAds from '../AllAds/AllAds';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Custom_Wishist from '../../components/Custom_Wishist';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const tabBarHeight = useBottomTabBarHeight();
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleWishlist = id => {
    const updatedWishlist = [...wishlist];
    const index = updatedWishlist.indexOf(id);
    if (index === -1) {
      updatedWishlist.push(id);
    } else {
      updatedWishlist.splice(index, 1);
    }
    setWishlist(updatedWishlist);
  };

  const isWishlisted = id => {
    return wishlist.includes(id);
  };

  const fetchproductApi = () => {
    axios
      .get(`${Baseurl}/api/home/latest`)
      .then(response => {
        console.log('response of latest ads--->', response);
        setData(response.data.data.advertisements);
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

  const image = [
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchproductApi();
    }, 2000);
  };

  useEffect(() => {
    if (isfocused == true) {
      fetchproductApi();
    }
  }, [isfocused]);

  if (loading) {
    return (
      <ScrollView
        style={{flex: 1}}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}>
        <StatusBar animated={true} backgroundColor="" translucent={false} />

        <SkeletonPlaceholder speed={500}>
          <View style={{padding: 10}}>
            {/* Skeleton for header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{width: 150, height: 40, borderRadius: 10}} />
              <View style={{width: 100, height: 40, borderRadius: 10}} />
            </View>

            {/* Skeleton for search */}
            <View style={{marginBottom: 20}}>
              <View style={{width: '100%', height: 40, borderRadius: 10}} />
            </View>

            {/* Skeleton for categories */}
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View style={{width: 85, height: 85, borderRadius: 15}} />
            </View>

            {/* Skeleton for slider */}
            <View style={{height: 150, marginBottom: 20, borderRadius: 15}} />

            {/* Skeleton for sub_slider */}
            <View style={{height: 100, marginBottom: 20, borderRadius: 15}} />

            {/* Skeleton for featured ads */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <View style={{width: '45%', height: 150, borderRadius: 15}} />
              <View style={{width: '45%', height: 150, borderRadius: 15}} />
            </View>

            {/* Skeleton for all ads */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <View style={{width: '45%', height: 200, borderRadius: 15}} />
              <View style={{width: '45%', height: 200, borderRadius: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{flex: 1}}
      alwaysBounceVertical
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <StatusBar animated={true} backgroundColor="" translucent={false} />

      <View style={{flex: 1, padding: 10}}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: 40}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              source={require('../../../assets/logo2.png')}
              style={{resizeMode: 'contain', height: 40, width: 150}}
            />
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  gap: 5,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}>
                <SvgXml xml={location} width="15px" height="15px" />
                <Text style={{fontSize: 14, fontWeight: '500'}}>Guwahati</Text>
                <AntDesign name="caretdown" size={12} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <View style={style.inputContainer}>
            <MaterialIcons
              name="search"
              size={24}
              color="gray"
              style={style.icon}
            />
            <TextInput
              placeholder="Search product, business or Services"
              placeholderTextColor="gray"
              style={style.input}
              onPressIn={() => navigation.navigate('SearchScreen')}
            />
            <MaterialIcons
              name="mic"
              size={24}
              color="gray"
              style={[style.icon, {marginRight: 10}]}
            />
          </View>
        </View>

        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text style={style.subtitle}>Categories</Text>
            <Text
              style={[style.subtitle, {color: '#3184b6'}]}
              onPress={() => navigation.navigate('ViewCategories')}>
              See all
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={[
              {
                id: 1,
                filename: Education,
                name: 'Education',
              },
              {
                id: 2,
                filename: health,
                name: 'Health Care',
              },
              {
                id: 3,
                filename: property,
                name: 'Properties',
              },
              {
                id: 4,
                filename: vehicle,
                name: 'Vehicles',
              },
              {
                id: 5,
                filename: Hospitality,
                name: 'Hospitality',
              },
              // {
              //   id: 6,
              //   filename: briefcase,
              //   name: 'Business Listing',
              // },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  height: 85,
                  width: 85,
                  borderRadius: 8,
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
                onPress={() => navigation.navigate('CategoryDetails', {item})}>
                <SvgXml xml={item.filename} width="50px" height="50px" />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={style.sliderContainer}>
          <SliderBox
            images={image}
            dotStyle={{height: 10, width: 10, borderRadius: 5}}
            dotColor="#3184b6"
            inactiveDotColor="white"
            // imageLoadingColor="white"
            autoplay={true}
            circleLoop={true}
            resizeMode="contain"
            autoplayInterval={5000}
            onCurrentImagePressed={index =>
              index == 0
                ? navigation.navigate('AuthNavigator')
                : index == 1
                ? navigation.navigate('AddPost')
                : index == 2
                ? navigation.navigate('AuthNavigator')
                : index == 3
                ? navigation.navigate('AddPost')
                : null
            }
            paginationBoxVerticalPadding={20}
            paginationBoxStyle={{
              position: 'absolute',
              bottom: 0,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
          />
        </View>

        <View style={{marginTop: 10}}>
          <FlatList
            data={[
              {id: 1, img: require('../../../assets/banner1.png')},
              {id: 2, img: require('../../../assets/banner2.png')},
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  index == 0
                    ? navigation.navigate('AuthNavigator')
                    : navigation.navigate('AddPost')
                }>
                <Image
                  source={item.img}
                  style={{objectFit: 'contain', height: 150}}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View>
          <View style={{marginTop: 10}}>
            <View style={{marginTop: 15}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 0,
                  marginHorizontal: 10,
                }}>
                <Text style={style.subtitle}>Featured Ads</Text>
                <Text style={[style.subtitle, {color: '#3184b6'}]}>
                  See all
                </Text>
              </View>

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#3184b6"
                  style={{marginTop: 20}}
                />
              ) : (
                <FlatList
                  data={data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    console.log('item---', item);
                    return (
                      <View style={{width: 300, padding: 10}}>
                        <TouchableOpacity
                          onPress={() =>
                            item.category == 'education'
                              ? navigation.navigate(
                                  'EducationCategoryDetails',
                                  {
                                    data: item,
                                  },
                                )
                              : item.category == 'property'
                              ? navigation.navigate('PropertyCategoryDetails', {
                                  data: item,
                                })
                              : item.category == 'vehicles'
                              ? navigation.navigate('VehicleCategoryDetails', {
                                  data: item,
                                })
                              : item.category == 'hospitality'
                              ? navigation.navigate(
                                  'HospitalityCategoryDetails',
                                  {
                                    data: item,
                                  },
                                )
                              : null
                          }
                          style={{
                            borderWidth: 0.5,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                          }}>
                          <Image
                            source={{uri: item.images[0]}}
                            style={{
                              height: 130,
                              objectFit: 'cover',
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
                            <Custom_Wishist
                              index={index}
                              category={item.category}
                            />
                          </View>

                          <View style={{marginTop: 10, marginLeft: 10}}>
                            <Text
                              variant="titleLarge"
                              style={style.subsubtitle}>
                              ₹{' '}
                              {item.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{width: 250}}
                              variant="bodyMedium">
                              {item.title}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 20,
                              marginBottom: 10,
                              marginHorizontal: 10,
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <SvgXml
                                xml={location}
                                width="15px"
                                height="15px"
                                style={{marginTop: 3, marginRight: 0}}
                              />
                              <Text variant="titleLarge">{item.city}</Text>
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
          </View>
        </View>
        <View style={{marginBottom: tabBarHeight}}>
          <View style={{marginTop: 10}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 0,
                marginHorizontal: 10,
              }}>
              <Text style={style.subtitle}>All Ads</Text>
              <Text style={[style.subtitle, {color: '#3184b6'}]}>See all</Text>
            </View>

            <FlatList
              data={data}
              horizontal={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <View style={{flex: 1, margin: 5, width: '50%'}}>
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
                          ? navigation.navigate(
                              'HospitalorClinicCategoryDetails',
                              {
                                data: item,
                              },
                            )
                          : null
                      }>
                      <Image
                        source={{uri: item.images[0]}}
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
                        <Custom_Wishist
                          index={index}
                          category={item.category}
                        />
                      </View>

                      <View style={{marginTop: 10, marginLeft: 10}}>
                        <Text style={style.subsubtitle}>
                          ${' '}
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
