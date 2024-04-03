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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    handleGetToken();
  }, []);

  useLayoutEffect(() => {
    if (isVideoLoaded) {
      setTimeout(() => {
        SplashScreen.hide();
        setIsSplashScreenHidden(true); 
      }, 2200);  
    }
  }, [isVideoLoaded]);

  const handleGetToken = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("UserData");
      setIsLoggedIn(!!dataToken);
    } catch (error) {
      console.error('Error retrieving user token:', error);
    }
  };

  const onVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const onVideoEnd = () => {
    SplashScreen.hide();
    setIsSplashScreenHidden(true);
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
            <View style={{ flex: 1 }}>
              {!isVideoLoaded && <ActivityIndicator size="large" color="red"/>}
              <Video
                source={require('./assets/BKtrial.mp4')}
                style={{ width: '100%', height: '100%', display: isVideoLoaded ? 'flex' : 'none' }}
                resizeMode="cover"
                repeat
                muted
                controls={false}
                onLoad={onVideoLoad}
                onEnd={onVideoEnd}
              />
            </View>
          )}
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

