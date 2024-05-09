import React, {useEffect, useState} from 'react';
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
  Modal,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Dimensions} from 'react-native';
import {handleGetToken} from '../../constant/tokenUtils';
import {Baseurl} from '../../constant/globalparams';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const FirstRoute = item => {
  const [vehiclevalue, setVehiclevalue] = useState(null);
  const [modelvalue, setModelValue] = useState(null);
  const [fuelvalue, setFuelvalue] = useState(null);

  const [loading, setLoading] = useState(false);

  const modelData = [
    {label: 'BMW', value: '1'},
    {label: 'Ford', value: '2'},
    {label: 'Fiat', value: '3'},
    {label: 'Honda', value: '4'},
    {label: 'Hyundai', value: '5'},
    {label: 'Jeep', value: '6'},
    {label: 'Mercedes', value: '7'},
    {label: 'Toyota', value: '8'},
    {label: 'Mahindra', value: '9'},
    {label: 'Renault', value: '10'},
    {label: 'Volkswagen', value: '11'},
    {label: 'Audi', value: '12'},
    {label: 'Tata Motors', value: '13'},
    {label: 'Maruti Suzuki', value: '14'},
    {label: 'All Brands', value: '15'},
  ];
  const Vehicledata = [
    {label: 'Car', value: '1'},
    {label: 'MotorCycle', value: '2'},
    {label: 'Scooty', value: '3'},
    {label: 'Bike', value: '4'},
   ];
  const Fueldata = [
    {label: 'Petrol', value: '1'},
    {label: 'Diesel', value: '2'},
    {label: 'CNG', value: '3'},
    {label: 'LPG', value: '4'},
    {label: 'Electric', value: '5'},
    {label: 'Hybrid', value: '6'},
  ];

  const [selectedImages, setSelectedImages] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;
  const [registrationyear, seRegistrationyear] = useState(null);
  const [vehiclevariant, setVehiclevariant] = useState(null);
  const [vehiclemodel, setVehiclemodel] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [kilometerdriven, setKilometerdirven] = useState(null);
  const [adtitle, setAdtitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [price, setPrice] = useState(null);
  const [street, setStreet] = useState(null);
  const [locality, setLocality] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setstate] = useState(null);
  const [pincode, setPincode] = useState(null);

  const fetchproductApibyid = id => {
    axios
      .get(`${Baseurl}/api/vehicles/id/${id}`)
      .then(response => {
        console.log('response----', response);
        setVehiclevalue(
          Vehicledata.find(
            item => item.label === response.data.data?.type,
          )?.value || null,
        );
        setModelValue(
          modelData.find(
            item =>
              item.label.toLowerCase() ===
              response.data.data?.brand,
          )?.value || null,
        );
        setFuelvalue(
          Fueldata.find(
            item => item.label === response.data.data?.fuel,
          )?.value || null,
        );

        setVehiclemodel(response.data.data?.model);
        setVehiclevariant(response.data.data?.variant);
        seRegistrationyear(response.data.data?.registration_year);
        setAdtitle(response.data.data?.title);
        setKilometerdirven(response.data.data?.kilometer_driven);
        setTransmission(response.data.data?.transmission);
        setDescription(response.data.data?.description);
        setPrice(response.data.data?.price);
        setStreet(response.data.data?.street);
        setLocality(response.data.data?.locality);
        setCity(response.data.data?.city);
        setstate(response.data.data?.state);
        setPincode(response.data.data?.pincode);
        setSelectedImages(
          response.data.data?.images.map(imagePath => ({
            uri: `${Baseurl}/api/${imagePath}`,
          })),
        );
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };
  useEffect(() => {
    fetchproductApibyid(item.item.item.id);
  }, []);

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

        // Hit the API to save the image
        handleGetToken().then(token => {
          if (token) {
            const formData = new FormData();
            formData.append('images', {
              uri: imageInfo.uri,
              type: imageInfo.type,
              name: imageInfo.fileName,
            });

            axios
              .post(
                `${Baseurl}/api/vehicles/images/id/${item.item.item.id}`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
              .then(response => {
                console.log('Image saved successfully:', response.data);
                ToastAndroid.showWithGravityAndOffset(
                  `${response.data.message}`,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              })
              .catch(error => {
                console.error('Error saving image:', error);
              });
          } else {
            console.log('Token not retrieved');
          }
        });
      }
    });
  };

  const handleEditAd = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          console.log('Token retrieved successfully--->', token);
          setLoading(true);

          const requestBody = {
            title: adtitle,
            brand: modelData.find(item => item.value === modelvalue)?.label,
            type: Vehicledata.find(item => item.value === vehiclevalue)?.label,
            fuel: Fueldata.find(item => item.value === fuelvalue)?.label,
            description: description,
            price: price,
            street: street,
            locality: locality,
            city: city,
            state: state,
            pincode: pincode,
            kilometer_driven: kilometerdriven,
            registration_year: registrationyear,
            transmission: transmission,
            model: vehiclemodel,
            second_hand: 1,
            variant: vehiclevariant,
          };

          axios
            .put(
              `${Baseurl}/api/vehicles/id/${item.item.item.id}`,
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
    const imageToDelete = selectedImages[index];
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const startIndex = imageToDelete.uri.indexOf('public/');
    const extractedPart = imageToDelete.uri.substring(startIndex);

    handleGetToken()
      .then(token => {
        if (token) {
          setLoading(true);
          axios
            .delete(
              `${Baseurl}/api/vehicles/image/delete/id/${item.item.item.id}`,
              {
                data: {images: extractedPart},
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(response => {
              console.log('Response of the API:', response);
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .catch(error => {
              console.error('Error deleting image:', error);
              if (error.message === 'Network Error') {
                ToastAndroid.showWithGravityAndOffset(
                  'Something went wrong, Please try again later',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              } else {
                ToastAndroid.showWithGravityAndOffset(
                  `${error.response.data.message}`,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }
            })
            .finally(() => {
              setLoading(false); // Reset loading state when the operation finishes
            });
        } else {
          console.log('Token not retrieved');
        }
      })
      .catch(error => {
        console.error('Error while handling token:', error);
      });
  };
  return (
    <View style={{flex: 1}}>
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
                <View>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Vehicledata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Vehicle Type"
                    // searchPlaceholder="Search..."
                    value={vehiclevalue}
                    onChange={item => {
                      setVehiclevalue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={modelData}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Vehicle Brand"
                    // searchPlaceholder="Search..."
                    value={modelvalue}
                    onChange={item => {
                      setModelValue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Fueldata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Fuel type"
                    // searchPlaceholder="Search..."
                    value={fuelvalue}
                    onChange={item => {
                      setFuelvalue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Vehicle Model</Text>
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
                    value={vehiclemodel}
                    onChangeText={reg => setVehiclemodel(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Vehicle Variant</Text>
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
                    value={vehiclevariant}
                    onChangeText={reg => setVehiclevariant(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Registration Year*</Text>
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
                    value={registrationyear}
                    onChangeText={reg => seRegistrationyear(reg)}
                  />
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text>Transmission</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {['Auto', 'Manual'].map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 115,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            transmission === item ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setTransmission(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: transmission === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Kilometer Driven*</Text>
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
                    value={kilometerdriven}
                    onChangeText={reg => setKilometerdirven(reg)}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Ad Title*</Text>
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
                  <Text style={{fontSize: 12}}>
                    Mention the key features of your item (
                    <Text>E.g brand,model,age,type</Text>)
                  </Text>
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
                  <Text>Describe what you are selling</Text>
                  <TextInput
                    placeholderTextColor="black"
                    multiline={true}
                    numberOfLines={3}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={reg => setDescription(reg)}
                  />
                  <Text style={{fontSize: 12}}>
                    Include condition,reason and features for selling
                  </Text>
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Address*</Text>
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
                    value={address}
                    onChangeText={reg => setAddress(reg)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'gray',
                height: 120,
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View style={{padding: 0}}>
                <Text style={style.subsubtitle}>SET A PRICE</Text>
                <TextInput
                  placeholderTextColor="black"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 60,
                    paddingLeft: 20,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                  inputMode="numeric"
                  value={price}
                  onChangeText={reg => setPrice(reg)}
                />
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
                      {selectedImages && selectedImages[index] ? (
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
          onPress={handleEditAd}
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

const SecondRoute = () => {
  const navigation = useNavigation();
  const [vehiclevalue, setVehiclevalue] = useState(null);
  const [modelvalue, setModelValue] = useState(null);
  const [fuelvalue, setFuelvalue] = useState(null);
  const [vehiclemodel, setVehiclemodel] = useState('');

  const [loading, setLoading] = useState(false);

  const [loadingotp, setLoadingotp] = useState(false);
  const [loadingverifyotp, setLoadingverifyotp] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [verifyotpvalue, setVerifyOtpvalue] = useState(null);

  const modelData = [
    {label: 'BMW', value: '1'},
    {label: 'Ford', value: '2'},
    {label: 'Fiat', value: '3'},
    {label: 'Honda', value: '4'},
    {label: 'Hyundai', value: '5'},
    {label: 'Jeep', value: '6'},
    {label: 'Mercedes', value: '7'},
    {label: 'Toyota', value: '8'},
    {label: 'Mahindra', value: '9'},
    {label: 'Renault', value: '10'},
    {label: 'Volkswagen', value: '11'},
    {label: 'Audi', value: '12'},
    {label: 'Tata Motors', value: '13'},
    {label: 'Maruti Suzuki', value: '14'},
    {label: 'All Brands', value: '15'},
  ];
  const Vehicledata = [
    {label: 'Car', value: '1'},
    {label: 'MotorCycle', value: '2'},
    {label: 'Scooty', value: '3'},
    {label: 'Bike', value: '4'},
   ];
  const Fueldata = [
    {label: 'Petrol', value: '1'},
    {label: 'Diesel', value: '2'},
    {label: 'CNG', value: '3'},
    {label: 'LPG', value: '4'},
    {label: 'Electric', value: '5'},
    {label: 'Hybrid', value: '6'},
  ];

  const [selectedImages, setSelectedImages] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;
  const [registrationyear, seRegistrationyear] = useState('');
  const [vehiclevariant, setVehiclevariant] = useState('');
  const [transmission, setTransmission] = useState('');
  const [kilometerdriven, setKilometerdirven] = useState('');
  const [adtitle, setAdtitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(true);

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

  const handlePostAd = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          console.log('Token retrieved successfully--->', token);
          setLoading(true);

          const formData = new FormData();

          // formData.append("plan_id", "1");
          formData.append('title', adtitle);

          const vehicletype = Vehicledata.filter(
            item => item.value === vehiclevalue,
          )
            .map(i => i.label)
            .toString();
          const modeltype = modelData
            .filter(item => item.value === modelvalue)
            .map(i => i.label)
            .toString();
          const fueldatatype = Fueldata.filter(item => item.value === fuelvalue)
            .map(i => i.label)
            .toString();

          formData.append('brand', modeltype);
          formData.append('type', vehicletype);
          formData.append('fuel', fueldatatype);
          formData.append('variant', vehiclevariant);
          formData.append('model', vehiclemodel);
          formData.append('second_hand', 0);
          formData.append('transmission', transmission);
          formData.append('registration_year', registrationyear);
          formData.append('kilometer_driven', kilometerdriven);
          formData.append('description', description);
          formData.append('price', price);

          selectedImages.forEach((image, index) => {
            formData.append(`images[${index}]`, {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
          });

          formData.append('street', street);
          formData.append('locality', locality);
          formData.append('city', city);
          formData.append('state', state);
          formData.append('pincode', pincode);

          console.log('formData===', formData);
          axios
            .post(`${Baseurl}/api/vehicles/add`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              console.log('response of the api--->', response);
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              setShowTokenModal(false);
            })
            .catch(error => {
              console.error('Catch Error :---->', error.response);
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
          setShowTokenModal(true);
        }
      })
      .catch(error => {
        console.error('Error while handling post ad:', error);
      });
  };

  const closeModal = () => {
    setShowTokenModal(false);
    setShowNestedModal(false);
    setLoadingotp(false);
    setLoadingverifyotp(false);
  };

  const [mobile, setMobile] = useState('');
  const [data, setData] = useState(null);
  const [showNestedModal, setShowNestedModal] = useState(false);

  const sendOtp = async () => {
    try {
      if (!mobile || mobile.length !== 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number');
        setIsValidNumber(false);
        return;
      }
      setLoadingotp(true);
      const response = await axios.post(`${Baseurl}/api/users/sendotp`, {
        mobile,
      });

      if (response.status !== 200) {
        console.log('response data--->', response.data);
      }

      setData(response.data);
      if (response.data.success === true) {
        let newotp = response.data.data.otp;
        setVerifyOtpvalue(newotp.toString());
        handleNestedModal();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingotp(false);
    }
  };

  const closeNestedModal = () => {
    setShowTokenModal(false);
    setShowNestedModal(false);
    setLoadingotp(false);
    setLoadingverifyotp(false);
  };

  const handleNestedModal = () => {
    setShowNestedModal(true);
  };

  const verifyOtp = async () => {
    try {
      setLoadingverifyotp(true);
      const postData = {
        mobile: parseInt(mobile),
        otp: parseInt(verifyotpvalue),
      };
      console.log('postData---', postData);

      const response = await axios.post(
        `${Baseurl}/api/users/login`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('response data--->', response.data);
      setData(response.data);
      if (response.data.success == true) {
        handleNavigation(response.data.token);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingverifyotp(false);
    }
  };

  const handleNavigation = async information => {
    console.log('information--->', information);
    try {
      await AsyncStorage.setItem('UserData', JSON.stringify(information));
      setLoadingverifyotp(true);
      setTimeout(() => {
        setLoadingverifyotp(false);
        setShowTokenModal(false);
        setShowNestedModal(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isfocused = useIsFocused();

  useEffect(() => {
    if (isfocused == true) {
      setErrorMessage('');
    }
  }, [isfocused]);
  return (
    <View style={{flex: 1}}>
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
                <View>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Vehicledata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Vehicle Type"
                    // searchPlaceholder="Search..."
                    value={vehiclevalue}
                    onChange={item => {
                      setVehiclevalue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={modelData}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Vehicle Brand"
                    // searchPlaceholder="Search..."
                    value={modelvalue}
                    onChange={item => {
                      setModelValue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Fueldata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Fuel type"
                    // searchPlaceholder="Search..."
                    value={fuelvalue}
                    onChange={item => {
                      setFuelvalue(item.value);
                    }}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Vehicle Model</Text>
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
                    value={vehiclemodel}
                    onChangeText={reg => setVehiclemodel(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Vehicle Variant</Text>
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
                    value={vehiclevariant}
                    onChangeText={reg => setVehiclevariant(reg)}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Vehicle Variant</Text>
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
                    value={vehiclevariant}
                    onChangeText={reg => setVehiclevariant(reg)}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text>Transmission</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {['Auto', 'Manual'].map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 115,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            transmission === item ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setTransmission(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: transmission === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Ad Title*</Text>
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
                  <Text style={{fontSize: 12}}>
                    Mention the key features of your item (
                    <Text>E.g brand,model,age,type</Text>)
                  </Text>
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
                  <Text>Describe what you are selling</Text>
                  <TextInput
                    placeholderTextColor="black"
                    multiline={true}
                    numberOfLines={3}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={reg => setDescription(reg)}
                  />
                  <Text style={{fontSize: 12}}>
                    Include condition,reason and features for selling
                  </Text>
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Address*</Text>
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
                    value={address}
                    onChangeText={reg => setAddress(reg)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'gray',
                height: 120,
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View style={{padding: 0}}>
                <Text style={style.subsubtitle}>SET A PRICE</Text>
                <TextInput
                  placeholderTextColor="black"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 60,
                    paddingLeft: 20,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                  inputMode="numeric"
                  value={price}
                  onChangeText={reg => setPrice(reg)}
                />
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
                      {selectedImages && selectedImages[index] ? (
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showTokenModal}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: '100%',
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <AntDesign name="close" size={30} />
            </TouchableOpacity>

            <View style={{padding: 10}}>
              {/* <View style={{ marginTop: 10 }}>
              <Text style={styles.header}>Welcome</Text>
              <Text style={[styles.header, { marginTop: -10 }]}>back</Text>
            </View> */}
              <View style={{marginTop: 25}}>
                <Text style={style.title}>Enter Mobile Number</Text>
              </View>
              <View style={{marginTop: 20}}>
                <TextInput
                  placeholder="Enter here"
                  placeholderTextColor="black"
                  style={styles.textinput}
                  inputMode="numeric"
                  value={mobile}
                  onChangeText={phone => setMobile(phone)}
                  maxLength={10}
                />
                <View
                  style={{display: errorMessage.length == 0 ? 'none' : 'flex'}}>
                  {!isValidNumber && (
                    <Text style={{color: 'red'}}>{errorMessage}</Text>
                  )}
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={sendOtp}
                  style={[styles.button, {opacity: loadingotp ? 0.5 : 1}]}
                  disabled={loadingotp}>
                  {loadingotp ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Send OTP
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showNestedModal}
        onRequestClose={closeNestedModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: '100%',
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <AntDesign name="close" size={30} />
            </TouchableOpacity>

            <View style={{padding: 20}}>
              <View>
                <Text style={style.title}>
                  We've sent your verification code to +91 {mobile}
                </Text>
              </View>

              <View style={{marginTop: 50}}>
                <TextInput
                  // placeholder='Enter Code'
                  placeholderTextColor="black"
                  style={style.inputfield}
                  inputMode="numeric"
                  value={verifyotpvalue}
                  onChangeText={verifyotp => setVerifyOtpvalue(verifyotp)}
                />
              </View>

              <View style={{marginTop: 20}}>
                <TouchableOpacity
                  onPress={verifyOtp}
                  style={[style.button, {opacity: loadingverifyotp ? 0.5 : 1}]}
                  disabled={loadingverifyotp}>
                  {loadingverifyotp ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Verify Otp
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginTop: 20}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 12,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'black',
                      }}>
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 12,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center', fontSize: 18}}>
                      1:20 min left
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

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
          onPress={handlePostAd}
          disabled={loading ? true : false}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
              Post My Ad
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const Editvehicleads = item => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Used Vehicle'},
    {key: 'second', title: 'New Vehicle'},
  ]);

  const newdata = item.route.params;
  const fetchproductApibyid = id => {
    axios
      .get(`${Baseurl}/api/vehicles/id/${id}`)
      .then(response => {
        console.log('response----', response);
        setIndex(response.data.data.second_hand == 1 ? 0 : 1);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };
  useEffect(() => {
    fetchproductApibyid(newdata?.item.id);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Vehicle" />
      </Appbar.Header>

      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: () => <FirstRoute item={newdata} />,
          second: () => <SecondRoute item={newdata} />,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'red'}}
            style={{backgroundColor: '#3184b6', width: '100%'}}
          />
        )}
      />
    </View>
  );
};

export default Editvehicleads;
const styles = StyleSheet.create({
  header: {
    fontSize: 36 * 1.33,
    marginTop: 0,
    fontWeight: '600',
    color: 'black',
  },
  title: {
    fontSize: 16 * 1.33,
    fontWeight: '300',
    color: 'black',
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 60,
    paddingLeft: 20,
    borderWidth: 0.8,
  },
  button: {
    backgroundColor: '#3184b6',
    borderRadius: 12,
    height: 60,
    justifyContent: 'center',
  },
});
