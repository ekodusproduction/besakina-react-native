// RootNavigator.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import Education from '../screens/AddPostForms/Education';
import Services from '../screens/AddPostForms/Services';
import Vehicle from '../screens/AddPostForms/Vehicle';
import Doctor from '../screens/AddPostForms/Doctor';
import HospitalorClinic from '../screens/AddPostForms/HospitalorClinic';
import Hospitality from '../screens/AddPostForms/Hospitality';
import Mywishlist from '../screens/myadds/Myadds';
import Profile from '../screens/Profile/Profile';
import PropertyCategoryDetails from '../screens/categories/Property/PropertyCategoryDetails';
import HospitalityCategoryDetails from '../screens/categories/Hospitalilty/HospitalityCategoryDetails';
import EducationCategoryDetails from '../screens/categories/Education/EducationCategoryDetails';
import VehicleCategoryDetails from '../screens/categories/Vehicle/VehicleCategoryDetails';
import DoctorCategoryDetails from '../screens/categories/Health/DoctorCategoryDetails';
import HospitalorClinicCategoryDetails from '../screens/categories/Health/HospitalorClinicCategoryDetails';
import Error404 from '../Error404';
import Settings from '../screens/settings/Settings';
import MyPlans from '../screens/plans/MyPlans';
import EditProfile from '../screens/Profile/EditProfile';
import SearchScreen from '../screens/SearchScreen';
import Chat from '../chat/Chat';
import Myadds from '../screens/myadds/Myadds';
import Editeducationadds from '../screens/myadds/Editeducationadds';
import Edithospitalityadds from '../screens/myadds/Edithospitalityadds';
import Editpropertyadds from '../screens/myadds/Editpropertyadds';
import Editdoctoradds from '../screens/myadds/Editdoctoradds';
import Edithospitaladds from '../screens/myadds/Edithospitaladds';
import Editvehicleads from '../screens/myadds/Editvehicleads';
import AddPost from '../screens/categories/AddPost';
import BusinessListing from '../screens/AddPostForms/BusinessListing';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}>
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
            align: 'center',
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
            align: 'center',
          },
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false, animation: 'simple_push'}}
      />
      <Stack.Screen
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
        options={{headerShown: false, animation: 'simple_push'}}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="BusinessListing"
        component={BusinessListing}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="PropertyCategoryDetails"
        component={PropertyCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Editeducationadds"
        component={Editeducationadds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Edithospitalityadds"
        component={Edithospitalityadds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Editpropertyadds"
        component={Editpropertyadds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Editdoctoradds"
        component={Editdoctoradds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Edithospitaladds"
        component={Edithospitaladds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Editvehicleads"
        component={Editvehicleads}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="MyPlans"
        component={MyPlans}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Myadds"
        component={Myadds}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="HospitalityCategoryDetails"
        component={HospitalityCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="EducationCategoryDetails"
        component={EducationCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          animation: 'simple_push',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="VehicleCategoryDetails"
        component={VehicleCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="DoctorCategoryDetails"
        component={DoctorCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="HospitalorClinicCategoryDetails"
        component={HospitalorClinicCategoryDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="ViewCategories"
        component={ViewCategories}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Error404"
        component={Error404}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
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
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Doctor"
        component={Doctor}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="HospitalorClinic"
        component={HospitalorClinic}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Hospitality"
        component={Hospitality}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Mywishlist"
        component={Mywishlist}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'black',
          animation: 'simple_push',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
