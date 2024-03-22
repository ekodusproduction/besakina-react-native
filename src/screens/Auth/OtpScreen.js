import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import style from '../../style'

const OtpScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 20 }}>
            <View style={{ marginTop: 100, }}>
                <Text style={{
                    marginBottom: -10, fontSize: 36 * 1.33,
                    marginTop: 0,
                    fontWeight: "600",
                    color: "black"
                }}>Welcome</Text>
                <Text style={{
                    fontSize: 36 * 1.33,
                    marginTop: 0,
                    fontWeight: "600",
                    color: "black"
                }}>back</Text>
            </View>
            <View style={{ marginTop: 25 }}>
                <Text style={style.title}>Enter Mobile Number</Text>
            </View>
            <View style={{ marginTop: 20 }} >
                <TextInput
                    placeholder='Enter here'
                    placeholderTextColor='black'
                    style={style.inputfield}
                    inputMode="numeric"
                />
            </View>

            <View style={{ marginTop: 20 }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate("VerifyOtpScreen")}
                    style={styles.button}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Send OTP</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }} >
                <TouchableOpacity
                    style={{
                        borderRadius: 12,
                        height: 60,
                        justifyContent: 'center'
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "black" }}>Skip</Text>
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
})