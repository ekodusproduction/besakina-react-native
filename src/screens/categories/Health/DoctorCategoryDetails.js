import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../../style';
import { SliderBox } from "react-native-image-slider-box";
import TableView from '../../../components/TableView';
import axios from 'axios';
import { Baseurl } from '../../../constant/globalparams';

const DoctorCategoryDetails = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation();
    const [info, setInfo] = useState(null);
    console.log('info----', info)
    const [createdAtLabel, setCreatedAtLabel] = useState("");
    let imageUrls = info && info?.images && info?.images.length > 0
        ? info?.images.map(url => `${Baseurl}/api/${url.trim()}`)
        : [];

    let image = imageUrls.length > 0 ? imageUrls : [`${Baseurl}/api/${info?.images}`];

    const headers = ['Price per Visit', '', '', `₹${info?.price_per_visit}`];
    const rows = [
        ['Name', '', '', `${info?.name}`],
        ['Expertise', '', '', `${info?.expertise}`],
        ['Experiance', '', '', `${info?.total_experience}years`],
        ['Location', '', '', `${info?.city}`],
    ];


    const fetchproductApibyid = (id) => {
        axios.get(`${Baseurl}/api/doctors/id/${id}`)
            .then(response => {
                console.log('response ---', response.data);
                setInfo(response.data.data.advertisement);
                setCreatedAtLabel(getCreatedAtLabel(response.data.data.advertisement.created_at));
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };


    useEffect(() => {
        fetchproductApibyid(data.id);
    }, []);

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
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} />
                <Appbar.Content title={info?.name} />
                <TouchableOpacity onPress={() => { }} style={{ bottom: 10, marginRight: 5 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
                        <Entypo name="location" size={15} />
                        <Text style={style.subsubtitle}>Guwahati</Text>
                        <AntDesign name="caretdown" size={15} />
                    </View>
                </TouchableOpacity>
            </Appbar.Header>

            <ScrollView style={{ marginBottom: 10 }}>
                <View style={{ padding: 10 }}>
                    <View style={style.sliderContainer}>
                        <SliderBox
                            images={image}
                            dotStyle={{ height: 10, width: 10, borderRadius: 5 }}
                            dotColor="#3184b6"
                            inactiveDotColor="white"
                            imageLoadingColor="white"
                            autoplay={true}
                            circleLoop={true}
                            resizeMode="cover"
                            autoplayInterval={5000}
                            sliderBoxHeight={200}
                            onCurrentImagePressed={index =>
                                console.log(`image ${index} pressed`)
                            }
                            paginationBoxVerticalPadding={20}
                            paginationBoxStyle={{
                                position: "absolute",
                                bottom: 0,
                                padding: 0,
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "center",
                                paddingVertical: 10
                            }}
                        />
                    </View>
                    <View>
                        <View style={{ height: 100, borderWidth: 1, borderColor: "gray", borderRadius: 12, marginTop: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                                <Text style={style.subsubtitle}>$ {info?.price_per_visit}</Text>
                                <AntDesign name="hearto" size={25} />
                            </View>
                            <Text style={{ marginLeft: 10, width: 300 }} numberOfLines={1}>{info?.name}</Text>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10, marginHorizontal: 5 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Entypo name="location" size={15} style={{ marginHorizontal: 5 }} />
                                    <Text variant="titleLarge">{info?.city}</Text>
                                </View>
                                <Text style={style.subsubtitle} variant="bodyMedium">{createdAtLabel}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 12, marginTop: 10 }}>

                            <TableView headers={headers} rows={rows} />


                            <View style={{ alignItems: 'center' }}>
                                <Divider style={{ width: '90%', backgroundColor: 'black' }} />
                            </View>

                            <View style={{ padding: 10 }}>
                                <Text style={[style.subsubtitle, { textDecorationLine: "underline" }]}>Description:</Text>
                                <Text style={[style.subsubtitle, { marginTop: 10, justifyContent: "center", textAlign: "justify" }]}>
                                    {info?.description}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 100, borderWidth: 1, borderColor: "gray", borderRadius: 12, marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={style.subsubtitle}>Seller Details</Text>
                            <View style={{ left: 5, backgroundColor: 'white', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                <Text style={{ color: 'white', fontWeight: 'bold', color: "#3184b6", fontSize: 12 }}>Verified</Text>
                            </View>
                        </View>
                        <Text style={{ marginLeft: 10, width: 300 }} numberOfLines={1}>{info?.user?.fullname == null ? "Not Available" : info?.user?.fullname}</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start", marginTop: 5 }}>
                            <Text style={{ marginLeft: 10 }}>{info?.user?.doc_type == null ? "Not Available" : info?.user?.doc_type} : {info?.user?.doc_number == null ? "Not Available" : info?.user?.doc_number}</Text>
                            <View style={{ height: '100%', width: 1, backgroundColor: 'black', marginHorizontal: 10 }} />
                            <Text>{getCreatedAtLabel(info?.created_at)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginTop: 0 }} >
                <TouchableOpacity
                    style={{
                        backgroundColor: '#f77b0b',
                        borderRadius: 0,
                        height: 60,
                        justifyContent: 'center'
                    }}
                 >
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Contact Seller</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DoctorCategoryDetails;
