import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text, Image } from 'react-native';
import { Provider } from 'react-native-paper';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const App = () => {
  const [isSplashScreenHidden, setIsSplashScreenHidden] = useState(false);
  // const isLoggedin = true;

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setIsSplashScreenHidden(true);
    }, 3000);
  }, []);

  return (
    <>
      <Provider>
        <View style={{ flex: 1 }}>
          {isSplashScreenHidden ? (
            <>
              {/* {isLoggedin ? <RootNavigator /> : <AuthNavigator />} */}
              {/* <RootNavigator /> */}
              <BottomTabNavigator />
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
      </Provider>
    </>
  );
};

export default App;
