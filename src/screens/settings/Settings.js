import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import style from '../../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-paper'
import { SvgXml } from 'react-native-svg';
 
const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.push('AuthNavigator');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

       

      


      

      <View style={{ padding:10}}>
        <TouchableOpacity
          style={{
            backgroundColor: style.button.backgroundColor,
            borderRadius: 0,
            height: 60,
            justifyContent: 'center',
            borderColor: 'gray',
            borderWidth: 0.5,
          }}
          onPress={handleLogout}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
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
