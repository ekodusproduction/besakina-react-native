import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Baseurl } from '../../constant/globalparams';

const AllAds = (props) => {
    const navigation = useNavigation();
    const [wishlist, setWishlist] = useState([]);
    const [data, setData] = useState([]);
    console.log('data----->', data);
    const [createdAtLabel, setCreatedAtLabel] = useState("");


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
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
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
        <View style={{ marginTop: 10 }}>
            <Text style={[style.subtitle, { marginLeft: 10 }]}>All Ads</Text>

            <FlatList
                data={data}
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    let imageurl = `${Baseurl}/api/${item.images[0]}`;
                    console.log('All ads item -----',item)
                    return (
                        <TouchableRipple style={{ flex: 1, margin: 5, width: '50%' }}
                            onPress={() =>
                                item.category == "Education" ? navigation.navigate('EducationCategoryDetails', { data: item }) :
                                    item.category == "property" ? navigation.navigate('PropertyCategoryDetails', { data: item }) :
                                        item.category == "vehicles" ? navigation.navigate('VehicleCategoryDetails', { data: item }) :
                                            item.category == "hospitality" ? navigation.navigate('HospitalityCategoryDetails', { data: item }) : 
                                            item.category == "doctors" ? navigation.navigate('DoctorCategoryDetails', { data: item }) : 
                                            item.category == "hospitals" ? navigation.navigate('HospitalorClinicCategoryDetails', { data: item }) : null
                            }
                        >
                            <Card style={{ borderRadius: 12, }}>
                                <Image
                                    source={{ uri: imageurl }}
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
