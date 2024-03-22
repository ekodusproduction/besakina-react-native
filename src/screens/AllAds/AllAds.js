import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Card } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';

const AllAds = (props) => {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={[style.subtitle, { marginLeft: 10 }]}>All Ads</Text>

            <FlatList
                data={[1, 2, 3, 4, 5]}
                horizontal={false}  
                numColumns={2} 
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                     return (
                        <View style={{ flex: 1, margin: 5 }}>
                            <Card style={{ borderRadius: 12 }}>
                                <Image 
                                    source={{ uri: 'https://picsum.photos/700' }} 
                                    style={{ height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} 
                                />
                                <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 3, flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name='checkcircle' style={{ color: '#3184b6', marginRight: 5 }} />
                                    <Text style={{ color: '#3184b6', fontWeight: 'bold', fontSize: 12 }}>Verified</Text>
                                </View>

                                <View style={{ marginTop: 10, marginLeft: 10 }}>
                                    <Text style={style.subsubtitle}>$ 35,50,900</Text>
                                    <Text numberOfLines={1} style={{ width: 150 }}>Hyundai i20 black color car</Text>
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
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default AllAds;
