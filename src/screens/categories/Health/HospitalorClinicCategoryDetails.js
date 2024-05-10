import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
  ToastAndroid,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../../style';
import {SliderBox} from 'react-native-image-slider-box';
import TableView from '../../../components/TableView';
import axios from 'axios';
import {Baseurl} from '../../../constant/globalparams';
import {SvgXml} from 'react-native-svg';
import {location} from '../../../svg/svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {handleGetToken} from '../../../constant/tokenUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HospitalorClinicCategoryDetails = ({route}) => {
  const {data,edit} = route.params;
  const navigation = useNavigation();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [createdAtLabel, setCreatedAtLabel] = useState('');

  const [loadingotp, setLoadingotp] = useState(false);
  const [loadingverifyotp, setLoadingverifyotp] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [verifyotpvalue, setVerifyOtpvalue] = useState(null);

  const [mobile, setMobile] = useState('');
  const [showNestedModal, setShowNestedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [contactsellerphone, setcontactsellerphone] = useState('');

  let imageUrls =
    info && info?.images && info?.images.length > 0
      ? info?.images.map(url => `${Baseurl}/api/${url.trim()}`)
      : [];

  let image =
    imageUrls.length > 0 ? imageUrls : [`${Baseurl}/api/${info?.images}`];

  const headers = ['Property Type', '', '', `${info?.type}`];
  const rows = [
    ['Name', '', '', `${info?.name}`],
    ['Price per registration', '', '', `₹${info?.price_registration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`],
    ['Location', '', '', `${info?.city}`],
  ];

  const fetchproductApibyid = id => {
    setLoading(true);
    axios
      .get(`${Baseurl}/api/hospitals/id/${id}`)
      .then(response => {
        console.log('response ---', response.data);
        setInfo(response.data.data);
        setCreatedAtLabel(
          getCreatedAtLabel(response.data.data.created_at),
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchproductApibyid(data.id);
  }, []);

  const getCreatedAtLabel = createdAt => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
  
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.abs(currentDate.getMonth() - createdDate.getMonth()) + (12 * (currentDate.getFullYear() - createdDate.getFullYear()));
    const diffYears = Math.abs(currentDate.getFullYear() - createdDate.getFullYear());
  
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
    fetchproductApibyid(data.id);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
          <Appbar.Content title="Hospital or Clinic" />
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

  makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${contactsellerphone}`;
    } else {
      phoneNumber = `telprompt:${contactsellerphone}`;
    }

    Linking.openURL(phoneNumber);
  };

  const handlecontactseller = () => {
    handleGetToken()
      .then(token => {
        if (token) {
          console.log('Token retrieved successfully--->', token);

          axios
            .get(`${Baseurl}/api/users/id/${info.data?.user?.id}`, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            })
            .then(response => {
              console.log('response of the api--->', response);
              setcontactsellerphone(response.data.data?.mobile);
              makeCall();
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
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={info?.title} />
        <TouchableOpacity
          onPress={() => {}}
          style={{bottom: 10, marginRight: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              gap: 5,
            }}>
            <Entypo name="location" size={15} />
            <Text style={style.subsubtitle}>Guwahati</Text>
            <AntDesign name="caretdown" size={15} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={{marginBottom: 10}}>
        <View style={{padding: 10}}>
          <View style={style.sliderContainer}>
            <SliderBox
              images={image}
              dotColor="#3184b6"
              inactiveDotColor="white"
              imageLoadingColor="white"
              autoplay={true}
              circleLoop={true}
              resizeMode="contain"
              autoplayInterval={3000}
            />
          </View>
          <View>
            <View
              style={{
                height: 100,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 12,
                marginTop: 10,
              }}>
                   <Text style={{marginLeft: 10, width: 300, fontWeight:"bold"}} numberOfLines={1}>
                {info?.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                
                <Text>
                  ₹ {info?.price_registration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                {/* <AntDesign name="hearto" size={25} /> */}
              </View>
               

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="location"
                    size={15}
                    style={{marginHorizontal: 5}}
                  />
                  <Text variant="titleLarge">{info?.city}</Text>
                </View>
                <Text style={style.subsubtitle} variant="bodyMedium">
                  {createdAtLabel}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 12,
                marginTop: 10,
              }}>
              <TableView headers={headers} rows={rows} />

              <View style={{alignItems: 'center'}}>
                <Divider style={{width: '90%', backgroundColor: 'black'}} />
              </View>

              <View style={{padding: 10}}>
                <Text
                  style={[
                    style.subsubtitle,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Description:
                </Text>
                <Text
                  style={[
                    style.subsubtitle,
                    {
                      marginTop: 10,
                      justifyContent: 'center',
                      textAlign: 'justify',
                    },
                  ]}>
                  {info?.description}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 120,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 12,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Text style={style.subsubtitle}>Seller Details</Text>
              <View
                style={{
                  left: 5,
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 3,
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
            <Text style={{marginLeft: 10, width: 300}} numberOfLines={1}>
              {info?.user?.fullname == null
                ? 'Not Available'
                : info?.user?.fullname}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{marginLeft: 10}}>
                {info?.user?.doc_type == null
                  ? 'Not Available'
                  : info?.user?.doc_type}{' '}
                :{' '}
                {info?.user?.doc_number == null
                  ? 'Not Available'
                  : info?.user?.doc_number}
              </Text>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 10,
                }}
              />
                <Text>Member Since : {getCreatedAtLabel(info?.created_at)}</Text>
            </View>
            {contactsellerphone && (
              <View style={{marginLeft: 10, marginTop: 5}}>
                <Text>Moble : {contactsellerphone}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {edit == 'edit' ?<View></View>:  
      <View style={{marginTop: 0}}>
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
                      style={{
                        display: errorMessage.length == 0 ? 'none' : 'flex',
                      }}>
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
                      style={[
                        style.button,
                        {opacity: loadingverifyotp ? 0.5 : 1},
                      ]}
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
        <TouchableOpacity
         onPress={handlecontactseller}
          style={{
            backgroundColor: '#f77b0b',
            borderRadius: 0,
            height: 60,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
            Contact Seller
          </Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default HospitalorClinicCategoryDetails;
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
