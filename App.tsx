import React, { useEffect, useLayoutEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import Video from 'react-native-video';

const App = () => {
  const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    LogBox.ignoreAllLogs();
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("UserData");
      setTimeout(() => {
        setIsLoggedIn(!!dataToken);
        SplashScreen.hide();
        setIsSplashScreenHidden(true);
      }, 1000);
    } catch (error) {
      console.error('Error retrieving user token:', error);
    }
  };

  const onVideoEnd = () => {
    setIsSplashScreenHidden(true);
  };

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        {isSplashScreenHidden ? (
          <NavigationContainer>
            {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        ) : (
          <View style={{ flex: 1 }}>
            <Video
              source={require('./assets/Bksplashscreen.mp4')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
              repeat={false}
              muted
              controls={false}
              onEnd={onVideoEnd}
            />
          </View>
        )}
      </View>
    </Provider>
  );
};

export default App;
