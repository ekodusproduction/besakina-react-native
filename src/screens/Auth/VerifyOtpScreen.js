import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import style from '../../style';
import { useNavigation } from '@react-navigation/native';
import { Baseurl } from '../../constant/globalparams';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtpScreen = ({ route }) => {
    const navigation = useNavigation();
    const { mobile, otp } = route.params;

    const [verifyotpvalue, setVerifyOtpvalue] = useState(otp.toString());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('otp----', otp);
        setVerifyOtpvalue(otp.toString());
    }, [otp]);

    const handleNavigation = async (information) => {
        try {
            await AsyncStorage.setItem("UserData", JSON.stringify(information));
            navigation.navigate("RootNavigator");
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

            const response = await axios.post(`${Baseurl}/api/users/login`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

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

    return (
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
                    onChangeText={setVerifyOtpvalue}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    onPress={verifyOtp}
                    style={[style.button, { opacity: loading ? 0.5 : 1 }]}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
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
    );
};

export default VerifyOtpScreen;
