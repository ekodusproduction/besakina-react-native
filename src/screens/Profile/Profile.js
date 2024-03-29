import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import style from '../../style';

const Profile = () => {
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
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <View style={{ padding: 20 }}>
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

export default Profile;
