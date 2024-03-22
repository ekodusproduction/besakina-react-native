// RootNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpScreen from '../screens/Auth/OtpScreen';
import VerifyOtpScreen from '../screens/Auth/VerifyOtpScreen';
import CategoryList from '../screens/categories/CategoryList'; 
import CategoryDetails from '../screens/categories/CategoryDetails';
import HomeScreen from '../screens/Home/HomeScreen ';
import AllAdsDetails from '../screens/AllAds/AllAdsDetails';
import FeaturedAdsDetails from '../screens/FeaturedAds/FeaturedAdsDetails';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
