import { Image, View, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Dimensions } from 'react-native';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleGetToken } from '../../constant/tokenUtils';


const Education = () => {
  const navigation = useNavigation();
  const [coursevalue, setCoursevalue] = useState(null);
  const [domainvalue, setDomainvalue] = useState(null);
  const [loading, setLoading] = useState(false);
  const Coursedata = [
    { label: 'Select Course Type', value: '1' },
    { label: 'Graduation', value: '2' },
    { label: 'Diploma', value: '3' },
    { label: 'Certification', value: '4' },
  ];
  const Domaindata = [
    { label: 'Select Domain', value: '1' },
    { label: 'Science', value: '2' },
    { label: 'Arts', value: '3' },
    { label: 'Commerce', value: '4' },
    { label: 'Computer Science', value: '5' },
    { label: 'Cooking', value: '6' },
    { label: 'Electronics', value: '7' },
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
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setPincode] = useState("");

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

          const courseType = Coursedata.filter(item => item.value === coursevalue).map(i => i.label).toString();
          const domainType = Domaindata.filter(item => item.value === domainvalue).map(i => i.label).toString();
 
          formData.append("type", courseType);
          formData.append("domain", domainType);
          formData.append("institution_name", instituname);
          formData.append("course_duration", duration);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);

          selectedImages.forEach((image, index) => {
            formData.append(`images[${index}]`, {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
          });

          formData.append("street", street);
          formData.append("locality", locality);
          formData.append("city", city);
          formData.append("state", state);
          formData.append("pincode", pincode);

          console.log('formData===', formData);
          axios.post(`${Baseurl}/api/education/add`, formData, {
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

  const closeModal = () => {
    setShowTokenModal(false);
    setShowNestedModal(false);
    setLoadingotp(false)
    setLoadingverifyotp(false)
  };

  const [mobile, setMobile] = useState('');
  const [data, setData] = useState(null);
  const [showNestedModal, setShowNestedModal] = useState(false);


  const sendOtp = async () => {
    try {
      setLoadingotp(true);
      const response = await axios.post(`${Baseurl}/api/users/sendotp`, { mobile });

      if (response.status !== 200) {
        console.log('response data--->', response.data)
      }

      setData(response.data);
      if (response.data.success === true) {
        let newotp=response.data.data.otp
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

      const response = await axios.post(`${Baseurl}/api/users/login`, postData, {
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
        <Appbar.Content title="Education" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
          <View style={{ padding: 10 }}>


            <View style={{ borderWidth: 0.5, height: '1500px', marginTop: 10, borderRadius: 5, borderColor: "gray" }}>
              <View style={{ padding: 5 }}>
                <View style={{ marginTop: 15 }}>
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

                <View style={{ marginTop: 15 }}>
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

                <View style={{ marginTop: 10 }}>
                  <Text>
                    Course Duration*
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
                    value={duration}
                    onChangeText={(reg) => setDuration(reg)}

                  />
                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>Name of Institution*</Text>
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
                    value={instituname}
                    onChangeText={(reg) => setInstituname(reg)}

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
                    value={title}
                    onChangeText={(reg) => setTitle(reg)}

                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Describe about the course</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                      height: 60,
                    }}
                    // inputMode="numeric"
                    value={description}
                    onChangeText={(reg) => setDescription(reg)}

                  />
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
                  <Text>Locality</Text>
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
                    value={locality}
                    onChangeText={built => setLocality(built)}
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
                  <Text>Price*</Text>
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
                    value={price}
                    onChangeText={(reg) => setPrice(reg)}

                  />
                </View>

              </View>
            </View>



            <View style={{ borderWidth: 0.5, borderColor: "gray", padding: 10, borderRadius: 5, marginTop: 10 }}>
              <View style={{ padding: 0 }}>
                <Text style={style.subsubtitle}>UPLOAD UPTO 20 PHOTOS</Text>
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
            </View>

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
                  // placeholder='Enter Code'
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

      <View style={{ marginTop: 0 }} >
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

export default Education;
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
