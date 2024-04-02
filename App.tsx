import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, Image } from 'react-native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';
 
const App = () => {
  const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    LogBox.ignoreAllLogs();
    handleGetToken();
    setTimeout(() => {
      SplashScreen.hide();
      setIsSplashScreenHidden(true);
    }, 3000);
  }, []);

  const handleGetToken = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("UserData");
      setIsLoggedIn(!!dataToken);
    } catch (error) {
      console.error('Error retrieving user token:', error);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          {isSplashScreenHidden ? (
            <>
              {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', marginTop: 200 }}>
                <Image source={require('./assets/mobileapp-03.png')} style={{ height: 200, width: 250 }} />
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 }}>
                  <Text>From</Text>
                  <Image source={require('./assets/Logo-04.jpg')} style={{}} />
                </View>
              </View>
            </View>
          )}
        </View>
      </NavigationContainer>

    </Provider>
  );
};

export default App;
