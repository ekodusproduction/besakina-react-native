import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card } from 'react-native-paper';
import style from '../../style';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import axios from 'axios';
import { Baseurl } from '../../constant/globalparams';


const FeaturedAds = (props) => {
    const navigation = useNavigation();
    const [wishlist, setWishlist] = useState([]);
    const [data, setData] = useState([]);
    console.log('data----->', data);
    const [createdAtLabel, setCreatedAtLabel] = useState("");
    const [loading, setLoading] = useState(true);


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
        axios.get(`${Baseurl}/api/home/latest`)
            .then(response => {
                console.log('response ---', response.data);
                setData(response.data.data.advertisements);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    };


    useEffect(() => {
        fetchproductApi();
    }, [])


    const getCreatedAtLabel = (createdAt) => {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);

        const diffTime = Math.abs(currentDate - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return "Today";
        } else if (diffDays === 2) {
            return "Yesterday";
        } else if (diffDays <= 7) {
            return `${diffDays} days ago`;
        } else {
            return createdAt;
        }
    };

    return (
        <View>
            <View style={{ marginTop: 10 }}>

                <View style={{ marginTop: 15 }}>
                    <Text style={[style.subtitle, { marginLeft: 10 }]}>Featured Ads</Text>



                    {
                        loading ?
                            <ActivityIndicator size="large" color="#3184b6" style={{ marginTop: 20 }} />
                            :
                            <FlatList
                                data={data}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    let imageurl = `${Baseurl}/api/${item.images[0]}`;
                                     return (
                                        <View style={{ width: 300, padding: 10 }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    item.category == "education" ? navigation.navigate('EducationCategoryDetails', { data: item }) :
                                                        item.category == "property" ? navigation.navigate('PropertyCategoryDetails', { data: item }) :
                                                            item.category == "vehicles" ? navigation.navigate('VehicleCategoryDetails', { data: item }) :
                                                                item.category == "hospitality" ? navigation.navigate('HospitalityCategoryDetails', { data: item }) : null
                                                }
                                                style={{
                                                    borderWidth: 0.5,
                                                    borderTopLeftRadius: 12,
                                                    borderTopRightRadius: 12,
                                                    borderBottomLeftRadius: 12,
                                                    borderBottomRightRadius: 12
                                                }}>
                                                <Image source={{ uri: imageurl }} style={{ height: 130, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 10, left: 10, right: 10 }}>
                                                    <View style={{ backgroundColor: 'white', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                        <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                                        <Text style={{ color: 'white', fontWeight: 'bold', color: '#3184b6', fontSize: 12 }}>Verified</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => handleWishlist(index)} style={{ backgroundColor: "white", paddingHorizontal: 2, paddingVertical: 2, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                                        {isWishlisted(index) ?
                                                            <AntDesign name='heart' style={{ color: '#3184b6', }} size={20} />
                                                            :
                                                            <AntDesign name='hearto' style={{ color: '#3184b6', }} size={20} />}
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ marginTop: 10, marginLeft: 10 }}>
                                                    <Text variant="titleLarge" style={style.subsubtitle}>₹ {item.price}</Text>
                                                    <Text numberOfLines={2} style={{ width: 250 }} variant="bodyMedium">{item.title}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 10, marginHorizontal: 10 }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <SvgXml
                                                            xml={location}
                                                            width="15px"
                                                            height="15px"
                                                            style={{ marginTop: 3, marginRight: 0 }}
                                                        />
                                                        <Text variant="titleLarge">{item.city}</Text>
                                                    </View>
                                                    <Text variant="titleLarge">{getCreatedAtLabel(item.created_at)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                    }

                </View>


            </View>
        </View>
    )
}

export default FeaturedAds