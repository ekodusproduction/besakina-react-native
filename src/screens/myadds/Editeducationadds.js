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
import {Baseurl} from '../../constant/globalparams';
import axios from 'axios';
import {handleGetToken} from '../../constant/tokenUtils';
import {useIsFocused} from '@react-navigation/native';

const Editeducationadds = item => {
  const newdata = item.route.params;

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
  const [price, setPrice] = useState(null);
  const [street, setStreet] = useState(null);
  const [locality, setLocality] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setstate] = useState(null);
  const [pincode, setPincode] = useState(null);


  const fetchproductApibyid = id => {
    axios
      .get(`${Baseurl}/api/education/id/${id}`)
      .then(response => {
        setCoursevalue(
          Coursedata.find(
            item => item.label === response.data.data?.type,
          )?.value || null,
        );

        setDomainvalue(
          Domaindata.find(
            item => item.label === response.data.data?.domain,
          )?.value || null,
        );

        setDuration(response.data.data?.course_duration);
        setInstituname(response.data.data?.institution_name);
        setTitle(response.data.data?.title);
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
    fetchproductApibyid(newdata?.item.id);
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
                `${Baseurl}/api/education/images/id/${newdata.item.id}`,
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

  const editPostAd = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          setLoading(true);

          const requestBody = {
            title: title,
            type: Coursedata.find(item => item.value === coursevalue)?.label,
            domain: Domaindata.find(item => item.value === domainvalue)?.label,
            description: description,
            institution_name: instituname,
            course_duration: duration,
            price: price,
            street: street,
            locality: locality,
            city: city,
            state: state,
            pincode: pincode,
          };

          axios
            .put(
              `${Baseurl}/api/education/id/${newdata.item.id}`,
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
              setLoading(false);
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
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log('Token not retrieved');
          ToastAndroid.showWithGravityAndOffset(
            `Please verify mobile number`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      .catch(error => {
        console.error('Error while handling post ad:', error);
      });
  };

  const deleteImage = (index) => {
    const imageToDelete = selectedImages[index];
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  
    const startIndex = imageToDelete.uri.indexOf('public/');
    const extractedPart = imageToDelete.uri.substring(startIndex);
  
    handleGetToken()
      .then((token) => {
        if (token) {
          setLoading(true); 
          axios
            .delete(`${Baseurl}/api/education/image/delete/id/${newdata.item.id}`, {
              data: { images: extractedPart }, 
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('Response of the API:', response);
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            })
            .catch((error) => {
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
              setLoading(false); 
            });
        } else {
          console.log('Token not retrieved');
        }
      })
      .catch((error) => {
        console.error('Error while handling token:', error);
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
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Domain"
                    // searchPlaceholder="Search..."
                    value={domainvalue}
                    onChange={item => {
                      setDomainvalue(item.value);
                    }}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Course Duration (in months)*</Text>
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
                  <Text>Name of Institution*</Text>
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
                      height: 60,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={reg => setDescription(reg)}
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
                  <Text>Price*</Text>
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

export default Editeducationadds;
