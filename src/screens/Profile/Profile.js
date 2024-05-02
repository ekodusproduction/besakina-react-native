import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {Baseurl} from '../../constant/globalparams';
import {AddPost, MyPost, Pricing, Settings} from '../../svg/svg';
import style from '../../style';
import {handleGetToken} from '../../constant/tokenUtils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Profile = () => {
  const navigation = useNavigation();
  const isfocused = useIsFocused();

  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  console.log('toekn', token);
  console.log('picture', picture);
  const data = [
    {
      name: 'My Adds',
      id: 1,
      icon: (
        <SvgXml
          xml={MyPost}
          width="25px"
          height="25px"
          style={{marginTop: 3, marginRight: 5}}
        />
      ),
      movenewscreen: 'Myadds',
    },
    {
      name: 'Add Post',
      id: 2,
      icon: (
        <SvgXml
          xml={AddPost}
          width="25px"
          height="25px"
          style={{marginTop: 3, marginRight: 5}}
        />
      ),
      movenewscreen: 'AddPost',
    },
    {
      name: 'Price List',
      id: 3,
      icon: (
        <SvgXml
          xml={Pricing}
          width="25px"
          height="25px"
          style={{marginTop: 3, marginRight: 5}}
        />
      ),
      movenewscreen: 'MyPlans',
    },
    {
      name: 'Settings',
      id: 5,
      icon: (
        <SvgXml
          xml={Settings}
          width="25px"
          height="25px"
          style={{marginTop: 3, marginRight: 5}}
        />
      ),
      movenewscreen: 'Settings',
    },
  ];

  const fetuserapi = async () => {
    try {
      const token = await handleGetToken();
      if (token) {
        setToken(token);
        const response = await axios.get(`${Baseurl}/api/users/details`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('response --->>', response.data.data);
        setName(response.data.data?.fullname);
        setPicture(response.data.data?.profile_pic);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        console.log('Token not retrieved');
      }
    } catch (error) {
      console.error('Error fetching data: ', error.response);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (isfocused) {
      fetuserapi();
    }
  }, [isfocused]);

  if (isLoading) {
    return (
      <ScrollView
        style={{flex: 1, marginBottom: 70}}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}>
        <StatusBar animated={true} backgroundColor="" translucent={false} />

        <SkeletonPlaceholder>
          <View style={{padding: 10}}>
            {/* Skeleton for header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{width: 50, height: 40, borderRadius: 10}} />
              <View style={{width: 100, height: 40, borderRadius: 10}} />
            </View>

            {/* Skeleton for profile image */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{width: 100, height: 100, borderRadius: 50}} />
            </View>

            {/* Skeleton for name */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View style={{width: '50%', height: 20, borderRadius: 10}} />
            </View>

            {/* Skeleton for button */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{width: 200, height: 40, borderRadius: 8}} />
            </View>

            {/* Skeleton for menu items */}
            {data.map((_, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  margin: 5,
                  marginHorizontal: 5,
                  height: 60,
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 13,
                        marginRight: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }

  return (
    <View>
      <View
        style={{
          marginTop: 5,
          marginHorizontal: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            style={{marginRight: 5, marginTop: 5}}
            size={30}
            color={'black'}
          />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/mobileapp-20.png')}
          style={{height: 40, width: '40%'}}
        />
      </View>

      <View style={{marginBottom: 20, marginTop: 20}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Image
            source={{
              uri:
                token == null || picture == null
                  ? 'https://picsum.photos/200'
                  : `${Baseurl}/api/${picture}`,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderColor: 'gray',
              borderWidth: 0.5,
            }}
          />
        </TouchableOpacity>
        <Text style={[style.subtitle, {textAlign: 'center', marginTop: 10}]}>
          {token == null || name == null ? 'Not Available' : name}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Button
            onPress={() => navigation.navigate('EditProfile')}
            icon={'pencil'}
            style={{backgroundColor: '#3184b6', borderRadius: 8}}
            mode="outlined">
            <Text style={{textAlign: 'center', fontSize: 14, color: 'white'}}>
              View & Edit Profile
            </Text>
          </Button>
        </View>
      </View>

      {data.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.movenewscreen)}
          key={item.id}
          style={{
            backgroundColor: 'white',
            margin: 5,
            marginHorizontal: 10,
            height: 60,
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginRight: 5, marginLeft: 8}}>{item.icon}</View>
              <Text style={style.subsubtitle}>{item.name}</Text>
            </View>
            <AntDesign
              name="right"
              style={{marginRight: 5, marginTop: 5}}
              size={15}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Profile;
