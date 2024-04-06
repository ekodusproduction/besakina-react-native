import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Image, Text } from 'react-native';

const Error404 = () => {
  console.log('first')
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../assets/404.json')}
        autoPlay
        loop
        style={{ height: '100%', width: '100%' }}
        onAnimationFinish={() => console.log('Animation Finished')}
        onError={(error) => console.log('Lottie Error:', error)}
      />
    </View>
  );
};

export default Error404;
