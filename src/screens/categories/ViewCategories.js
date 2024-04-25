import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Education, Hospitality, ServicesSVG,  health, property, vehicle } from '../../svg/svg';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';


const array = [
  {
    id: 1, filename: Hospitality, name: "Hospitality"
  },
  {
    id: 2, filename: Education, name: "Education"
  },
  {
    id: 3, filename: health, name: "Health Care"
  },
  {
    id: 4, filename: property, name: "Properties"
  },
  {
    id: 5, filename: vehicle, name: "Vehicles"
  }
];
const ViewCategories = () => {
  const navigation = useNavigation();

  return (
    <View>

      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Categories" />
      </Appbar.Header>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={array}
          vertical
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
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
              onPress={() => navigation.navigate('CategoryDetails', { item })}
            >
              <SvgXml
                xml={item.filename}
                width="50px"
                height="50px"
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>


    </View>
  )
}

export default ViewCategories