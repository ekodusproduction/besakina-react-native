import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
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

const array1 = [FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds, FeaturedAds];

const CategoryDetails = ({ route }) => {
    const data = route.params;
    console.log('data---', data)
    const navigation = useNavigation();
    const image = [
        require('../../../assets/banner1.png'),
        require('../../../assets/banner2.png'),
    ]
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Appbar.Content title={data.item.name} />
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

                <View style={{ marginTop: 15, flex: 1, marginBottom: 50 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                            <View style={{ backgroundColor: '#ddd', paddingHorizontal: 3, paddingVertical: 2, borderRadius: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', color: "#3184b6", fontSize: 12 }}>Featured Ads</Text>
                            </View>
                            <View style={{ left: 5, backgroundColor: 'white', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                <Text style={{ color: 'white', fontWeight: 'bold', color: "#3184b6", fontSize: 12 }}>Verified</Text>
                            </View>
                        </View>
                        <View style={{ right: 5, backgroundColor: '#ddd', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name='filter' style={{ color: '#3184b6', marginRight: 5 }} />
                            <Text style={{ color: 'white', fontWeight: 'bold', color: "#3184b6", fontSize: 12 }}>Budget</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{ padding: 10 }}
                            data={[1]}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ width: '100%', paddingHorizontal: 5, marginBottom: 10 }}>
                                    <AllAds data={item} />
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>



                </View>
            </View>
        </View>
    )
}

export default CategoryDetails;
