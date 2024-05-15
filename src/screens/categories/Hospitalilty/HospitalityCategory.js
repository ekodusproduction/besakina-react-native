import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../../style';
import {SliderBox} from 'react-native-image-slider-box';
import {SvgXml} from 'react-native-svg';
import {location} from '../../../svg/svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import {Baseurl} from '../../../constant/globalparams';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Custom_Wishist from '../../../components/Custom_Wishist';

const HospitalityCategory = ({item}) => {
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filtereddata, setFiltereddata] = useState(null);
  const [minbudget, setMinbudget] = useState('');
  const [maxbudget, setMaxbudget] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused && isSheetOpen) {
      refRBSheet.current.open();
    }
  }, [isFocused, isSheetOpen]);

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
  const image = [
    require('../../../../assets/banner1.png'),
    require('../../../../assets/banner2.png'),
    require('../../../../assets/banner2.png'),
    require('../../../../assets/banner2.png'),
    require('../../../../assets/banner2.png'),
    require('../../../../assets/banner2.png'),
  ];
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const fetchproductApi = () => {
    setLoading(true);
    axios
      .get(`${Baseurl}/api/hospitality/list`)
      .then(response => {
        console.log('response ---', response);
        setData(response.data.data.hospitality);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchproductApi();
  }, []);

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

  const onRefresh = () => {
    setRefreshing(true);
    fetchproductApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handlebudget = () => {
    axios
      .get(
        `${Baseurl}/api/hospitality/filter?minPrice=${minbudget}&maxPrice=${maxbudget}`,
      )
      .then(response => {
        console.log('response --->>', response.data.data.hospitality);
        if (response.data.data.hospitality?.length == 0) {
          setFiltereddata(null);
          setData(null);
        } else {
          setFiltereddata(response.data.data.hospitality);
        }
        refRBSheet.current.close();
      })
      .catch(error => {
        console.error('Error: ', error?.response);
        setFiltereddata(null);
        setData(null);
        refRBSheet.current.close();
      });
  };

  if (loading) {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Hospitality" />
          <TouchableOpacity
            onPress={() => {}}
            style={{bottom: 10, marginRight: 5}}>
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
              <Text style={style.subsubtitle}>Guwahati</Text>
              <AntDesign name="caretdown" size={12} />
            </View>
          </TouchableOpacity>
        </Appbar.Header>

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{padding: 1}}>
            <SkeletonPlaceholder speed={500}>
              <View
                style={{
                  height: 200,
                  width: '90%',
                  top: 10,
                  marginBottom: 15,
                  alignSelf: 'center',
                  borderRadius: 20,
                  bottom: 20,
                }}
              />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder speed={500}>
              {[1, 2, 3, 4].map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                </View>
              ))}
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Hospitality" />
          <TouchableOpacity
            onPress={() => {}}
            style={{bottom: 10, marginRight: 5}}>
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
              <Text style={style.subsubtitle}>Guwahati</Text>
              <AntDesign name="caretdown" size={12} />
            </View>
          </TouchableOpacity>
        </Appbar.Header>

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{padding: 1}}>
            <View style={style.sliderContainer}>
              <SkeletonPlaceholder speed={500}>
                <View
                  style={{
                    height: 200,
                    width: '90%',
                    top: 80,
                    marginBottom: 15,
                    alignSelf: 'center',
                    borderRadius: 20,
                  }}
                />
              </SkeletonPlaceholder>
            </View>

            <SkeletonPlaceholder speed={500}>
              {[1, 2, 3, 4].map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                </View>
              ))}
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Hospitality" />
        <TouchableOpacity
          onPress={() => {}}
          style={{bottom: 10, marginRight: 5}}>
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
            <Text style={style.subsubtitle}>Guwahati</Text>
            <AntDesign name="caretdown" size={12} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{padding: 1}}>
          <View style={style.sliderContainer}>
            <SliderBox
              images={image}
              dotStyle={{height: 10, width: 10, borderRadius: 5}}
              dotColor="#3184b6"
              inactiveDotColor="white"
              imageLoadingColor="white"
              autoplay={true}
              circleLoop={true}
              resizeMode="cover"
              autoplayInterval={5000}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                index == 0
                  ? navigation.navigate('AuthNavigator')
                  : index == 1
                  ? navigation.navigate('AddPost')
                  : index == 2
                  ? navigation.navigate('AddPost')
                  : index == 3
                  ? navigation.navigate('AddPost')
                  : index == 4
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

          <View style={{marginTop: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={fetchproductApi}
                  style={{
                    backgroundColor: '#ddd',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 90,
                  }}>
                  <Text
                    style={{
                      color: '#3184b6',
                      fontWeight: 'bold',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    Featured Ads
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    left: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 90,
                  }}>
                  <AntDesign
                    name="checkcircle"
                    style={{color: '#3184b6', marginRight: 5}}
                  />
                  <Text
                    style={{
                      color: '#3184b6',
                      fontWeight: 'bold',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    Verified
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                  right: 5,
                  backgroundColor: '#ddd',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 90,
                }}>
                <AntDesign
                  name="filter"
                  style={{color: '#3184b6', marginRight: 5}}
                />
                <Text
                  style={{
                    color: '#3184b6',
                    fontWeight: 'bold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>

            {filtereddata == null && data == null ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: screenHeight * 0.2,
                }}>
                <LottieView
                  source={require('../../../../assets/404.json')}
                  autoPlay
                  loop
                  style={{height: 200, width: 200}}
                  onAnimationFinish={() => console.log('Animation Finished')}
                  onError={error => console.log('Lottie Error:', error)}
                />
              </View>
            ) : (
              <FlatList
                data={filtereddata ? filtereddata : data}
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  let imageurl = `${Baseurl}/api/${item.images[0]}`;
                  console.log('item ---', item);

                  return (
                    <TouchableOpacity
                      style={{
                        width: screenWidth / 2,
                        marginTop: 10,
                        paddingHorizontal: 5,
                        marginBottom: 5,
                      }}
                      onPress={() =>
                        navigation.navigate('HospitalityCategoryDetails', {
                          data: item,
                        })
                      }>
                      <View
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
                          <View>
                            <Custom_Wishist
                              index={index}
                              category={item.category}
                            />
                          </View>
                        </View>

                        <View style={{marginTop: 10, marginLeft: 10}}>
                          <Text numberOfLines={1} style={[style.subsubtitle,{width:150}]}>
                            {item.title}
                          </Text>
                          <Text>
                            ₹{' '}
                            {item.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                          <Text>{getCreatedAtLabel(item.created_at)}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.id}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        dragOnContent
        height={600}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        customModalProps={{
          animationType: 'fade',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={{flex: 1, padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[style.subtitle, {textAlign: 'left'}]}>Budget</Text>
            <Entypo
              name="cross"
              size={30}
              onPress={() => refRBSheet.current.close()}
            />
          </View>
          <View>
            <Text style={{textAlign: 'left', marginTop: 10}}>
              Choose a range below ({' '}
              <FontAwesome5 name="rupee-sign" size={12} /> )
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <TextInput
              placeholder="Min."
              placeholderTextColor="black"
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 60,
                paddingLeft: 20,
                borderWidth: 0.5,
              }}
              inputMode="numeric"
              value={minbudget}
              onChangeText={min => setMinbudget(min)}
            />
          </View>
          <View>
            <Text style={{textAlign: 'center', marginTop: 10}}>To</Text>
          </View>
          <View style={{marginTop: 10}}>
            <TextInput
              placeholder="Max."
              placeholderTextColor="black"
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 60,
                paddingLeft: 20,
                borderWidth: 0.5,
              }}
              inputMode="numeric"
              value={maxbudget}
              onChangeText={max => setMaxbudget(max)}
            />
          </View>
        </View>
        <View style={{marginTop: 0}}>
          <TouchableOpacity
            style={{
              backgroundColor: style.button.backgroundColor,
              borderRadius: 0,
              height: 60,
              justifyContent: 'center',
              borderColor: 'gray',
              borderWidth: 0.5,
            }}
            onPress={handlebudget}>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default HospitalityCategory;
