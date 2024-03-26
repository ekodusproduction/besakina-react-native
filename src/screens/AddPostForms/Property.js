import { View,Image, Text, ScrollView, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Dimensions } from 'react-native';

const Property = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const TypesData = ['Apartments', 'Builders Floors', 'Farm Houses', 'Houses and Villas'];
  const BedroomsData = ['1', '2', '3', '4', '4+'];
  const BathroomData = ['1', '2', '3', '4', '4+'];
  const ParkingData = ['0', '1', '2', '3', '3+'];
  const FurnishingData = ['Furnished', 'semi-Furnished', 'UnFurnished'];
  const ConstructionData = ['New Launch', 'Ready to move', 'Under Construction'];
  const ListedData = ['Builder', 'Dealer', 'Owner'];
  const data = [
    { label: 'All Properties', value: '1' },
    { label: 'For Sale: Houses and Apartments', value: '2' },
    { label: 'For Rent: Houses and Apartments', value: '3' },
    { label: 'Lands and Plots', value: '4' },
    { label: 'For Sale: Shops and Offices', value: '5' },
    { label: 'For Rent: Shops and Offices', value: '6' },
    { label: 'PG and Guest Houses', value: '7' },
  ];
  const [selectedType, setSelectedType] = useState(null);
  const [selectedbedrooms, setSelectedbedrooms] = useState(null);
  const [selectedbathrooms, setSelectedbathrooms] = useState(null);
  const [furnishing, setFurnishing] = useState(null);
  const [constructionstatus, setConstructionstatus] = useState(null);
  const [listedby, setListedby] = useState(null);
  const [carparking, setCarparking] = useState(null);
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

  useEffect(() => {
  }, []);
  return (
    <View style={{ flex: 1, }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Property" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>
          <View style={{ padding: 10 }}>
            <View>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="All Properties"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>

            <View style={{ borderWidth: 0.5, height: '1500px', marginTop: 10, borderRadius: 5, borderColor: "gray" }}>
              <View style={{ padding: 5 }}>
                <Text style={[style.subtitle, { textAlign: "center" }]}>INCLUDE SOME DETAILS</Text>


                <View>
                  <Text>Type*</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {TypesData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 115,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: selectedType === index ? '#3184b6' : 'transparent' // Set background color based on selection
                        }}
                        onPress={() => setSelectedType(index)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedType === index ? 'white' : 'black' }}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Bedrooms</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {BedroomsData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: selectedbedrooms === index ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setSelectedbedrooms(index)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedbedrooms === index ? 'white' : 'black' }}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Bathrooms</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {BathroomData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: selectedbathrooms === index ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setSelectedbathrooms(index)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: selectedbathrooms === index ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>Furnishing</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {FurnishingData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 100,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: furnishing === index ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setFurnishing(index)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: furnishing === index ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>Construction Status</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {ConstructionData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 115,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: constructionstatus === index ? '#3184b6' : 'transparent'
                        }}
                        onPress={() => setConstructionstatus(index)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500",color: constructionstatus === index ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>

                <View style={{ marginTop: 10 }}>
                  <Text>Listed By</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {ListedData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 100,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: listedby === index ? '#3184b6' : 'transparent',
                        }}
                        onPress={() => setListedby(index)}

                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: listedby === index ? 'white' : 'black' }}>{item}</Text>

                      </TouchableOpacity>
                    ))}
                  </View>

                </View>


                <View style={{ marginTop: 10 }}>
                  <Text>
                    Super Builtup area <Text>(ft<Text style={{ fontSize: 10, lineHeight: 22 * 1.1, textAlignVertical: 'top' }}>2</Text>)×</Text>
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
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Carpet area <Text>(ft<Text style={{ fontSize: 10, lineHeight: 22 * 1.1, textAlignVertical: 'top' }}>2</Text>)×</Text>
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
                <View style={{ marginTop: 10 }}>
                  <Text>Maintenance (Monthly) </Text>
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
                  <Text>   Total Floors </Text>
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
                  <Text> Floors No</Text>
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
                

                <View>
                <Text>Car Parking</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {ParkingData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          height: 40,
                          width: 60,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          flexDirection: "row",
                          backgroundColor: carparking === index ? '#3184b6' : 'transparent' // Set background color based on selection
                        }}
                        onPress={() => setCarparking(index)}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: carparking === index ? 'white' : 'black' }}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                {/* <View style={{ marginTop: 10 }}>
                  <Text>Facing</Text>
                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    // data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    // placeholder="All Properties"
                    searchPlaceholder="Search..."
                  // value={value}
                  // onChange={item => {
                  //   setValue(item.value);
                  // }}
                  />
                </View> */}
                <View style={{ marginTop: 10 }}>
                  <Text> Project Name</Text>
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
                  <Text>Ad Title*</Text>
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
                  <Text style={{ fontSize: 12 }}>Mention the key features of your item (<Text>E.g brand,model,age,type</Text>)</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>Description*</Text>
                  <TextInput
                    placeholderTextColor='black'
                    multiline={true}
                    numberOfLines={5}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      paddingLeft: 20,
                      borderWidth: 0.5
                    }}
                  // inputMode="numeric"
                  />
                  <Text style={{ fontSize: 12 }}>Include condition,reason and features for selling</Text>
                </View>
              </View>
            </View>

            <View style={{ borderWidth: 0.5, borderColor: "gray", height: 120, padding: 10, borderRadius: 5, marginTop: 10 }}>
              <View style={{ padding: 0 }}>
                <Text style={style.subsubtitle}>SET A PRICE</Text>
                <TextInput
                  placeholderTextColor='black'
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 60,
                    paddingLeft: 20,
                    borderWidth: 0.5,
                    marginTop: 10
                  }}
                  inputMode="numeric"
                />
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

export default Property;
