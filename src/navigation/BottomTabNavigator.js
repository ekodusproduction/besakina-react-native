import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RootNavigator from './RootNavigator';
import AuthNavigator from './AuthNavigator';
import CategoryList from '../screens/categories/SelectCategoryList';
import FeaturedAds from '../screens/FeaturedAds/FeaturedAds';
import AllAds from '../screens/AllAds/AllAds';
import { NavigationContainer } from '@react-navigation/native';
import { categories, home, user } from '../svg/svg';
import { SvgXml } from 'react-native-svg';
import HomeScreen from '../screens/Home/HomeScreen ';
import ViewCategories from '../screens/categories/ViewCategories';
import Mywishlist from '../screens/wishlist/Mywishlist';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        // <NavigationContainer>
            <Tab.Navigator
                initialRouteName='HomeScreen'
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                }}
            >
                <Tab.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome name="home" size={30} color={focused ? "#3184b6" : ""} />
                        ),
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name='ViewCategories'
                    component={ViewCategories}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={categories}
                                width="30px"
                                height="30px"
                                style={{ fill: focused ? "#3184b6" : ""}}
                            />),
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name='Add-Ads'
                    component={CategoryList}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <View style={{
                                width: 50,
                                height: 50,
                                borderWidth: 2,
                                borderColor: '#3184b6',
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "#fff",
                                marginBottom: 50,

                            }}>
                                <FontAwesome name="plus" color='#3184b6' size={size} />  
                            </View>
                        ),
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name='Mywishlist'
                    component={Mywishlist}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome name="heart-o" color={focused ? '#3184b6' : ''} size={30} />
                        ),
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                    }}
                />
                <Tab.Screen
                    name='AllAds'
                    component={AllAds}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={user}
                                width="30px"
                                height="30px"
                                style={{ fill: focused ? "#3184b6" : ""}}
                            />),
                        tabBarShowLabel: false,
                        tabBarLabel: '',
                    }}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 65,
        position: 'absolute',
        bottom: 0,
        marginHorizontal: 0,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#dadada',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default BottomTabNavigator;
