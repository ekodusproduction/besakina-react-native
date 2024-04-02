import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../../style';
import FeaturedAds from '../FeaturedAds/FeaturedAds';
import AllAds from '../AllAds/AllAds';
import { SliderBox } from "react-native-image-slider-box";
import { SvgXml } from 'react-native-svg';
import { location } from '../../svg/svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import HomeScreen from '../Home/HomeScreen ';
import EducationCategoryDetails from './EducationCategoryDetails';
import PropertyCategoryDetails from './PropertyCategoryDetails';
import VehicleCategoryDetails from './VehicleCategoryDetails';
import HospitalityCategoryDetails from './HospitalityCategoryDetails';
import HealthCategoryDetails from './HealthCategoryDetails';

const CategoryDetails = ({ route }) => {
    const data = route.params;
    console.log('data----', data.item.name);

    const navigation = useNavigation();
    const image = [
        require('../../../assets/banner1.png'),
        require('../../../assets/banner2.png'),
    ];
    const refRBSheet = useRef();

    return (
        <View style={style.container}>
            {data.item.name === 'Education' ? (
                <EducationCategoryDetails item={data.item} />
            ) : data.item.name === 'Health' ? (
                <HealthCategoryDetails item={data.item} />
            ) : data.item.name === 'Property' ? (
                <PropertyCategoryDetails item={data.item} />
            ) : data.item.name === 'Hospitality' ? (
                <HospitalityCategoryDetails item={data.item} />
            ) : data.item.name === 'Vehicle' ? (
                <VehicleCategoryDetails item={data.item} />
            ) : data.item.name === 'AnotherCategory' ? (
                <Text>This is Another Category</Text>
            ) : (
                <Text>This is a Default Category</Text>
            )}


        </View>
    );
};

export default CategoryDetails;
