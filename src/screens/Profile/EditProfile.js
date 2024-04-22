import { Image, View, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from '../../style';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Dimensions } from 'react-native';
import { Baseurl } from '../../constant/globalparams';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleGetToken } from '../../constant/tokenUtils';
import { useIsFocused } from '@react-navigation/native';


const EditProfile = () => {
    const navigation = useNavigation();
    const [documentvalue, setDocumentvalue] = useState(null);
    const [loading, setLoading] = useState(false);
    const DocumentData = [
        { label: 'Aadhar Card', value: '1' },
        { label: 'Pan Card', value: '2' },
        { label: 'GSt Number', value: '3' },
    ];
    const [selectedImagesfront, setSelectedImagesfront] = useState([]);
    const [selectedImagesback, setSelectedImagesback] = useState([]);
    const [selectedImagesprofile, setSelectedImagesprofile] = useState([]); console.log('selectedImagesprofile---', selectedImagesprofile)
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [loadingotp, setLoadingotp] = useState(false);
    const [loadingverifyotp, setLoadingverifyotp] = useState(false);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [verifyotpvalue, setVerifyOtpvalue] = useState(null);
    const [city, setCity] = useState("");
    const [state, setstate] = useState("");
    const [pincode, setPincode] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidNumber, setIsValidNumber] = useState(true);
    const [fullname, setFullname] = useState("");
    const [emailid, setEmailid] = useState("");
    const [phone, setPhone] = useState("");
    const [doc_number, serDoc_number] = useState("");
    const [locality, setLocality] = useState("");

    const handleCameraLaunchfront = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.5,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const imageInfo = {
                    uri: response.assets?.[0]?.uri,
                    type: response.assets?.[0]?.type,
                    fileName: response.assets?.[0]?.fileName,
                };
                setSelectedImagesfront([...selectedImagesfront, imageInfo]);
            }
        });
    }
    const handleCameraLaunchback = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.5,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const imageInfo = {
                    uri: response.assets?.[0]?.uri,
                    type: response.assets?.[0]?.type,
                    fileName: response.assets?.[0]?.fileName,
                };
                setSelectedImagesback([...selectedImagesback, imageInfo]);
            }
        });
    }
    const handleprofilepicCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.5,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const imageInfo = {
                    uri: response.assets?.[0]?.uri,
                    type: response.assets?.[0]?.type,
                    fileName: response.assets?.[0]?.fileName,
                };
                setSelectedImagesprofile([...selectedImagesprofile, imageInfo]);
            }
        });
    }

    const handleprofile = () => {
        handleGetToken()
            .then((token) => {
                if (token) {
                    console.log('Token retrieved successfully--->', token);
                    setLoading(true);

                    const formData = new FormData();
                    const documentvalueType = DocumentData.filter(item => item.value === documentvalue).map(i => i.label).toString();
                    formData.append("fullname", fullname);
                    formData.append("alternate_mobile", phone);
                    formData.append("email", emailid);
                    formData.append("doc_number", doc_number);
                    formData.append("doc_type", documentvalueType);

                    selectedImagesfront.forEach((image, index) => {
                        formData.append(`doc_file`, {
                            uri: image.uri,
                            type: image.type,
                            name: image.fileName,
                        });
                    });
                    selectedImagesback.forEach((image, index) => {
                        formData.append(`doc_file_back`, {
                            uri: image.uri,
                            type: image.type,
                            name: image.fileName,
                        });
                    });
                    selectedImagesprofile.forEach((image, index) => {
                        formData.append(`profile_pic`, {
                            uri: image.uri,
                            type: image.type,
                            name: image.fileName,
                        });
                    });

                    formData.append("locality", locality);
                    formData.append("city", city);
                    formData.append("state", state);
                    formData.append("pincode", pincode);
                    formData.append("about", pincode);

                    console.log('formData===', formData);
                    axios.post(`${Baseurl}/api/users/details`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then((response) => {
                            console.log("response of the api--->", response);
                            ToastAndroid.showWithGravityAndOffset(
                                `${response.data.message}`,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                            setShowTokenModal(false);
                        })
                        .catch((error) => {
                            console.error('Catch Error :---->', error.response);
                            console.log("error message--->", error.response.data.message)
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    console.log('Token not retrieved');
                    setShowTokenModal(true);
                }
            })
            .catch((error) => {
                console.error('Error while handling post ad:', error);
            });
    };

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

    const isfocused = useIsFocused();

    useEffect(() => {
        if (isfocused == true) {
            setErrorMessage('');
        }
    }, [isfocused]);

    return (
        <View style={{ flex: 1, }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Appbar.Content title="" />
            </Appbar.Header>

            <ScrollView style={{ flex: 1, }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
                    <View style={{ padding: 10 }}>


                        <View style={{ borderWidth: 0.5, marginTop: 10, borderRadius: 5, borderColor: "gray" }}>
                            <View style={{ padding: 5 }}>

                                <TouchableOpacity onPress={handleprofilepicCameraLaunch} style={{ justifyContent: "center", alignItems: "center", borderRadius: 5 }}>

                                    {selectedImagesprofile.length > 0 ? (
                                        <Image
                                            source={{ uri: selectedImagesprofile[0].uri }}
                                            style={{ height: 100, width: 100, borderRadius: 50, borderColor: "gray", borderWidth: 0.5 }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Image
                                            source={{ uri: 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg' }}
                                            style={{ height: 100, width: 100, borderRadius: 50, borderColor: "gray", borderWidth: 0.5 }}
                                        />
                                    )}


                                    <View style={{ position: 'absolute', bottom: 5, right: 150, }}>
                                        <FontAwesome name="camera" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: 10 }}>
                                    <Text>
                                        Full Name
                                    </Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        // inputMode="numeric"
                                        value={fullname}
                                        onChangeText={(name) => setFullname(name)}

                                    />
                                </View>


                                <View style={{ marginTop: 10 }}>
                                    <Text>Email ID</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        inputMode="email"
                                        value={emailid}
                                        onChangeText={(name) => setEmailid(name)}

                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Alternate Mobile</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            paddingLeft: 20,
                                            borderWidth: 0.5,
                                            height: 60,
                                        }}
                                        inputMode="numeric"
                                        value={phone}
                                        onChangeText={(name) => setPhone(name)}

                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>State</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        // inputMode="numeric"
                                        value={state}
                                        onChangeText={built => setstate(built)}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>City</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        // inputMode="numeric"
                                        value={city}
                                        onChangeText={built => setCity(built)}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Locality</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        // inputMode="numeric"
                                        value={locality}
                                        onChangeText={built => setLocality(built)}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Zip Code</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        inputMode="numeric"
                                        value={pincode}
                                        onChangeText={built => setPincode(built)}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Dropdown
                                        style={style.dropdown}
                                        placeholderStyle={style.placeholderStyle}
                                        selectedTextStyle={style.selectedTextStyle}
                                        inputSearchStyle={style.inputSearchStyle}
                                        iconStyle={style.iconStyle}
                                        data={DocumentData}
                                        // search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Select Documents"
                                        // searchPlaceholder="Search..."
                                        value={documentvalue}
                                        onChange={item => {
                                            setDocumentvalue(item.value);
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text>Adhar/Gst/Pan</Text>
                                    <TextInput
                                        placeholderTextColor='black'
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: 5,
                                            height: 60,
                                            paddingLeft: 20,
                                            borderWidth: 0.5
                                        }}
                                        // inputMode="numeric"
                                        value={doc_number}
                                        onChangeText={(reg) => serDoc_number(reg)}

                                    />
                                </View>

                            </View>
                        </View>



                        <View style={{ borderWidth: 0.5, borderColor: "gray", padding: 10, borderRadius: 5, marginTop: 10 }}>
                            <View style={{ padding: 0 }}>
                                <Text style={style.subsubtitle}>Upload Documents</Text>
                                {documentvalue == 1 ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <FlatList
                                            data={[...Array(1).keys()]}
                                            vertical
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={handleCameraLaunchfront}
                                                    style={{
                                                        height: (screenHeight - 20) / 4.7,
                                                        width: (screenWidth - 20) / 2.2,
                                                        borderRadius: 5,
                                                        backgroundColor: 'white',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginHorizontal: 5,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        elevation: 5,
                                                        shadowColor: '#000',
                                                        shadowOpacity: 0.3,
                                                        shadowRadius: 5,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 2,
                                                        },
                                                    }}
                                                >
                                                    {selectedImagesfront[item] ? (
                                                        <Image
                                                            source={{ uri: typeof selectedImagesfront[item] === 'string' ? selectedImagesfront[item] : selectedImagesfront[item].uri }}
                                                            style={{ height: '100%', width: '100%' }}
                                                            resizeMode="cover"
                                                        />
                                                    ) : (
                                                        <AntDesign name="upload" size={50} />
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />

                                        <FlatList
                                            data={[...Array(1).keys()]}
                                            vertical
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={handleCameraLaunchback}
                                                    style={{
                                                        height: (screenHeight - 20) / 4.7,
                                                        width: (screenWidth - 20) / 2.2,
                                                        borderRadius: 5,
                                                        backgroundColor: 'white',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginHorizontal: 5,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        elevation: 5,
                                                        shadowColor: '#000',
                                                        shadowOpacity: 0.3,
                                                        shadowRadius: 5,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 2,
                                                        },
                                                    }}
                                                >
                                                    {selectedImagesback[item] ? (
                                                        <Image
                                                            source={{ uri: typeof selectedImagesback[item] === 'string' ? selectedImagesback[item] : selectedImagesback[item].uri }}
                                                            style={{ height: '100%', width: '100%' }}
                                                            resizeMode="cover"
                                                        />
                                                    ) : (
                                                        <AntDesign name="upload" size={50} />
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                    : <FlatList
                                        data={[...Array(1).keys()]}
                                        vertical
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={handleCameraLaunchfront}
                                                style={{
                                                    height: (screenHeight - 20) / 4.7,
                                                    width: (screenWidth - 20) / 2.2,
                                                    borderRadius: 5,
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginHorizontal: 5,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    elevation: 5,
                                                    shadowColor: '#000',
                                                    shadowOpacity: 0.3,
                                                    shadowRadius: 5,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                }}
                                            >
                                                {selectedImagesfront[item] ? (
                                                    <Image
                                                        source={{ uri: typeof selectedImagesfront[item] === 'string' ? selectedImagesfront[item] : selectedImagesfront[item].uri }}
                                                        style={{ height: '100%', width: '100%' }}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <AntDesign name="upload" size={50} />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                }
                            </View>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

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

            <View style={{ marginTop: 0 }} >
                <TouchableOpacity
                    style={{
                        backgroundColor: style.button.backgroundColor,
                        borderRadius: 0,
                        height: 60,
                        justifyContent: 'center',
                        borderColor: "gray",
                        borderWidth: 0.5
                    }}
                    onPress={handleprofile}
                    disabled={loading ? true : false}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>
                            Save
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile;
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
        paddingLeft: 20
    },
    button: {
        backgroundColor: '#3184b6',
        borderRadius: 12,
        height: 60,
        justifyContent: 'center'
    }
});
