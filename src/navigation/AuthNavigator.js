import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen ';
import VerifyOtpScreen from '../screens/Auth/VerifyOtpScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import RootNavigator from './RootNavigator';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer independent>
            <Stack.Navigator >

                <Stack.Screen
                    initialParams={OtpScreen}
                    name="OtpScreen"
                    component={OtpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BottomTabNavigator"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RootNavigator"
                    component={RootNavigator}
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
                            align: "center"
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;