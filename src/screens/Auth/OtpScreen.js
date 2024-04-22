import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from '../../style';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const OtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [animatedloading, setAnimatedLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(true);

    const handleNavigation = async () => {
        setAnimatedLoading(true);
        setTimeout(() => {
            navigation.navigate("RootNavigator");
        }, 1000);
    };

    const sendOtp = async () => {
        try {
            if (!mobile || mobile.length !== 10) {
                setErrorMessage('Please enter a valid 10-digit mobile number');
                setIsValidNumber(false);
                return;
            }
            setLoading(true);
            const response = await axios.post(`${Baseurl}/api/users/sendotp`, { mobile });

            if (response.status !== 200) {
                console.log('response data--->', response.data)
            }

            if (response.data.success === true) {
                navigation.navigate("VerifyOtpScreen", { mobile, otp: response.data.data.otp });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const isfocused = useIsFocused();

    useEffect(() => {
        if (isfocused == true) {
            setErrorMessage('');
            setAnimatedLoading(false);
        }
    }, [isfocused]);

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "space-between" }}>
            <View>
                <View style={{ marginTop: 100 }}>
                    <Text style={styles.header}>Welcome</Text>
                    <Text style={[styles.header, { marginTop: -10 }]}>back</Text>
                </View>
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

                <View style={{ marginTop: 20 }}>
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
                            <Text style={{ textAlign: 'center', fontSize: 18, color: "black" }}>Skip</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* <Text style={{ textAlign: "center", justifyContent: "flex-end", fontSize: 16 }}>From <Text style={{ color: "#3184b6" }}>Zycell</Text></Text> */}
        </View>
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
        backgroundColor: '#3184b6',
        borderRadius: 12,
        height: 60,
        justifyContent: 'center'
    }
});
