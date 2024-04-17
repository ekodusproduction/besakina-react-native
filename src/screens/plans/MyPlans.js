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
    const [wishlist, setWishlist] = useState([]);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(true);
    const [loadingotp, setLoadingotp] = useState(false);
    const [loadingverifyotp, setLoadingverifyotp] = useState(false);
    const [verifyotpvalue, setVerifyOtpvalue] = useState(null);

    const handleWishlist = (id) => {
        const updatedWishlist = [...wishlist];
        const index = updatedWishlist.indexOf(id);
        if (index === -1) {
            updatedWishlist.push(id);
        } else {
            updatedWishlist.splice(index, 1);
        }
        setWishlist(updatedWishlist);
    }

    const isWishlisted = (id) => {
        return wishlist.includes(id);
    }

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
                            // setData(response.data.data.advertisements);
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

            <FlatList
                data={[1, 2, 3]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ padding: 10 }}>
                            <Card onPress={() => navigation.navigate('FeaturedAdsDetails')}>
                                <Image source={{ uri: 'https://picsum.photos/700' }} style={{ height: 130, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 10, left: 10, right: 10 }}>
                                    <View style={{ backgroundColor: 'white', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                        <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                        <Text style={{ color: 'white', fontWeight: 'bold', color: '#3184b6', fontSize: 12 }}>Verified</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleWishlist(index)} style={{ paddingHorizontal: 2, paddingVertical: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                        {isWishlisted(index) ?
                                            <AntDesign name='heart' style={{ color: '#3184b6', marginRight: 5 }} size={20} />
                                            :
                                            <AntDesign name='hearto' style={{ color: '#3184b6', marginRight: 5 }} size={20} />}
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 10, marginLeft: 10 }}>
                                    <Text variant="titleLarge" style={style.subsubtitle}>$ 35,50,900</Text>
                                    <Text numberOfLines={2} style={{ width: 250 }} variant="bodyMedium">Hyundai i20 black color car model</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 10, marginHorizontal: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <SvgXml
                                            xml={location}
                                            width="15px"
                                            height="15px"
                                            style={{ marginTop: 3, marginRight: 0 }}
                                        />
                                        <Text variant="titleLarge">Ganeshguri</Text>
                                    </View>
                                    <Text variant="titleLarge">Today</Text>
                                </View>
                            </Card>
                        </View>
                    )
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