import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ToastAndroid, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from '../../style';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const OtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [animatedloading, setAnimatedLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(true);
    const isfocused = useIsFocused();
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (isfocused) {
            setErrorMessage('');
            setAnimatedLoading(false);
        }
    }, [isfocused]);

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            }
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleNavigation = async () => {
        setAnimatedLoading(true);
        setTimeout(() => {
            navigation.navigate("RootNavigator");
        }, 1000);
    };

    const sendOtp = () => {
        if (!mobile || mobile.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            setIsValidNumber(false);
            return;
        }
        setLoading(true);
        axios.post(`${Baseurl}/api/users/sendotp`, { mobile })
            .then(response => {
                if (response.status !== 200) {
                    console.log('response data--->', response.data);
                }
                if (response.data.success === true) {
                    navigation.navigate("VerifyOtpScreen", { mobile, otp: response.data.data.otp });
                }
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                ToastAndroid.showWithGravityAndOffset(
                    `${error.response.data.message}`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                if (error.response.data.status == false) {
                    setLoading(false);
                    return;
                }
            })
            .finally((err) => {
                setLoading(false);
            });
    };
    return (
        <KeyboardAwareScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            scrollEnabled={false}
            enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
            extraScrollHeight={Platform.OS === 'ios' ? 100 : 0}
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={{ flex: 1 }}>
                <Image source={require('../../../assets/login1.png')}
                    style={{
                        width: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                        objectFit: "contain",
                        height: 450
                    }} />
                <SafeAreaView style={{ backgroundColor: "#3184B6", height: 600, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                    <Text style={[style.subtitle, { color: "white", textAlign: "center" }]}>Enter Your Mobile Number</Text>
                    <Text style={[style.subsubtitle, { color: "white", textAlign: "center" }]}>We will send you the One Time Password (OTP)</Text>
                    <View style={{ marginTop: 50 }}>
                        <TextInput
                            placeholder='Enter here'
                            placeholderTextColor='gray'
                            style={styles.textinput}
                            inputMode="numeric"
                            value={mobile}
                            onChangeText={phone => setMobile(phone)}
                        />
                        <View style={{ display: errorMessage.length == 0 ? 'none' : "flex" }}>
                            {!isValidNumber && (
                                <Text style={{ color: 'red' }}>{errorMessage}</Text>
                            )}
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={sendOtp}
                            style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Send OTP</Text>
                            )}
                        </Button>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        {animatedloading ? (
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <LottieView
                                    source={require('../../../assets/loading.json')}
                                    autoPlay
                                    loop
                                    style={{ height: 60, width: 300 }}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={{
                                    borderRadius: 12,
                                    height: 60,
                                    justifyContent: 'center',
                                    backgroundColor: '',
                                    display: animatedloading == true ? "none" : "flex"
                                }}
                                onPress={handleNavigation}
                                disabled={animatedloading}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Skip</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default OtpScreen;

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
        backgroundColor: 'white',
        borderRadius: 12,
        height: 60,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    invalidInput: {
        borderColor: 'red',
    },
    button: {
        backgroundColor: '#145366',
        borderRadius: 12,
        height: 60,
        justifyContent: 'center'
    }
});
