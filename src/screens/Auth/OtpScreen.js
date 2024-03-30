import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import style from '../../style';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';

const OtpScreen = ({ route }) => {
    const { PropertyScreen } = route.params;

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState('');
    const [data, setData] = useState(null);
    const [otp, setOtp] = useState(null);
    console.log('data===>', data);
    console.log('otp===>', otp);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigation = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (PropertyScreen) {
                navigation.navigate("Property");
            } else {
                navigation.navigate("RootNavigator");
            }
            setIsLoading(false);
        }, 1000);
    };

    const sendOtp = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${Baseurl}api/users/sendotp`, { mobile });

            if (response.status !== 200) {
                console.log('response data--->', response.data)
            }

            setData(response.data);
            if (response.data.success === true) {
                if (PropertyScreen) {
                    navigation.navigate("VerifyOtpScreen", { mobile, PropertyScreen });
                } else {
                    navigation.navigate("VerifyOtpScreen", { mobile });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
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
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    onPress={sendOtp}
                    style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Send OTP</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        borderRadius: 12,
                        height: 60,
                        justifyContent: 'center',
                        backgroundColor: isLoading ? '' : ''
                    }}
                    onPress={handleNavigation}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="medium" color="black" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black" }}>Skip</Text>
                    )}
                </TouchableOpacity>
            </View>
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
