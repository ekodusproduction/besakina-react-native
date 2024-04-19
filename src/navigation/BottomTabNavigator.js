// BottomTabNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen ';
import ViewCategories from '../screens/categories/ViewCategories';
 import CategoryList from '../screens/categories/SelectCategoryList';
import { SvgXml } from 'react-native-svg';
import { categories, user } from '../svg/svg';
import Profile from '../screens/Profile/Profile';
import Myadds from '../screens/myadds/Myadds';
import Chat from '../chat/Chat';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarStyle: styles.tabBar,
                headerShown: false
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="home" size={30} color={focused ? "#3184b6" : ""} />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="ViewCategories"
                component={ViewCategories}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={categories}
                            width="30px"
                            height="30px"
                            style={{ fill: focused ? "#3184b6" : "" }}
                        />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="AddAds"
                component={CategoryList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.addAdsIcon}>
                            <FontAwesome name="plus" color='#3184b6' size={30} />
                        </View>
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="message" color={focused ? '#3184b6' : ''} size={30} />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={user}
                            width="30px"
                            height="30px"
                            style={{ fill: focused ? "#3184b6" : "" }}
                        />
                    ),
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
        </Tab.Navigator>
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
    addAdsIcon: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#3184b6',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginBottom: 50,
    },
});

export default BottomTabNavigator;
