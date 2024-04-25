import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import Video from 'react-native-video';
import { handleGetToken } from './src/constant/tokenUtils';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    LogBox.ignoreAllLogs();
    handleGetToken().then((dataToken) =>
      setTimeout(() => {
        setIsLoggedIn(!!dataToken);
        setIsSplashScreenHidden(true);
      }, 3500));
    SplashScreen.hide();
  }, []);



  const onVideoEnd = () => {
    setIsSplashScreenHidden(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {isSplashScreenHidden ? (
        <NavigationContainer>
          {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <View style={{ flex: 1 }}>
          <Video
            source={require('./assets/bk_ress_4.mp4')}
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
  );
};

export default App;
