import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Image, Text } from 'react-native';

const Error404 = () => {
  console.log('first')
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       {/* <LottieView
        source={require('../assets/Animation - 1712317744824.json')}
        autoPlay
        loop
        onAnimationFinish={() => console.log('Animation Finished')}  
        onError={(error) => console.log('Lottie Error:', error)} 
      /> */}
      <Text>404 Error not found !!!</Text>
    </View>
  );
};

export default Error404;
