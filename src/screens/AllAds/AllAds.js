import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import { useNavigation } from '@react-navigation/native';

const AllAds = (props) => {
    const navigation = useNavigation();
    const [wishlist, setWishlist] = useState([]);
    const [data,setData]=useState(null);

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

    const fetchproductApi = () => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(response=>setData(response));
    }
    useEffect(() => {
        fetchproductApi();
    }, [])
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={[style.subtitle, { marginLeft: 10 }]}>All Ads</Text>

            <FlatList
                data={data?.products}
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableRipple style={{ flex: 1, margin: 5, width: '50%' }} onPress={() => navigation.navigate('AllAdsDetails')}>
                            <Card style={{ borderRadius: 12, }}>
                                <Image
                                    source={{ uri: `${item.images[0]}` }}
                                    style={{ height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                />
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
                                    <Text style={style.subsubtitle}>$ {item.price}</Text>
                                    <Text numberOfLines={1} style={{ width: 150 }}>{item.title}</Text>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10, marginHorizontal: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <SvgXml
                                            xml={location}
                                            width="15px"
                                            height="15px"
                                            style={{ marginTop: 3, marginRight: 5 }}
                                        />
                                        <Text>Ganeshguri</Text>
                                    </View>
                                    <Text>Today</Text>
                                </View>
                            </Card>
                        </TouchableRipple>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default AllAds;
