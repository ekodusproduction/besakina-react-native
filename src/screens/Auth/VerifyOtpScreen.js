import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Baseurl} from '../../constant/globalparams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';

const VerifyOtpScreen = ({route}) => {
  const navigation = useNavigation();
  const {mobile, otp: receivedOtp} = route.params;

  const [verifyotpvalue, setVerifyOtpvalue] = useState(
    receivedOtp ? receivedOtp.toString() : '',
  );
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [otp, setOtp] = useState(Array(4).fill(''));

  useEffect(() => {
    setVerifyOtpvalue(receivedOtp ? receivedOtp.toString() : '');
    if (receivedOtp) {
      const otpArray = receivedOtp.toString().split('');
      setOtp(otpArray);
    }
  }, [receivedOtp]);

  const handleNavigation = async information => {
    try {
      await AsyncStorage.setItem('UserData', JSON.stringify(information));
      setLoading(true);
      setTimeout(() => {
        navigation.navigate('RootNavigator');
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const postData = {
        mobile: parseInt(mobile),
        otp: parseInt(verifyotpvalue),
      };

      const response = await axios.post(
        `${Baseurl}/api/users/login`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success === true) {
        handleNavigation(response.data.token);
      } else {
        console.log('Verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setVerifyOtpvalue(newOtp.join(''));
  };

  return (
    <View>
      <AntDesign
        onPress={() => navigation.goBack()}
        name="arrowleft"
        style={{marginRight: 5, marginTop: 5, backgroundColor: 'white'}}
        size={30}
        color={'black'}
      />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          source={require('../../../assets/login2.png')}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'contain',
            height: Dimensions.get('screen').height / 3,
            backgroundColor: 'white',
          }}
        />
        <SafeAreaView
          style={{
            backgroundColor: '#3184B6',
            height: Dimensions.get('screen').height,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}>
          <Text
            style={[
              style.subtitle,
              {
                marginTop: 30,
                color: 'white',
                textAlign: 'center',
                justifyContent: 'center',
              },
            ]}>
            We have send verification code to +91 {mobile}
          </Text>
          <View style={{marginTop: 30}}>
            <View style={styles.container}>
              {[0, 1, 2, 3].map(index => (
                <View key={index} style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={text => handleOtpChange(index, text)}
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              onPress={verifyOtp}
              style={[styles.button, {opacity: loading ? 0.5 : 1}]}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: 'white'}}>
                  Verify OTP
                </Text>
              )}
            </Button>
          </View>
          <View style={{marginTop: 10}}>
            {loading ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <LottieView
                  source={require('../../../assets/loading.json')}
                  autoPlay
                  loop
                  style={{height: 60, width: 300}}
                />
              </View>
            ) : (
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
                        color: 'white',
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
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      1:20 min left
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default VerifyOtpScreen;

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
    borderWidth: 1,
    borderColor: 'black',
  },
  invalidInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#145366',
    borderRadius: 12,
    height: 60,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '20%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
  },
});
