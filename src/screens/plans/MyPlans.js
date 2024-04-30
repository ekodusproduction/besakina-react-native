import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Baseurl } from '../../constant/globalparams';

const MyPlans = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchMyPlansApi();
    }, []);

    const fetchMyPlansApi = () => {
        axios.get(`${Baseurl}/api/plans`)
            .then(response => {
                console.log('response---',response)
                setData(response.data.data || []);
            })
            .catch(error => {
                console.error('Error fetching data: ', error.response);
            });
    }

    const renderPlanItem = ({ item }) => {
        return (
            <View style={styles.planCard}>
                <View style={styles.planContent}>
                    <Text style={styles.planPrice}>₹{item.price}/month</Text>
                    <Text style={styles.planTitle}>{item.type}</Text>
                    <View style={styles.featureList}>
                        <FeatureItem text={`Manage Dashboards: ${item.contact_limit}`} />
                        <FeatureItem text={`Complete Product Catalogue with images & details: ${item.no_images}`} />
                        <FeatureItem text={`Complete business profile with business verification badge: ${item.no_images}`} icon={item.business_profile === 0 ? 'closecircle' : 'checkcircle'} color={item.business_profile === 0 ? 'red' : 'lightgreen'} />
                        <FeatureItem text={`High Search Ranking in Premium Listings: ${item.search_priority}`} />
                        <FeatureItem text={`Display product & images on profile page: ${item.business_profile}`} icon={item.business_profile === 0 ? 'closecircle' : 'checkcircle'} color={item.business_profile === 0 ? 'red' : 'lightgreen'} />
                        <FeatureItem text={`Membership Badge: ${item.type}`} />
                        <FeatureItem text={`Contact any buyers directly on our website: ${item.contact_limit}`} />
                    </View>
                    <TouchableOpacity style={styles.selectButton}>
                        <Text style={styles.selectButtonText}>Choose Plan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const FeatureItem = ({ text, icon, color }) => {
        return (
            <View style={styles.featureItem}>
                <AntDesign name={icon || "checkcircle"} color={color || "lightgreen"} size={20} />
                <Text style={styles.feature}>{text}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="My Price List" />
            </Appbar.Header>
            <View style={styles.header}>
                <Text style={styles.headerText}>Our Pricing</Text>
                <Text style={styles.subtitle}>Choose Your Package</Text>
            </View>
            <Divider style={styles.divider} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderPlanItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#333',
    },
    planCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    planContent: {
        padding: 20,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    planPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
    },
    featureList: {
        marginBottom: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    feature: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    selectButton: {
        backgroundColor: '#3184b6',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    divider: {
        marginBottom: 10,
        marginHorizontal: 20,
    },
});

export default MyPlans;
