import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, Card } from 'react-native-paper';
import style from '../../style';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';


const FeaturedAds = (props) => {
    const navigation = useNavigation();
    const [wishlist, setWishlist] = useState([]);

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
    return (
        <View>
            <View style={{ marginTop: 10 }}>

                <View style={{ marginTop: 15 }}>
                    <Text style={[style.subtitle, { marginLeft: 10 }]}>Featured Ads</Text>

                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: 300, padding: 10 }}>
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

                </View>


            </View>
        </View>
    )
}

export default FeaturedAds