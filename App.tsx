import React, { useEffect, useLayoutEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, ActivityIndicator, Image } from 'react-native';
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
      setInterval(() => {
        SplashScreen.hide();
        setIsSplashScreenHidden(true);
      }, 1000);
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

      <View style={{ flex: 1 }}>
        {isSplashScreenHidden ? (
          <NavigationContainer>
            {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        ) : (
          <View style={{ flex: 1 }}>
            {!isVideoLoaded && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', marginTop: 200 }}>
                <Image source={require('./assets/mobileapp-03.png')} style={{ height: 200, width: 250 }} />

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 }}>
                  <Text>From</Text>
                  <Image source={require('./assets/Logo-04.jpg')} style={{}} />
                </View>

              </View>
            </View>}
            <Video
              source={require('./assets/Bksplashscreen.mp4')}
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

    </Provider>
  );
};

export default App;




// import React, { useEffect, useState } from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import { View, Text, Image } from 'react-native';
// import { LogBox } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthNavigator from './src/navigation/AuthNavigator';
// import RootNavigator from './src/navigation/RootNavigator';

// const App = () => {
//   const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     LogBox.ignoreAllLogs();
//     handleGetToken();
//   }, []);

//   const handleGetToken = async () => {
//     try {
//       const dataToken = await AsyncStorage.getItem('UserData');
//       setIsLoggedIn(!!dataToken);
//       // Hide splash screen immediately after getting token
//       SplashScreen.hide();
//       setIsSplashScreenHidden(true);
//     } catch (error) {
//       console.error('Error retrieving user token:', error);
//     }
//   };

//   return (
//     <Provider store={store}>
//       <View style={{ flex: 1 }}>
//         {isSplashScreenHidden ? (
//           <NavigationContainer>
//             {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
//           </NavigationContainer>
//         ) : (
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <View style={{ alignItems: 'center', marginTop: 200 }}>
//               <Image source={require('./assets/mobileapp-03.png')} style={{ height: 200, width: 250 }} />
//               <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50 }}>
//                 <Text>From</Text>
//                 <Image source={require('./assets/Logo-04.jpg')} style={{}} />
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     </Provider>
//   );
// };

// export default App;
