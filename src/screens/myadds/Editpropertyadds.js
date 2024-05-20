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
import React, {useEffect, useState} from 'react';
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

const Editpropertyadds = item => {
  const navigation = useNavigation();
  const newdata = item.route.params;
  const fetchproductApibyid = id => {
    axios
      .get(`${Baseurl}/api/property/id/${id}`)
      .then(response => {
        console.log('response ---', response);

        setSelectedCategory(
          data.find(item => item.label === response.data.data?.category)
            ?.value || null,
        );
        setSelectedType(
          TypesData.find(item => item.value === response.data.data?.type)?.value || null
        );
        
        setSelectedbedrooms(
          BedroomsData.find(
            item => item === response.data.data?.bedrooms.toString(),
          ) || null,
        );
        setSelectedbathrooms(
          BathroomData.find(
            item => item === response.data.data?.bathrooms.toString(),
          ) || null,
        );
        setFurnishing(
          FurnishingData.find(
            item => item === response.data.data?.furnishing.toString(),
          ) || null,
        );
        setConstructionstatus(
          ConstructionData.find(
            item => item === response.data.data?.construction_status.toString(),
          ) || null,
        );
        setListedby(
          ListedData.find(
            item => item === response.data.data?.listed_by.toString(),
          ) || null,
        );
        setCarparking(
          ParkingData.find(
            item => item === response.data.data?.car_parking.toString(),
          ) || null,
        );

        setBuiltuparea(response.data.data?.super_builtup_area.toString());
        setCarpetarea(response.data.data?.carpet_area.toString());
        setMaintenance(response.data.data?.maintenance.toString());
        setTotalrooms(response.data.data?.total_rooms.toString());
        setFloorno(response.data.data?.floor_no?.toString());

        setAdtitle(response.data.data?.title);
        setDescription(response.data.data?.description);
        setPrice(response.data.data?.price);
        setStreet(response.data.data?.street);
        setCity(response.data.data?.city);
        setstate(response.data.data?.state);
        setPincode(response.data.data?.pincode);
        setLandmark(response.data.data?.landmark);
        setHouseno(response.data.data?.house_no);
        setSelectedImages(
          response.data.data?.images.map(imagePath => ({
            uri: `${imagePath}`,
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const TypesData = [
    {label: 'Apartments', value: 'apartments'},
    {label: 'Builder Floors', value: 'builder_floors'},
    {label: 'Farm Houses', value: 'farm_houses'},
    {label: 'Houses and Villas', value: 'houses_and_villas'},
  ];
  const BedroomsData = ['1', '2', '3', '4', '5'];
  const BathroomData = ['1', '2', '3', '4', '5'];
  const ParkingData = ['0', '1', '2', '3', '4'];
  const FurnishingData = ['Furnished', 'semi-Furnished', 'UnFurnished'];
  const ConstructionData = [
    'New Launch',
    'Ready to move',
    'Under Construction',
  ];
  const ListedData = ['Builder', 'Dealer', 'Owner'];
  const data = [
    {label: 'For Sale: Houses and Apartments', value: '1'},
    {label: 'For Rent: Houses and Apartments', value: '2'},
    {label: 'Lands and Plots', value: '3'},
    {label: 'For Sale: Shops and Offices', value: '4'},
    {label: 'For Rent: Shops and Offices', value: '5'},
    {label: 'PG and Guest Houses', value: '6'},
  ];
  const [selectedType, setSelectedType] = useState(null);
  const [selectedbedrooms, setSelectedbedrooms] = useState(null);
  const [selectedbathrooms, setSelectedbathrooms] = useState(null);
  const [furnishing, setFurnishing] = useState(null);
  const [constructionstatus, setConstructionstatus] = useState(null);
  const [listedby, setListedby] = useState(null);
  const [carparking, setCarparking] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [builtuparea, setBuiltuparea] = useState('');
  const [carpetarea, setCarpetarea] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [totalrooms, setTotalrooms] = useState('');
  const [floorno, setFloorno] = useState('');
  const [projectname, setProjectname] = useState('');
  const [adtitle, setAdtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setPincode] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;
  const [houseno, setHouseno] = useState('');
  const [landmark, setLandmark] = useState('');

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
                `${Baseurl}/api/property/images/id/${newdata.item.id}`,
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
  const handlePostAd = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          console.log('Token retrieved successfully--->', token);
          setLoading(true);

          const requestBody = {
            type: selectedType,
            bedrooms: selectedbedrooms,
            bathrooms: selectedbathrooms,
            carpet_area: carpetarea,
            furnishing: furnishing,
            construction_status: constructionstatus,
            listed_by: listedby,
            super_builtup_area: builtuparea,
            maintenance: maintenance,
            total_rooms: totalrooms,
            floor_no: floorno,
            car_parking: carparking,
            title: adtitle,
            category: data.find(item => item.value === selectedCategory)?.label,
            description: description,
            price: price,
            street: street,
            house_no: houseno,
            landmark: landmark,
            city: city,
            state: state,
            pincode: pincode,
          };

          axios
            .put(`${Baseurl}/api/property/id/${newdata.item.id}`, requestBody, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              console.log('response of the api--->', response);
              navigation.goBack();
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
              `${Baseurl}/api/property/image/delete/id/${newdata.item.id}`,
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
              setLoading(false);
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
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Property" />
      </Appbar.Header>

      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{padding: 10}}>
            <View>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Properties"
                // searchPlaceholder="Search..."
                value={selectedCategory}
                onChange={item => {
                  setSelectedCategory(item.value);
                }}
              />
            </View>

            <View
              style={{
                borderWidth: 0.5,
                height: '1500px',
                marginTop: 10,
                borderRadius: 5,
                borderColor: 'gray',
              }}>
              <View style={{padding: 5}}>
                <Text style={[style.subtitle, {textAlign: 'center'}]}>
                  INCLUDE SOME DETAILS
                </Text>

                <View>
                  <Text>Type*</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {TypesData.map((item, index) => (
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
                            selectedType === item.value
                              ? '#3184b6'
                              : 'transparent',
                        }}
                        onPress={() => setSelectedType(item.value)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color:
                              selectedType === item.value ? 'white' : 'black',
                          }}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Bedrooms</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {BedroomsData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            selectedbedrooms === item
                              ? '#3184b6'
                              : 'transparent',
                        }}
                        onPress={() => setSelectedbedrooms(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color:
                              selectedbedrooms === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Bathrooms</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {BathroomData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            selectedbathrooms === item
                              ? '#3184b6'
                              : 'transparent',
                        }}
                        onPress={() => setSelectedbathrooms(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color:
                              selectedbathrooms === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Furnishing</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {FurnishingData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 100,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            furnishing === item ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setFurnishing(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: furnishing === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Construction Status</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {ConstructionData.map((item, index) => (
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
                            constructionstatus === item
                              ? '#3184b6'
                              : 'transparent',
                        }}
                        onPress={() => setConstructionstatus(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color:
                              constructionstatus === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>Listed By</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {ListedData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 100,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            listedby === item ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setListedby(item)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: listedby === item ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text>
                    Super Builtup area{' '}
                    <Text>
                      (ft
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 22 * 1.1,
                          textAlignVertical: 'top',
                        }}>
                        2
                      </Text>
                      )×
                    </Text>
                  </Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    value={builtuparea}
                    onChangeText={built => setBuiltuparea(built)}
                    inputMode="numeric"
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>
                    Carpet area{' '}
                    <Text>
                      (ft
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 22 * 1.1,
                          textAlignVertical: 'top',
                        }}>
                        2
                      </Text>
                      )×
                    </Text>
                  </Text>
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
                    value={carpetarea}
                    onChangeText={built => setCarpetarea(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Maintenance (Monthly) </Text>
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
                    value={maintenance}
                    onChangeText={built => setMaintenance(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Total Rooms</Text>
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
                    value={totalrooms}
                    onChangeText={built => setTotalrooms(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text> Floors No</Text>
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
                    value={floorno}
                    onChangeText={built => setFloorno(built)}
                  />
                </View>

                <View>
                  <Text>Car Parking</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {ParkingData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: 'row',
                          backgroundColor:
                            carparking === index ? '#3184b6' : 'transparent', // Set background color based on selection
                        }}
                        onPress={() => setCarparking(index)}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: carparking === index ? 'white' : 'black',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                {/* <View style={{ marginTop: 10 }}>
                  <Text>Facing</Text>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    // data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    // placeholder="All Properties"
                    searchPlaceholder="Search..."
                  // value={value}
                  // onChange={item => {
                  //   setValue(item.value);
                  // }}
                  />
                </View> */}
                <View style={{marginTop: 10}}>
                  <Text> Project Name</Text>
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
                    value={projectname}
                    onChangeText={built => setProjectname(built)}
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
                    onChangeText={built => setAdtitle(built)}
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
                  <Text>house no.</Text>
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
                    value={houseno}
                    onChangeText={built => setHouseno(built)}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text>Landmark</Text>
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
                    value={landmark}
                    onChangeText={built => setLandmark(built)}
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
                  <Text>Description*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    multiline={true}
                    numberOfLines={5}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={built => setDescription(built)}
                  />
                  <Text style={{fontSize: 12}}>
                    Include condition,reason and features for selling
                  </Text>
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
                  onChangeText={built => setPrice(built)}
                />
              </View>
            </View>

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
                        <AntDesign name="closecircle" size={20} color="white" />
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

export default Editpropertyadds;
