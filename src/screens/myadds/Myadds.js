import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  ToastAndroid,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Baseurl } from '../../constant/globalparams';
import { handleGetToken } from '../../constant/tokenUtils';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import style from '../../style';

const Myadds = (props) => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState(null);
  const [switchState, setSwitchState] = useState(false);

  const handleWishlist = (id) => {
    const updatedWishlist = [...wishlist];
    const index = updatedWishlist.indexOf(id);
    if (index === -1) {
      updatedWishlist.push(id);
    } else {
      updatedWishlist.splice(index, 1);
    }
    setWishlist(updatedWishlist);
  };

  const isWishlisted = (id) => {
    return wishlist.includes(id);
  };

  const getCreatedAtLabel = (created_at) => {
    const currentDate = new Date();
    const createdDate = new Date(created_at);

    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return created_at;
    }
  };

  const fetchmyadsApi = () => {
    handleGetToken().then((token) => {
      if (token) {
        axios
          .get(`${Baseurl}/api/users/myads`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('response ---', response.data.data);
            setData(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      } else {
        console.log('Token not retrieved');
        setShowTokenModal(true);
      }
    });
  };

  useEffect(() => {
    if (isfocused == true) {
      fetchmyadsApi();
    }
  }, [isfocused]);

  useEffect(() => {
    // Check if data is not null and contains items
    if (data && data.length > 0) {
      // Toggle switch based on the is_active property of the first item
      setSwitchState(data[0].is_active);
    }
  }, [data]);

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
      { cancelable: true }
    );
  };

  const handleDeleteConfirmed = (category, id) => {
    handleGetToken().then((token) => {
      if (token) {
        axios
          .delete(`${Baseurl}/api/${category}/id/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('Deleted item:', response.data);
            // Remove the deleted item from the state
            setData((prevData) => prevData.filter((item) => item.id !== id));
            ToastAndroid.showWithGravityAndOffset(
              'Item deleted successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
            fetchmyadsApi(); // Refresh the data after deletion
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
            ToastAndroid.showWithGravityAndOffset(
              'Failed to delete item',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          });
      }
    });
  };

  const toggleActivation = (category, id, is_active) => {
    Alert.alert(
      'Confirm',
      is_active ? 'Deactivate this item?' : 'Activate this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            handleToggleActivation(category, id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleActivation = (category, id) => {
    handleGetToken().then((token) => {
      if (token) {
        axios
          .put(
            `${Baseurl}/api/${category}/deactivate/id/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log('Activation toggled:', response);
            fetchmyadsApi();
            setSwitchState(!switchState);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === id ? { ...item, is_active: !item.is_active } : item
              )
            );
            ToastAndroid.showWithGravityAndOffset(
              'Activation status updated successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          })
          .catch((error) => {
            console.error('Error toggling activation:', error);
            ToastAndroid.showWithGravityAndOffset(
              'Failed to update activation status',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="My Adds" />
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
            style={{ height: 200, width: 200 }}
            onAnimationFinish={() => console.log('Animation Finished')}
            onError={(error) => console.log('Lottie Error:', error)}
          />
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            let imageurl = `${Baseurl}/api/${item.images[0]}`;
            return (
              <View style={{ padding: 10 }}>
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
                  <Image
                    source={{ uri: imageurl }}
                    style={{
                      height: 150,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
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
                        style={{ color: '#3184b6', marginRight: 5 }}
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

                    <TouchableOpacity
                      onPress={() => handleWishlist(index)}
                      style={{
                        paddingHorizontal: 2,
                        paddingVertical: 2,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                      }}>
                      {isWishlisted(index) ? (
                        <AntDesign
                          name="heart"
                          style={{ color: '#3184b6' }}
                          size={20}
                        />
                      ) : (
                        <AntDesign
                          name="hearto"
                          style={{ color: '#3184b6' }}
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                      <Text variant="titleLarge" style={style.subsubtitle}>
                        ₹ {item.price}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{ width: 250 }}
                        variant="bodyMedium">
                        {item.title}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Switch
                        value={switchState}
                        onValueChange={(value) =>
                          toggleActivation(item.category, item.id, value)
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
                                        { item }
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
                            { cancelable: true }
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
                    <View style={{ flexDirection: 'row' }}>
                      <SvgXml
                        xml={location}
                        width="15px"
                        height="15px"
                        style={{ marginTop: 3, marginRight: 0 }}
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

export default Myadds;
