import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Hospitality, Education, health, property, vehicle} from '../../svg/svg';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';

const array = [
  {
    id: 1,
    filename: vehicle,
    name: 'Vehicles',
  },
  {
    id: 2,
    filename: Education,
    name: 'Education',
  },
  {
    id: 3,
    filename: property,
    name: 'Properties',
  },
  {
    id: 4,
    filename: health,
    name: 'Health Care',
  },
  {
    id: 5,
    filename: Hospitality,
    name: 'Hospitality',
  },
];
const AddPost = () => {
  const navigation = useNavigation();

  const handlePress = itemName => {
    switch (itemName) {
      case 'Properties':
        navigation.navigate('Property');
        break;
      case 'Health Care':
        navigation.navigate('Health');
        break;
      case 'Vehicles':
        navigation.navigate('Vehicle');
        break;
      case 'Education':
        navigation.navigate('Education');
        break;
      case 'Hospitality':
        navigation.navigate('Hospitality');
        break;

      default:
        // Handle default case
        break;
    }
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Post Your Ads" />
      </Appbar.Header>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={array}
          vertical
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                height: 120,
                width: 120,
                borderRadius: 15,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
                marginTop: 10,
                marginBottom: 10,
                elevation: 5,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
              onPress={() => handlePress(item.name)}>
              <SvgXml xml={item.filename} width="50px" height="50px" />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default AddPost;
