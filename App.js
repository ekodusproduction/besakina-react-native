import React, {useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import Video from 'react-native-video';
import {handleGetToken} from './src/constant/tokenUtils';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    LogBox.ignoreAllLogs();
    handleGetToken().then(dataToken =>
      setTimeout(() => {
        setIsLoggedIn(!!dataToken);
        setIsSplashScreenHidden(true);
      }, 3500),
    );
    SplashScreen.hide();
  }, []);

  const onVideoEnd = () => {
    setIsSplashScreenHidden(true);
  };

  return (
    <View style={{flex: 1}}>
      {isSplashScreenHidden ? (
        <NavigationContainer>
          {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <View style={{flex: 1}}>
          <Video
            source={require('./assets/bk_ress_4.mp4')}
            style={{width: '100%', height: '100%'}}
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




// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { View } from 'react-native';
// import { LogBox } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthNavigator from './src/navigation/AuthNavigator';
// import RootNavigator from './src/navigation/RootNavigator';
// import Video from 'react-native-video';
// import { handleGetToken } from './src/constant/tokenUtils';
// import SplashScreen from 'react-native-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Create a context for the login state
// export const LoginContext = createContext();

// // Create a provider component to wrap your application with
// export const LoginProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = AsyncStorage.getItem('UserData');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000;
//         setIsLoggedIn(decodedToken.exp >= currentTime);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, []);

//   return (
//     <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// const App = () => {
//   const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     LogBox.ignoreAllLogs();
//     handleGetToken().then(dataToken =>
//       setTimeout(() => {
//         setIsLoggedIn(!!dataToken);
//         setIsSplashScreenHidden(true);
//       }, 3500),
//     );
//     SplashScreen.hide();
//   }, []);

//   const onVideoEnd = () => {
//     setIsSplashScreenHidden(true);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {isSplashScreenHidden ? (
//         <NavigationContainer>
//           {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
//         </NavigationContainer>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <Video
//             source={require('./assets/bk_ress_4.mp4')}
//             style={{ width: '100%', height: '100%' }}
//             resizeMode="cover"
//             repeat={false}
//             muted
//             controls={false}
//             onEnd={onVideoEnd}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default App;
