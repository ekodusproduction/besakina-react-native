// RootNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpScreen from '../screens/Auth/OtpScreen';
import VerifyOtpScreen from '../screens/Auth/VerifyOtpScreen';
import CategoryList from '../screens/categories/SelectCategoryList';
import CategoryDetails from '../screens/categories/CategoryDetails';
import AllAdsDetails from '../screens/AllAds/AllAdsDetails';
import FeaturedAdsDetails from '../screens/FeaturedAds/FeaturedAdsDetails';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import ViewCategories from '../screens/categories/ViewCategories';
import Property from '../screens/AddPostForms/Property';
import Health from '../screens/AddPostForms/Health';
import Electronics from '../screens/AddPostForms/Electronics';
import Services from '../screens/AddPostForms/Services';
import Vehicle from '../screens/AddPostForms/Vehicle';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              align: "center"
            },
          }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtpScreen"
          component={VerifyOtpScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="ViewCategories"
          component={ViewCategories}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetails}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="AllAdsDetails"
          component={AllAdsDetails}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="FeaturedAdsDetails"
          component={FeaturedAdsDetails}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="Property"
          component={Property}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="Health"
          component={Health}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="Electronics"
          component={Electronics}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
        <Stack.Screen
          name="Vehicle"
          component={Vehicle}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: "center"
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
