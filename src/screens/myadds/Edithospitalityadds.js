import {
  Image,
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import {launchCamera} from 'react-native-image-picker';
import {Dimensions} from 'react-native';
import {handleGetToken} from '../../constant/tokenUtils';
import {Baseurl} from '../../constant/globalparams';
import axios from 'axios';

const Edithospitalityadds = item => {
  const navigation = useNavigation();
  const newdata = item.route.params;
  const fetchproductApibyid = id => {
    axios
      .get(`${Baseurl}/api/hospitality/id/${id}`)
      .then(response => {
        console.log('response----', response);
        setHospitalityvalue(
          Hospitalitydata.find(
            item => item.label === response.data.data.advertisement?.type,
          )?.value || null,
        );
        setName(response.data.data.advertisement?.name);
        setAdtitle(response.data.data.advertisement?.title);
        setDescription(response.data.data.advertisement?.description);
        setPrice(response.data.data.advertisement?.price);
        setStreet(response.data.data.advertisement?.street);
        setLocality(response.data.data.advertisement?.locality);
        setCity(response.data.data.advertisement?.city);
        setstate(response.data.data.advertisement?.state);
        setPincode(response.data.data.advertisement?.pincode);
        setSelectedImages(
          response.data.data.advertisement?.images.map(imagePath => ({
            uri: `${Baseurl}/api/${imagePath}`,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };
  useEffect(() => {
    fetchproductApibyid(newdata?.item.id);
  }, []);

  const [hospitalityvalue, setHospitalityvalue] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(false);

  const [adtitle, setAdtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setPincode] = useState('');

  const Hospitalitydata = [
    {label: 'Hotel', value: '1'},
    {label: 'Guest House', value: '2'},
    {label: 'Homestay', value: '3'},
    {label: 'Resort', value: '4'},
    {label: 'Paying Guest', value: '5'},
  ];

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.5,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const imageInfo = {
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
          fileName: response.assets?.[0]?.fileName,
        };
        setSelectedImages([...selectedImages, imageInfo]);
      }
    });
  };

  const editPostAd = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          console.log('Token retrieved successfully--->', token);
          setLoading(true);

          const requestBody = {
            title: adtitle,
            type: Hospitalitydata.find(item => item.value === hospitalityvalue)
              ?.label,
            description: description,
            name: name,
            price: price,
            street: street,
            locality: locality,
            city: city,
            state: state,
            pincode: pincode,
          };

          axios
            .put(
              `${Baseurl}/api/hospitality/id/${newdata.item.id}`,
              requestBody,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(response => {
              console.log('response of the api--->', response);
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .catch(error => {
              console.error('Catch Error :---->', error);
              if (error.message == 'Network Error') {
                ToastAndroid.showWithGravityAndOffset(
                  `Something went wrong, Try again later`,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }
              console.log('error message--->', error.response.data.message);
              ToastAndroid.showWithGravityAndOffset(
                `${error.response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log('Token not retrieved');
        }
      })
      .catch(error => {
        console.error('Error while handling post ad:', error);
      });
  };

  const deleteImage = index => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    handleGetToken().then(token => {
      console.log('token---', token);
      if (token) {
        axios
          .delete(
            `${Baseurl}/api/hospitality/image/delete/id/${newdata.item.id}`,
            {
            selectedImages,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => {
            console.log('response of the api--->', response);
            ToastAndroid.showWithGravityAndOffset(
              `${response.data.message}`,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          })
          .catch(error => {
            console.error('Catch Error :---->', error);
            if (error.message == 'Network Error') {
              ToastAndroid.showWithGravityAndOffset(
                `Something went wrong, Try again later`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            }
            console.log('error message--->', error.response.data.message);
            ToastAndroid.showWithGravityAndOffset(
              `${error.response.data.message}`,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Hospitality" />
      </Appbar.Header>

      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{padding: 10}}>
            <View
              style={{
                borderWidth: 0.5,
                height: '1500px',
                marginTop: 10,
                borderRadius: 5,
                borderColor: 'gray',
              }}>
              <View style={{padding: 5}}>
                <View style={{marginTop: 10}}>
                  <Text>Name*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    value={name}
                    onChangeText={reg => setName(reg)}
                  />
                </View>

                <View style={{marginTop: 15}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Hospitalitydata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Type"
                    // searchPlaceholder="Search..."
                    value={hospitalityvalue}
                    onChange={item => {
                      setHospitalityvalue(item.value);
                    }}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Title*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={adtitle}
                    onChangeText={reg => setAdtitle(reg)}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Street</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={street}
                    onChangeText={built => setStreet(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Locality</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={locality}
                    onChangeText={built => setLocality(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>City</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={city}
                    onChangeText={built => setCity(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>State</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={state}
                    onChangeText={built => setstate(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Pincode</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    inputMode="numeric"
                    value={pincode}
                    onChangeText={built => setPincode(built)}
                    maxLength={6}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Write some description</Text>
                  <TextInput
                    placeholderTextColor="black"
                    multiline={true}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                      height: 60,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={reg => setDescription(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Price (per month)*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    inputMode="numeric"
                    value={price}
                    onChangeText={reg => setPrice(reg)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'gray',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View style={{padding: 0}}>
                <Text style={style.subsubtitle}>UPLOAD UPTO 20 PHOTOS</Text>
                <FlatList
                  data={[...Array(20).keys()]}
                  vertical
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={handleCameraLaunch}
                      style={{
                        height: itemWidth,
                        width: itemWidth,
                        borderRadius: 5,
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
                      }}>
                      {selectedImages[index] ? (
                        <>
                          <Image
                            source={{
                              uri:
                                typeof selectedImages[index] === 'string'
                                  ? selectedImages[index]
                                  : selectedImages[index].uri,
                            }}
                            style={{height: '100%', width: '100%'}}
                            resizeMode="cover"
                          />
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              padding: 5,
                              borderRadius: 10,
                            }}
                            onPress={() => deleteImage(index)}>
                            <AntDesign
                              name="closecircle"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <AntDesign name="camera" size={50} />
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

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
          onPress={editPostAd}
          disabled={loading ? true : false}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              Update My Ad
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Edithospitalityadds;
