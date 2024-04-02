import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import FeaturedAds from '../FeaturedAds/FeaturedAds';
import AllAds from '../AllAds/AllAds';
import { SliderBox } from "react-native-image-slider-box";
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import RBSheet from 'react-native-raw-bottom-sheet';


const HospitalityCategoryDetails = ({ item }) => {
    console.log('item----', item);
    const image = [
        require('../../../assets/banner1.png'),
        require('../../../assets/banner2.png'),
    ];
    const navigation = useNavigation();
    const refRBSheet = useRef();

    return (
        <View >
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Appbar.Content title='Hospitality' />
                <TouchableOpacity onPress={() => { }} style={{ bottom: 10, marginRight: 5 }} >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        gap: 5,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                    }}>
                        <SvgXml
                            xml={location}
                            width="15px"
                            height="15px"
                        />
                        <Text style={{ fontSize: 14, fontWeight: "500" }}>Guwahati</Text>
                        <AntDesign name="caretdown" size={12} />
                    </View>
                </TouchableOpacity>
            </Appbar.Header>

            <View style={{ padding: 1, flex: 1 }}>
                <View style={style.sliderContainer}>
                    <SliderBox
                        images={image}
                        dotColor="#3184b6"
                        inactiveDotColor="white"
                        imageLoadingColor="white"
                        autoplay={true}
                        circleLoop={true}
                        resizeMode="contain"
                        autoplayInterval={3000}
                    />
                </View>

                <View style={{ marginTop: 15, flex: 1, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                            <View style={{ backgroundColor: '#ddd', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: 90 }}>
                                <Text style={{ color: '#3184b6', fontWeight: 'bold', fontSize: 12, textAlign: "center" }}>Featured Ads</Text>
                            </View>
                            <View style={{ left: 5, backgroundColor: 'white', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: 90 }}>
                                <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                <Text style={{ color: '#3184b6', fontWeight: 'bold', fontSize: 12, textAlign: "center" }}>Verified</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ right: 5, backgroundColor: '#ddd', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, width: 90 }}>
                            <AntDesign name='filter' style={{ color: '#3184b6', marginRight: 5 }} />
                            <Text style={{ color: '#3184b6', fontWeight: 'bold', fontSize: 12, textAlign: "center" }}>Budget</Text>
                        </TouchableOpacity>
                    </View>


                    {/* <View >
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            data={[1]}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ width: '100%', marginBottom: 10 }}>
                                    <AllAds data={item} />
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> */}
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                useNativeDriver={false}
                draggable={true}
                dragOnContent
                height={600}
                closeOnPressMask={true}
                closeOnPressBack={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                }}
                customModalProps={{
                    animationType: 'fade',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={[style.subtitle, { textAlign: "left", }]}>Budget</Text>
                        <Entypo name="cross" size={30} onPress={() => refRBSheet.current.close()} />
                    </View>
                    <View>
                        <Text style={{ textAlign: "left", marginTop: 10 }}>Choose a range below ( <FontAwesome5 name="rupee-sign" size={12} /> )</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder='Min.'
                            placeholderTextColor='black'
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 5,
                                height: 60,
                                paddingLeft: 20,
                                borderWidth: 0.5
                            }}
                            inputMode="numeric"
                        />
                    </View>
                    <View>
                        <Text style={{ textAlign: "center", marginTop: 10 }}>To</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder='Max.'
                            placeholderTextColor='black'
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 5,
                                height: 60,
                                paddingLeft: 20,
                                borderWidth: 0.5
                            }}
                            inputMode="numeric"
                        />
                    </View>
                </View>
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
                    >
                        <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>

        </View>
    )
}

export default HospitalityCategoryDetails