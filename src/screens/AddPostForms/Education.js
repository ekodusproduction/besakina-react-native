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
import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import {launchCamera} from 'react-native-image-picker';
import {Dimensions} from 'react-native';
import {Baseurl} from '../../constant/globalparams';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleGetToken} from '../../constant/tokenUtils';
import {useIsFocused} from '@react-navigation/native';
import {States} from '../../json/States';
import AuthenticationModal_PostAdd from '../../components/AuthenticationModal_PostAdd';

const Education = () => {
  const navigation = useNavigation();
  const [coursevalue, setCoursevalue] = useState(null);
  const [domainvalue, setDomainvalue] = useState(null);
  const [loading, setLoading] = useState(false);
  const Coursedata = [
    {label: 'Graduation', value: '1'},
    {label: 'Diploma', value: '2'},
    {label: 'Certification', value: '3'},
  ];
  const Domaindata = [
    {label: 'Science', value: '1'},
    {label: 'Arts', value: '2'},
    {label: 'Commerce', value: '3'},
    {label: 'Computer Science', value: '4'},
    {label: 'Cooking', value: '5'},
    {label: 'Electronics', value: '6'},
  ];
  const [selectedImages, setSelectedImages] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;
  const [duration, setDuration] = useState(null);
  const [instituname, setInstituname] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [price, setPrice] = useState(null);
  const [loadingotp, setLoadingotp] = useState(false);
  const [loadingverifyotp, setLoadingverifyotp] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [verifyotpvalue, setVerifyOtpvalue] = useState(null);
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(true);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState([]);

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
    // Array to store missing fields
    const missingFields = [];

    // Input validation
    switch (true) {
      case !coursevalue:
        missingFields.push('Course Type');
        break;
      case !domainvalue:
        missingFields.push('Domain');
        break;
      case !duration:
        missingFields.push('Course Duration');
        break;
      case !instituname:
        missingFields.push('Institution Name');
        break;
      case !title:
        missingFields.push('Ad Title');
        break;
      case !description:
        missingFields.push('Description');
        break;
      case !street:
        missingFields.push('Street');
        break;
      case !locality:
        missingFields.push('Locality');
        break;
      case !selectedCity:
        missingFields.push('City');
        break;
      case !selectedState:
        missingFields.push('State');
        break;
      case !pincode:
        missingFields.push('Pincode');
        break;
      // case !price:
      //   missingFields.push('Price');
      //   break;
      case selectedImages.length === 0:
        missingFields.push('Images');
        break;
      default:
        break;
    }

    if (missingFields.length > 0) {
      const errorMessage = `Please fill the ${missingFields[0]} filed`;
      ToastAndroid.showWithGravityAndOffset(
        errorMessage,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    handleGetToken()
      .then(token => {
        if (token) {
          // Proceed with posting ad
          console.log('Token retrieved successfully--->', token);

          setLoading(true);

          const formData = new FormData();
          // formData.append("plan_id", "1");

          const courseType = Coursedata.filter(
            item => item.value === coursevalue,
          )
            .map(i => i.label)
            .toString();
          const domainType = Domaindata.filter(
            item => item.value === domainvalue,
          )
            .map(i => i.label)
            .toString();

          formData.append('type', courseType);
          formData.append('domain', domainType);
          formData.append('institution_name', instituname);
          formData.append('course_duration', duration);
          formData.append('title', title);
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
          formData.append('city', selectedCity);
          formData.append('state', selectedState);
          formData.append('pincode', pincode);

          console.log('formData===', formData);
          axios
            .post(`${Baseurl}/api/education/add`, formData, {
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
              console.error('Catch Error :---->', error);
              if (error.response.data.message == 'User Profile Incomplete') {
                navigation.navigate('EditProfile');
              }
              if (
                error.response.data.message ==
                'Mobile number not registered please login'
              ) {
                setShowTokenModal(true);
              }
              if (
                error.response.data.message ==
                'No plans subscribed. Please subscribe to a plan.'
              ) {
                navigation.navigate('MyPlans');
              }
              if (error.message == 'Network Error') {
                ToastAndroid.showWithGravityAndOffset(
                  `Something went wrong, Try again later`,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }
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

  const deleteImage = index => {
    const imageToDelete = selectedImages[index];
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const stateData = States.states.map(state => ({
    label: state.name,
    value: state.name,
  }));

  const handleStateChange = item => {
    setSelectedState(item.value);
    const selectedStateObj = States.states.find(s => s.name === item.value);
    setCityData(
      selectedStateObj
        ? selectedStateObj.cities.map(city => ({label: city, value: city}))
        : [],
    );
    setSelectedCity(null);
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Education" />
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
                <View style={{marginTop: 15}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Coursedata}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Course Type"
                    // searchPlaceholder="Search..."
                    value={coursevalue}
                    onChange={item => {
                      setCoursevalue(item.value);
                    }}
                  />
                </View>

                <View style={{marginTop: 15}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Domaindata}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Domain"
                    value={domainvalue}
                    onChange={item => {
                      setDomainvalue(item.value);
                    }}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Course Duration (in months)</Text>
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
                    value={duration}
                    onChangeText={reg => setDuration(reg)}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Name of Institution</Text>
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
                    value={instituname}
                    onChangeText={reg => setInstituname(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Ad Title</Text>
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
                    value={title}
                    onChangeText={reg => setTitle(reg)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Describe about the course</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    value={description}
                    onChangeText={reg => setDescription(reg)}
                    numberOfLines={5}
                    multiline={true}
                    textAlignVertical="top"
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={stateData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select State"
                    searchPlaceholder="Search..."
                    value={selectedState}
                    onChange={handleStateChange}
                  />
                </View>

                {selectedState && (
                  <View style={{marginTop: 10}}>
                    <Dropdown
                      style={style.dropdown}
                      placeholderStyle={style.placeholderStyle}
                      selectedTextStyle={style.selectedTextStyle}
                      inputSearchStyle={style.inputSearchStyle}
                      iconStyle={style.iconStyle}
                      data={cityData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select City"
                      searchPlaceholder="Search..."
                      value={selectedCity}
                      onChange={item => setSelectedCity(item.value)}
                    />
                  </View>
                )}

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
                  <Text>Price</Text>
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

      <AuthenticationModal_PostAdd
        coursevalue={coursevalue}
        domainvalue={domainvalue}
        duration={duration}
        instituname={instituname}
        title={title}
        description={description}
        street={street}
        locality={locality}
        selectedCity={selectedCity}
        selectedState={selectedState}
        pincode={pincode}
        selectedImages={selectedImages}
        price={price}
        Coursedata={Coursedata}
        Domaindata={Domaindata}
        navigation={navigation}
      />
    </View>
  );
};

export default Education;
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
