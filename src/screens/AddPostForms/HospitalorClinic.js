import { View, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Dimensions } from 'react-native';

const HospitalorClinic = () => {
  const navigation = useNavigation();
  const [hospitalorclinicvalue, setHospitalorclinicvalue] = useState(null);
  const Expertisedata = [
    { label: 'Select Type', value: '1' },
    { label: 'Hospital', value: '2' },
    { label: 'Clinic', value: '3' },
    { label: 'Laboratoy', value: '4' },
    { label: 'Nurshing Home', value: '5' },
  ];
  const [selectedImages, setSelectedImages] = useState([]);
  console.log('selectedImages--->', selectedImages);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 20) / 4.7;

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImages([...selectedImages, imageUri]);
      }
    });
  }

  return (
    <View style={{ flex: 1, }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Hospital or Clinic" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
          <View style={{ padding: 10 }}>


            <View style={{ borderWidth: 0.5, height: '1500px', marginTop: 10, borderRadius: 5, borderColor: "gray" }}>
              <View style={{ padding: 5 }}>

                <View style={{ marginTop: 10 }}>
                  <Text>
                    Name*
                  </Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                  // inputMode="numeric"
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Expertisedata}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Type"
                    searchPlaceholder="Search..."
                    value={hospitalorclinicvalue}
                    onChange={item => {
                      setHospitalorclinicvalue(item.value);
                    }}
                  />
                </View>

                

                <View style={{ marginTop: 10 }}>
                  <Text>Full Address*</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Title*</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                    // inputMode="numeric"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Write some description</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5,
                      height: 60,
                    }}
                  // inputMode="numeric"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Price</Text>
                  <TextInput
                    placeholderTextColor='black'
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      height: 60,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                  inputMode="numeric"
                  />
                </View>

              </View>
            </View>



            <View style={{ borderWidth: 0.5, borderColor: "gray", padding: 10, borderRadius: 5, marginTop: 10 }}>
              <View style={{ padding: 0 }}>
                <Text style={style.subsubtitle}>UPLOAD UPTO 20 PHOTOS</Text>
                <FlatList
                  data={[...Array(20).keys()]}
                  vertical
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={handleCameraLaunch}
                      style={{
                        height: itemWidth,
                        width: itemWidth,
                        borderRadius: 5,
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
                    >
                      {selectedImages[item] ? (
                        <Image
                          source={{ uri: selectedImages[item] }}
                          style={{ height: '100%', width: '100%' }}
                          resizeMode="cover"
                        />
                      ) : (
                        <AntDesign name="camera" size={50} />
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>


          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ marginTop: 0 }} >
        <TouchableOpacity
          style={{
            backgroundColor: style.button.backgroundColor,
            borderRadius: 0,
            height: 60,
            justifyContent: 'center',
            borderColor: "gray",
            borderWidth: 0.5
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, color: "white" }}>Post My Ad</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HospitalorClinic;
