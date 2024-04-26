import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen ';
import ViewCategories from '../screens/categories/ViewCategories';
import CategoryList from '../screens/categories/SelectCategoryList';
import {SvgXml} from 'react-native-svg';
import {categories, chaticon, homeicon, usericon} from '../svg/svg';
import Profile from '../screens/Profile/Profile';
import Chat from '../chat/Chat';
import {createMaterialBottomTabNavigator} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        labelStyle: {
          margin: 0,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={homeicon}
              width="25px"
              height="25px"
              style={{fill: focused ? '#3184b6' : ''}}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          labelStyle: {
            margin: 0,
          },
        }}
      />
      <Tab.Screen
        name="ViewCategories"
        component={ViewCategories}
        options={{
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={categories}
              width="25px"
              height="25px"
              style={{fill: focused ? '#3184b6' : ''}}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          labelStyle: {
            margin: 0,
          },
        }}
      />
      <Tab.Screen
        name="AddAds"
        component={CategoryList}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.addAdsIcon}>
              <FontAwesome name="plus" color="#3184b6" size={30} />
            </View>
          ),
          tabBarShowLabel: false,
          headerShown: false,
          labelStyle: {
            margin: 0,
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={chaticon}
              width="25px"
              height="25px"
              style={{fill: focused ? '#3184b6' : ''}}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          labelStyle: {
            margin: 0,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <SvgXml
              xml={usericon}
              width="25px"
              height="25px"
              style={{fill: focused ? '#3184b6' : ''}}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          labelStyle: {
            margin: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#dadada',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 50,
  },
  addAdsIcon: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#3184b6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 50,
  },
});

export default BottomTabNavigator;
