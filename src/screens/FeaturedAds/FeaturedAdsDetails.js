import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Appbar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { SliderBox } from "react-native-image-slider-box";
import TableView from '../../components/TableView';

const FeaturedAdsDetails = () => {
  const navigation = useNavigation();
  const headers = ['Name', '', '', 'Gender'];
  const rows = [
    ['John Doe', '', '', 'Male'],
    ['Jane Smith', '', '', 'Female'],
    ['Alice Johnson', '', '', 'Female'],
  ];
  const image = [
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
  ]
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title='FeaturedAds' />
        <TouchableOpacity onPress={() => { }} style={{ bottom: 10, marginRight: 5 }} >
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
            <Entypo name="location" size={15} />
            <Text style={style.subtitle}>Guwahati</Text>
            <AntDesign name="caretdown" size={15} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={{ marginBottom: 10 }}>
        <View style={{ padding: 10 }}>
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
          <View>
            <View style={{ height: 100, borderWidth: 1, borderColor: "gray", borderRadius: 12, marginTop: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                <Text style={style.subsubtitle}>$ 36,00,000</Text>
                <AntDesign name="hearto" size={25} />
              </View>
              <Text style={{ marginLeft: 10, width: 300 }} numberOfLines={1}>Hydundai i20,2013 model,petrol,1.5L engine</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginBottom: 10, marginHorizontal: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Entypo name="location" size={15} style={{ marginHorizontal: 5 }} />
                  <Text variant="titleLarge">Guwahati</Text>
                </View>
                <Text style={style.subsubtitle} variant="bodyMedium">Today</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 12, marginTop: 10 }}>
              <View style={styles.container}>
                <TableView headers={headers} rows={rows} />
              </View>

              <View style={{ alignItems: 'center' }}>
                <Divider style={{ width: '90%', backgroundColor: 'black' }} />
              </View>

              <View style={{ padding: 10 }}>
                <Text style={[style.subsubtitle, { textDecorationLine: "underline" }]}>Description:</Text>
                <Text style={[style.subsubtitle, { marginTop: 10, justifyContent: "center", textAlign: "justify" }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                </Text>
                <Text style={[style.subsubtitle, { marginTop: 10, justifyContent: "center", textAlign: "justify" }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                </Text>
                <Text style={[style.subsubtitle, { marginTop: 10, justifyContent: "center", textAlign: "justify" }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
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
            <Text style={{ marginLeft: 10, width: 300 }} numberOfLines={1}>Hydundai i20,2013 model,petrol,1.5L engine</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start", marginTop: 5 }}>
              <Text style={{ marginLeft: 10 }}>GST:1234567898765432</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'black', marginHorizontal: 10 }} />
              <Text style={{ marginLeft: 10 }}>Member since 2016</Text>
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
          onPress={() => navigation.navigate('OtpScreen')}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: ' ',
    alignItems: ' ',
    backgroundColor: '',
  },
});
export default FeaturedAdsDetails;
