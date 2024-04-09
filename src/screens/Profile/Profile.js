import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-paper'
import { SvgXml } from 'react-native-svg';
import { AddPost, MyPost, Pricing, Settings, location } from '../../svg/svg';

const Profile = () => {
  const navigation = useNavigation();
  const data = [
    {
      name: "My Post",
      id: 1,
      icon: <SvgXml
        xml={MyPost}
        width="25px"
        height="25px"
        style={{ marginTop: 3, marginRight: 5 }}
      />,
      movenewscreen: "Myadds"
    },
    {
      name: "Add Post",
      id: 2,
      icon: <SvgXml
        xml={AddPost}
        width="25px"
        height="25px"
        style={{ marginTop: 3, marginRight: 5 }}
      />,
      movenewscreen: "AddAds"
    },
    {
      name: "Price List",
      id: 3,
      icon: <SvgXml
        xml={Pricing}
        width="25px"
        height="25px"
        style={{ marginTop: 3, marginRight: 5 }}
      />,
      movenewscreen: "MyPlans"
    },
    {
      name: "Settings",
      id: 4,
      icon: <SvgXml
        xml={Settings}
        width="25px"
        height="25px"
        style={{ marginTop: 3, marginRight: 5 }}
      />,
      movenewscreen: "Settings"
    },
  ]
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
        <Image
          source={require('../../../assets/mobileapp-20.png')}
          style={{ height: 40, width: '40%' }}
        />
      </View>

      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
          <Image
            source={{ uri: 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg' }}
            style={{ height: 100, width: 100, borderRadius: 50, borderColor: "gray", borderWidth: 0.5 }}
          />

        </TouchableOpacity>
        <Text style={[style.subtitle, { textAlign: "center", marginTop: 10 }]}>Suraj Ali</Text>
        <View style={styles.container}>
          <Button icon="pencil" onPress={() => console.log('Pressed')} >
            <Text style={{ textAlign: 'center', fontSize: 14, color: 'white' }}>View & Edit Profile</Text>
          </Button>
        </View>

      </View>



      {data.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.movenewscreen)}
          key={item.id}
          style={{
            backgroundColor: "white",
            margin: 5,
            marginHorizontal: 10,
            height: 60,
            justifyContent: "center",
            borderRadius: 5
          }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 5, marginLeft: 8 }}>{item.icon}</View>
              <Text style={style.subsubtitle}>{item.name}</Text>
            </View>
            <AntDesign name="right" style={{ marginRight: 5, marginTop: 5 }} size={15} />
          </View>
        </TouchableOpacity>
      ))}



    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: style.button.backgroundColor,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: 200,
    marginLeft: 100,
    marginTop: 10
  },
});
