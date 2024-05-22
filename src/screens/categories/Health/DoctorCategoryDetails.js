import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../../style';
import {SliderBox} from 'react-native-image-slider-box';
import TableView from '../../../components/TableView';
import axios from 'axios';
import {Baseurl} from '../../../constant/globalparams';
import {SvgXml} from 'react-native-svg';
import {location} from '../../../svg/svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AuthenticationModal_ContactSeller from '../../../components/AuthenticationModal_ContactSeller';
import formatIndianCurrency, { formatINR } from '../../../components/formatINR';

const DoctorCategoryDetails = ({route}) => {
  const {data, edit} = route.params;
  const navigation = useNavigation();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [createdAtLabel, setCreatedAtLabel] = useState(''); 

  let imageUrls =
    info && info?.images && info?.images.length > 0
      ? info?.images.map(url => `${url.trim()}`)
      : [];

  let image =
    imageUrls.length > 0 ? imageUrls : [`${info?.images}`];

  const headers = [
    'Fees per Visit',
    '',
    '',
    `₹${
      info?.price_per_visit == null
        ? 'N/A'
        : formatIndianCurrency(parseFloat(info?.price_per_visit).toFixed(2))
    }`,
    // formatIndianCurrency(parseFloat(info?.price_per_visit).toFixed(2))
  ];
  const rows = [
    ['Name', '', '', `${info?.name.charAt(0).toUpperCase()}${info?.name.slice(1).toLowerCase()}`],
    ['Expertise', '', '', `${info?.expertise.charAt(0).toUpperCase()}${info?.expertise.slice(1).toLowerCase()}`],
    ['Experience', '', '', `${info?.total_experience}years`],
    ['Location', '', '', `${info?.city.charAt(0).toUpperCase()}${info?.city.slice(1).toLowerCase()}`],
  ];

  const fetchdoctorApibyid = id => {
    setLoading(true);
    axios
      .get(`${Baseurl}/api/doctors/id/${id}`)
      .then(response => {
        console.log('response ---', response.data);
        setInfo(response.data.data);
        setCreatedAtLabel(getCreatedAtLabel(response.data.data.created_at));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchdoctorApibyid(data.id);
  }, []);

  const getCreatedAtLabel = createdAt => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths =
      Math.abs(currentDate.getMonth() - createdDate.getMonth()) +
      12 * (currentDate.getFullYear() - createdDate.getFullYear());
    const diffYears = Math.abs(
      currentDate.getFullYear() - createdDate.getFullYear(),
    );

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else if (diffMonths === 1) {
      return 'Last month';
    } else if (diffMonths > 1) {
      return `${diffMonths} months ago`;
    } else if (diffYears === 1) {
      return 'Last year';
    } else if (diffYears > 1) {
      return `${diffYears} years ago`;
    } else {
      return createdAt;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchdoctorApibyid(data.id);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Doctors" />
          <TouchableOpacity
            onPress={() => {}}
            style={{bottom: 10, marginRight: 5}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                gap: 5,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}>
              <SvgXml xml={location} width="15px" height="15px" />
              <Text style={style.subsubtitle}>Guwahati</Text>
              <AntDesign name="caretdown" size={12} />
            </View>
          </TouchableOpacity>
        </Appbar.Header>

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{padding: 1}}>
            <SkeletonPlaceholder speed={500}>
              <View
                style={{
                  height: 200,
                  width: '90%',
                  top: 10,
                  marginBottom: 15,
                  alignSelf: 'center',
                  borderRadius: 20,
                  bottom: 20,
                }}
              />
            </SkeletonPlaceholder>

            <SkeletonPlaceholder speed={500}>
              {[1, 2, 3, 4].map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        height: 120,
                        borderRadius: 12,
                        marginBottom: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '50%',
                        borderRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: '90%',
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                    />
                  </View>
                </View>
              ))}
            </SkeletonPlaceholder>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={info?.name} />
        <TouchableOpacity
          onPress={() => {}}
          style={{bottom: 10, marginRight: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              gap: 5,
            }}>
            <Entypo name="location" size={15} />
            <Text style={style.subsubtitle}>Guwahati</Text>
            <AntDesign name="caretdown" size={15} />
          </View>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView style={{marginBottom: 10}}>
        <View style={{padding: 10}}>
          <View style={style.sliderContainer}>
            <SliderBox
              images={image}
              dotStyle={{height: 10, width: 10, borderRadius: 5}}
              dotColor="#3184b6"
              inactiveDotColor="white"
              imageLoadingColor="white"
              autoplay={true}
              circleLoop={true}
              resizeMode="cover"
              autoplayInterval={5000}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.log(`image ${index} pressed`)
              }
              paginationBoxVerticalPadding={20}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 0,
                padding: 0,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
              }}
            />
          </View>
          <View>
            <View
              style={{
                height: 80,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 12,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                <Text style={{}} numberOfLines={1}>
                  {info?.name}
                </Text>
                {/* <AntDesign name="hearto" size={25} /> */}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="location"
                    size={15}
                    style={{marginHorizontal: 5}}
                  />
                  <Text variant="titleLarge">{info?.city}</Text>
                </View>
                <Text style={style.subsubtitle} variant="bodyMedium">
                  {createdAtLabel}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 12,
                marginTop: 10,
              }}>
              <TableView headers={headers} rows={rows} />

              <View style={{alignItems: 'center'}}>
                <Divider style={{width: '90%', backgroundColor: 'black'}} />
              </View>

              <View style={{padding: 10}}>
                <Text
                  style={[
                    style.subsubtitle,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Description:
                </Text>
                <Text
                  style={[
                    style.subsubtitle,
                    {
                      marginTop: 10,
                      justifyContent: 'center',
                      textAlign: 'justify',
                    },
                  ]}>
                  {info?.description}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 100,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 12,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Text style={style.subsubtitle}>Seller Details</Text>
              <View
                style={{
                  left: 5,
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="checkcircle"
                  style={{color: '#3184b6', marginRight: 5}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    color: '#3184b6',
                    fontSize: 12,
                  }}>
                  Verified
                </Text>
              </View>
            </View>
            <Text style={{marginLeft: 10, width: 300}} numberOfLines={1}>
              {info?.user?.fullname == null
                ? 'Not Available'
                : info?.user?.fullname}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 5,
              }}>
              <Text style={{marginLeft: 10}}>
                {info?.user?.doc_type == null
                  ? 'Not Available'
                  : info?.user?.doc_type}{' '}
                :{' '}
                {info?.user?.doc_number == null
                  ? 'Not Available'
                  : info?.user?.doc_number}
              </Text>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 10,
                }}
              />
              <Text>Member Since : {getCreatedAtLabel(info?.created_at)}</Text>
            </View>
            
          </View>
        </View>
      </ScrollView>
      {edit == 'edit' ? (
        <View></View>
      ) : (
        <View style={{marginTop: 0}}>
        <AuthenticationModal_ContactSeller info={info}/>
      </View>
      )}
    </View>
  );
};

export default DoctorCategoryDetails;


