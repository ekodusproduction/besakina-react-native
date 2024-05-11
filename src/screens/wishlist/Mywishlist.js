import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  ToastAndroid,
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

  const deleteItem = (category, id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            handleDeleteConfirmed(category, id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleDeleteConfirmed = (category, id) => {
    handleGetToken().then(token => {
      if (token) {
        axios
          .delete(`${Baseurl}/api/${category}/id/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            console.log('Deleted item:', response.data);
            // Remove the deleted item from the state
            setData(prevData => prevData.filter(item => item.id !== id));
            ToastAndroid.showWithGravityAndOffset(
              'Item deleted successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
            fetchMywishlistApi(); // Refresh the data after deletion
          })
          .catch(error => {
            console.error('Error deleting item:', error);
            ToastAndroid.showWithGravityAndOffset(
              'Failed to delete item',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          });
      }
    });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setSwitchState(data[0].is_active === 1);
    }
  }, [data]);

  const toggleActivation = (category, id, is_active) => {
    Alert.alert(
      'Confirm',
      !is_active
        ? `Deactivate this ${category} add ?`
        : `Activate this ${category} add ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            handleToggleActivation(category, id, is_active);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleToggleActivation = (category, id, is_active) => {
    handleGetToken().then(token => {
      if (token) {
        const action = !is_active ? 'deactivate' : 'activate';
        if (action == 'deactivate') {
          axios
            .delete(`${Baseurl}/api/${category}/${action}/id/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              console.log('response:', response);
              fetchMywishlistApi();
              setSwitchState(!switchState);
              setData(prevData =>
                prevData.map(item =>
                  item.id === id ? {...item, is_active: !is_active} : item,
                ),
              );
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .catch(error => {
              console.error('error:', error);
              ToastAndroid.showWithGravityAndOffset(
                `${error.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            });
        } else {
          axios
            .put(
              `${Baseurl}/api/${category}/${action}/id/${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(response => {
              console.log('response:', response);
              fetchMywishlistApi();
              setSwitchState(!switchState);
              setData(prevData =>
                prevData.map(item =>
                  item.id === id ? {...item, is_active: !is_active} : item,
                ),
              );
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .catch(error => {
              console.error('error:', error);
              ToastAndroid.showWithGravityAndOffset(
                `${error.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            });
        }
      }
    });
  };

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
        <Appbar.Content title="My WishList" />
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
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#3184b6',
              borderRadius: 12,
              height: 60,
              width: '80%',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('AddAds')}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
              }}>
              Press Here
            </Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            let imageurl = `${Baseurl}/api/${item.images[0]}`;
            return (
              <View style={{padding: 10}}>
                <View
                  style={{
                    paddingHorizontal: 2,
                    paddingVertical: 5,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 5,
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
                <TouchableOpacity
                  style={{
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
                      ? navigation.navigate('HospitalorClinicCategoryDetails', {
                          data: item,
                          edit: 'edit',
                        })
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
                        height: imageHeight,
                        width: '100%',
                        objectFit: 'cover',
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

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginTop: 10, marginLeft: 10}}>
                      <Text variant="titleLarge" style={style.subsubtitle}>
                        ₹ {item.price}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{width: 250}}
                        variant="bodyMedium">
                        {item.title}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Switch
                        value={item.is_active === 1}
                        onValueChange={value =>
                          toggleActivation(
                            item.category,
                            item.id,
                            value,
                            item.is_active,
                          )
                        }
                      />

                      <AntDesign
                        name="delete"
                        size={20}
                        style={{
                          color: 'red',
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 10,
                          borderWidth: 0.8,
                          padding: 3,
                          borderRadius: 5,
                          paddingLeft: 5,
                          borderColor: 'red',
                        }}
                        onPress={() => deleteItem(item.category, item.id)}
                      />

                      <AntDesign
                        name="edit"
                        size={20}
                        style={{
                          color: 'green',
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 10,
                          borderWidth: 0.8,
                          padding: 3,
                          borderRadius: 5,
                          borderColor: 'green',
                        }}
                        onPress={() =>
                          Alert.alert(
                            'Confirm Edit',
                            'Are you sure you want to edit this item?',
                            [
                              {
                                text: 'Cancel',
                                style: 'cancel',
                              },
                              {
                                text: 'Edit',
                                style: 'destructive',
                                onPress: () => {
                                  item.category == 'education'
                                    ? navigation.navigate('Editeducationadds', {
                                        item,
                                      })
                                    : item.category == 'property'
                                    ? navigation.navigate('Editpropertyadds', {
                                        item,
                                      })
                                    : item.category == 'vehicles'
                                    ? navigation.navigate('Editvehicleads', {
                                        item,
                                      })
                                    : item.category == 'hospitality'
                                    ? navigation.navigate(
                                        'Edithospitalityadds',
                                        {item},
                                      )
                                    : item.category == 'doctors'
                                    ? navigation.navigate('Editdoctoradds', {
                                        item,
                                      })
                                    : item.category == 'hospitals'
                                    ? navigation.navigate('Edithospitaladds', {
                                        item,
                                      })
                                    : null;
                                },
                              },
                            ],
                            {cancelable: true},
                          )
                        }
                      />
                    </View>
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
                      <Text variant="titleLarge">{item.state}</Text>
                    </View>
                    <Text>{getCreatedAtLabel(item.created_at)}</Text>
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

export default Mywishlist;
