import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { useNavigation } from '@react-navigation/native';

const Health = () => {
  const [render, setRender] = useState('');
  console.log('render--->', render);
  const navigation = useNavigation();
  const data = [
    {
      title: "Doctors", id: 1
    },
    {
      title: "Hospital or Clinic", id: 2
    }
  ]
  const handlePress = (id) => {
    setRender(id);
    navigation.navigate(id === 1 ? 'Doctor' : 'HospitalorClinic');
  }
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Health" />
      </Appbar.Header>

      <View style={{ padding: 10 }}>
        <View style={{}}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ height: 60, borderWidth: 1, borderRadius: 8, borderColor: "gray", marginBottom: 10, justifyContent: "center" }}
              onPress={() => handlePress(item.id)}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                <Text style={style.subsubtitle}>{item.title}</Text>
                <AntDesign name="caretright" size={15} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Health;

