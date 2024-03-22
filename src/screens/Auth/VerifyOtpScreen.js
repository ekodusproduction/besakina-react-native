import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import style from '../../style'

const VerifyOtpScreen = () => {
    return (
        <View style={{ padding: 20 }}>
            <View>
                <Text
                    style={style.title}

                >We've sent your verification code to +91 7002263884</Text>
            </View>

            <View style={{ marginTop: 50 }}>
                <TextInput
                    placeholder='Enter Code'
                    placeholderTextColor='black'
                    style={style.inputfield}
                    inputMode="numeric"
                />
            </View>

            <View style={{ marginTop: 20 }} >
                <TouchableOpacity
                    // onPress={() => navigation.navigate("VerifyOtpScreen")}
                    style={style.button}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Verify</Text>
                </TouchableOpacity>
            </View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ marginTop: 20 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: 12,
                            height: 60,
                            justifyContent: 'center'
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "black" }}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: 12,
                            height: 60,
                            justifyContent: 'center'
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, }}>1:20 min left</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default VerifyOtpScreen

