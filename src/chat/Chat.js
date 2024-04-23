import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../style';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const Chat = () => {
  const [personData, setPersonData] = useState([]); console.log('personData---', personData)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      console.log('response---', response.data.users)
      setPersonData(response.data.users);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { bottom: 60, top: 10, flex: 1, flexDirection: "row", justifyContent: "space-between" }]}>
      <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 0, }}>
        <Image source={{ uri: item.image }} style={{ height: 50, width: 50 }} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.name}>{item.firstName + ' ' + item.lastName}</Text>
          <Text style={styles.email}>{item.phone}</Text>
        </View>
      </View>
      <View style={{ display: "flex", justifyContent: "" }}>
        <Text style={{ color: item.gender == 'male' ? "green" : "red" }}>{item.gender == 'male' ? "Online" : "Offline"}</Text>
        <Text style={{ fontSize: 12 }}>Last Seen: 1 min ago</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title='Chat' />
        <TouchableOpacity onPress={() => { }} style={{ bottom: 10, marginRight: 5 }} >
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 5 }}>
            <Entypo name="location" size={15} />
            <Text style={style.subtitle}>Guwahati</Text>
            <AntDesign name="caretdown" size={15} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>


      <ScrollView
        style={{ flex: 1, marginBottom: 70 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
      >
        <StatusBar animated={true} backgroundColor="" translucent={false} />

        {
          loading == true
            ?
            <SkeletonPlaceholder>
              <View style={{ padding: 10 }}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                  <View key={index} style={[styles.card, { marginBottom: 5, flexDirection: "row", justifyContent:"space-between", flex:1 }]}>
                    <View style={{ display: "flex", flexDirection: "row", marginHorizontal: 0, }}>
                      <View style={{ width: 50, height: 50, borderRadius: 25 }} />
                      <View style={{ marginLeft: 10 }}>
                        <View style={{ width: 150, height: 20, borderRadius: 4 }} />
                        <View style={{ width: 100, height: 15, borderRadius: 4, marginTop: 6 }} />
                      </View>
                    </View>
                    <View>
                      <View style={{ width: 50, height: 15, borderRadius: 4, marginBottom: 8 }} />
                      <View style={{ width: 100, height: 15, borderRadius: 4 }} />
                    </View>
                  </View>
                ))}
              </View>
            </SkeletonPlaceholder>
            :
            <FlatList
              data={personData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              style={{ marginBottom: 65 }}
            />
        }
      </ScrollView>


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
});

export default Chat;
