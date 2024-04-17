import { Image, View, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, Card } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import { handleGetToken } from '../../constant/tokenUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPlans = (props) => {
    const navigation = useNavigation();
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(true);
    const [loadingotp, setLoadingotp] = useState(false);
    const [loadingverifyotp, setLoadingverifyotp] = useState(false);
    const [verifyotpvalue, setVerifyOtpvalue] = useState(null);


    const fetchmyplansApi = () => {
        handleGetToken()
            .then((token) => {
                if (token) {
                    axios.get(`${Baseurl}/api/plans`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then(response => {
                            console.log('response ---', response.data.data.plans);
                            setData(response.data.data?.plans);
                        })
                        .catch(error => {
                            console.error('Error fetching data: ', error);
                        });
                } else {
                    console.log('Token not retrieved');
                    setShowTokenModal(true);
                }
            })
    }

    useEffect(() => {
        fetchmyplansApi();
    }, [])

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
            if (!mobile || mobile.length !== 10) {
                setErrorMessage('Please enter a valid 10-digit mobile number');
                setIsValidNumber(false);
                return;
            }
            setLoadingotp(true);
            const response = await axios.post(`${Baseurl}/api/users/sendotp`, { mobile });

            if (response.status !== 200) {
                console.log('response data--->', response.data)
            }

            setData(response.data);
            if (response.data.success === true) {
                let newotp = response.data.data.otp
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
                <Appbar.Content title="My Price List" />
            </Appbar.Header>

            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Text style={[style.subsubtitle, { color: "red", marginTop: 20 }]}>Our Pricing</Text>
                <Text style={[style.subtitle, { marginTop: 5 }]}>Choose Your Package</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    console.log('item---',item)
                    return (
                        <View style={styles.planCard}>
                            <View style={styles.planContent}>
                                <Text style={styles.planPrice}>${item.price}</Text>
                                <Text style={styles.planTitle}>{item.type}</Text>
                                <View style={styles.featureList}>
                                    <Text style={styles.feature}>Feature 1</Text>
                                    <Text style={styles.feature}>Feature 2</Text>
                                    <Text style={styles.feature}>Feature 3</Text>
                                </View>
                                <TouchableOpacity style={styles.selectButton}>
                                    <Text style={styles.selectButtonText}>Select Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />


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
                                <View style={{ display: errorMessage.length == 0 ? 'none' : "flex" }}>
                                    {!isValidNumber && (
                                        <Text style={{ color: 'red' }}>{errorMessage}</Text>
                                    )}
                                </View>
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

        </View>
    )
}

export default MyPlans;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    planCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 20,
        marginTop: 10
    },
    planContent: {
        padding: 20,
    },
    planTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    planPrice: {
        fontSize: 18,
        color: '',
        marginBottom: 20,
        textAlign: 'center',
    },
    featureList: {
        marginBottom: 20,
    },
    feature: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    selectButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 10,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});
