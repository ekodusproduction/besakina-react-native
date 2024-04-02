import { Image, View, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Dimensions } from 'react-native';
import { handleGetToken } from '../../constant/tokenUtils';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Property = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log('selectedCategory----',selectedCategory)
  const [loading, setLoading] = useState(false);
  const TypesData = ['Apartments', 'Builders Floors', 'Farm Houses', 'Houses and Villas'];
  const BedroomsData = ['1', '2', '3', '4', '4+'];
  const BathroomData = ['1', '2', '3', '4', '4+'];
  const ParkingData = ['0', '1', '2', '3', '3+'];
  const FurnishingData = ['Furnished', 'semi-Furnished', 'UnFurnished'];
  const ConstructionData = ['New Launch', 'Ready to move', 'Under Construction'];
  const ListedData = ['Builder', 'Dealer', 'Owner'];
  const data = [
    { label: 'All Properties', value: '1' },
    { label: 'For Sale: Houses and Apartments', value: '2' },
    { label: 'For Rent: Houses and Apartments', value: '3' },
    { label: 'Lands and Plots', value: '4' },
    { label: 'For Sale: Shops and Offices', value: '5' },
    { label: 'For Rent: Shops and Offices', value: '6' },
    { label: 'PG and Guest Houses', value: '7' },
  ];
   const [selectedType, setSelectedType] = useState(null);
  const [selectedbedrooms, setSelectedbedrooms] = useState(null);
  const [selectedbathrooms, setSelectedbathrooms] = useState(null);
  const [furnishing, setFurnishing] = useState(null);
  const [constructionstatus, setConstructionstatus] = useState(null);
  const [listedby, setListedby] = useState(null);
  const [carparking, setCarparking] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [builtuparea, setBuiltuparea] = useState("");
  const [carpetarea, setCarpetarea] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [totalrooms, setTotalrooms] = useState("");
  const [floorno, setFloorno] = useState("");
  const [projectname, setProjectname] = useState("");
  const [adtitle, setAdtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setPincode] = useState("");
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;


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
  }

  const handlePostAd = () => {
    handleGetToken()
      .then((token) => {
        if (token) {
          console.log('Token retrieved successfully--->', token);
          setLoading(true);

          const formData = new FormData();

          // formData.append("plan_id", "1");
          formData.append("title", adtitle);
          formData.append("type", selectedType);
          formData.append("bedrooms", selectedbedrooms);
          formData.append("bathrooms", selectedbathrooms);
          formData.append("furnishing", furnishing);
          formData.append("construction_status", constructionstatus);
          formData.append("listed_by", listedby);
          formData.append("super_builtup_area", builtuparea);
          formData.append("carpet_area", carpetarea);
          formData.append("maintenance", maintenance);
          formData.append("total_rooms", totalrooms);
          formData.append("floor_no", floorno);
          formData.append("car_parking", carparking);
          formData.append("price", price);
          selectedImages.forEach((image, index) => {
            formData.append(`images[${index}]`, {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
          });

          const category = data.filter(item => item.value === selectedCategory).map(i => i.label).toString();
          formData.append("category", category);
          formData.append("Street", street);
          formData.append("address", address);
          formData.append("city",city);
          formData.append("state", state);
          formData.append("pincode", pincode);

          axios.post(`${Baseurl}api/property`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            }
          })
            .then((response) => {
              console.log("response of the api--->", response);
              ToastAndroid.showWithGravityAndOffset(
                `${response.data.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              setShowTokenModal(false);

            })
            .catch((error) => {
              console.error('Catch Error :---->', error.response);
              console.log("error message--->", error.response.data.message)
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
      .catch((error) => {
        console.error('Error while handling post ad:', error);
      });
  };


  const [loadingotp, setLoadingotp] = useState(false);
  const [loadingverifyotp, setLoadingverifyotp] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [verifyotpvalue, setVerifyOtpvalue] = useState(null);
  const [sss, setData] = useState(null);

  const closeModal = () => {
    setShowTokenModal(false);
    setShowNestedModal(false);
    setLoadingotp(false)
    setLoadingverifyotp(false)
  };

  const [mobile, setMobile] = useState('');
  const [showNestedModal, setShowNestedModal] = useState(false);
  const sendOtp = async () => {
    try {
      setLoadingotp(true);
      const response = await axios.post(`${Baseurl}api/users/sendotp`, { mobile });

      if (response.status !== 200) {
        console.log('response data--->', response.data)
      }

      setData(response.data);
      if (response.data.success === true) {
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
    setLoadingotp(false)
    setLoadingverifyotp(false)
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

      const response = await axios.post(`${Baseurl}api/users/login`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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


  const handleNavigation = async (information) => {
    console.log('information--->', information);
    try {
      await AsyncStorage.setItem("UserData", JSON.stringify(information));
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
  return (
    <View style={{ flex: 1, }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Property" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
          <View style={{ padding: 10 }}>
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

            <View style={{ borderWidth: 0.5, height: '1500px', marginTop: 10, borderRadius: 5, borderColor: "gray" }}>
              <View style={{ padding: 5 }}>
                <Text style={[style.subtitle, { textAlign: "center" }]}>INCLUDE SOME DETAILS</Text>


                <View>
                  <Text>Type*</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: selectedType === item ? '#3184b6' : 'transparent' // Set background color based on selection
                        }}
                        onPress={() => setSelectedType(item)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedType === item ? 'white' : 'black' }}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Bedrooms</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: selectedbedrooms === item ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setSelectedbedrooms(item)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedbedrooms === item ? 'white' : 'black' }}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Bathrooms</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: selectedbathrooms === item ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setSelectedbathrooms(item)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedbathrooms === item ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>Furnishing</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: furnishing === item ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setFurnishing(item)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: furnishing === item ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>Construction Status</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: constructionstatus === item ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setConstructionstatus(item)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: constructionstatus === item ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Listed By</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: listedby === item ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setListedby(item)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: listedby === item ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>
                    Super Builtup area <Text>(ft<Text style={{ fontSize: 10, lineHeight: 22 * 1.1, textAlignVertical: 'top' }}>2</Text>)×</Text>
                  </Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    value={builtuparea}
                    onChangeText={built => setBuiltuparea(built)}
                    inputMode="numeric"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Carpet area <Text>(ft<Text style={{ fontSize: 10, lineHeight: 22 * 1.1, textAlignVertical: 'top' }}>2</Text>)×</Text>
                  </Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    inputMode="numeric"
                    value={carpetarea}
                    onChangeText={built => setCarpetarea(built)}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Maintenance (Monthly) </Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    inputMode="numeric"
                    value={maintenance}
                    onChangeText={built => setMaintenance(built)}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Total Rooms</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    inputMode="numeric"
                    value={totalrooms}
                    onChangeText={built => setTotalrooms(built)}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text> Floors No</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    inputMode="numeric"
                    value={floorno}
                    onChangeText={built => setFloorno(built)}
                  />
                </View>


                <View>
                  <Text>Car Parking</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                          flexDirection: "row",
                          backgroundColor: carparking === index ? '#3184b6' : 'transparent' // Set background color based on selection
                        }}
                        onPress={() => setCarparking(index)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: carparking === index ? 'white' : 'black' }}>{item}</Text>
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
                <View style={{ marginTop: 10 }}>
                  <Text> Project Name</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={projectname}
                    onChangeText={built => setProjectname(built)}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Ad Title*</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={adtitle}
                    onChangeText={built => setAdtitle(built)}
                  />
                  <Text style={{ fontSize: 12 }}>Mention the key features of your item (<Text>E.g brand,model,age,type</Text>)</Text>
                </View>
               
                <View style={{ marginTop: 10 }}>
                  <Text>Street</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={street}
                    onChangeText={built => setStreet(built)}
                  />
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Address</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={address}
                    onChangeText={built => setAddress(built)}
                  />
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text>City</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={city}
                    onChangeText={built => setCity(built)}
                  />
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text>State</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={state}
                    onChangeText={built => setstate(built)}
                  />
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Pincode</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    inputMode="numeric"
                    value={pincode}
                    onChangeText={built => setPincode(built)}
                  />
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Description*</Text>
                  <TextInput
                    placeholderTextColor='black'
                    multiline={true}
                    numberOfLines={5}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={built => setDescription(built)}
                  />
                  <Text style={{ fontSize: 12 }}>Include condition,reason and features for selling</Text>
                </View>
              </View>
            </View>

            <View style={{ borderWidth: 0.5, borderColor: "gray", height: 120, padding: 10, borderRadius: 5, marginTop: 10 }}>
              <View style={{ padding: 0 }}>
                <Text style={style.subsubtitle}>SET A PRICE</Text>
                <TextInput
                  placeholderTextColor='black'
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 60,
                    paddingLeft: 20,
                    borderWidth: 0.5,
                    marginTop: 10
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
              renderItem={({ item }) => (
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
                  }}
                >
                  {selectedImages[item] ? (
                    <Image
                      source={{ uri: typeof selectedImages[item] === 'string' ? selectedImages[item] : selectedImages[item].uri }}
                      style={{ height: '100%', width: '100%' }}
                      resizeMode="cover"
                    />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showTokenModal}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 10, width: '100%', height: '100%' }}>

            <TouchableOpacity
              onPress={closeModal}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <AntDesign name="close" size={30} />
            </TouchableOpacity>

            <View style={{ padding: 10 }}>
              {/* <View style={{ marginTop: 10 }}>
                <Text style={styles.header}>Welcome</Text>
                <Text style={[styles.header, { marginTop: -10 }]}>back</Text>
              </View> */}
              <View style={{ marginTop: 25 }}>
                <Text style={style.title}>Enter Mobile Number</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <TextInput
                  placeholder='Enter here'
                  placeholderTextColor='black'
                  style={styles.textinput}
                  inputMode="numeric"
                  value={mobile}
                  onChangeText={phone => setMobile(phone)}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={sendOtp}
                  style={[styles.button, { opacity: loadingotp ? 0.5 : 1 }]}
                  disabled={loadingotp}>
                  {loadingotp ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Send OTP</Text>
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
        onRequestClose={closeNestedModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 10, width: '100%', height: '100%' }}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <AntDesign name="close" size={30} />
            </TouchableOpacity>

            <View style={{ padding: 20 }}>
              <View>
                <Text style={style.title}>
                  We've sent your verification code to +91 {mobile}
                </Text>
              </View>

              <View style={{ marginTop: 50 }}>
                <TextInput
                  placeholder='Enter Code'
                  placeholderTextColor='black'
                  style={style.inputfield}
                  inputMode='numeric'
                  value={verifyotpvalue}
                  onChangeText={verifyotp => setVerifyOtpvalue(verifyotp)}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={verifyOtp}
                  style={[style.button, { opacity: loadingverifyotp ? 0.5 : 1 }]}
                  disabled={loadingverifyotp}>
                  {loadingverifyotp ? (
                    <ActivityIndicator size="small" color="black" />
                  ) : (
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Verify Otp</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 12,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 12,
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>
                      1:20 min left
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>


      <View style={{ marginTop: 0 }}>
        <TouchableOpacity
          style={{
            backgroundColor: style.button.backgroundColor,
            borderRadius: 0,
            height: 60,
            justifyContent: 'center',
            borderColor: "gray",
            borderWidth: 0.5
          }}
          onPress={handlePostAd}
          disabled={loading ? true : false}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>
              Post My Ad
            </Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Property;
const styles = StyleSheet.create({
  header: {
    fontSize: 36 * 1.33,
    marginTop: 0,
    fontWeight: "600",
    color: "black"
  },
  title: {
    fontSize: 16 * 1.33,
    fontWeight: "300",
    color: "black"
  },
  textinput: {
    backgroundColor: 'lightgray',
    borderRadius: 12,
    height: 60,
    paddingLeft: 20
  },
  button: {
    backgroundColor: '#3184b6',
    borderRadius: 12,
    height: 60,
    justifyContent: 'center'
  }
});
