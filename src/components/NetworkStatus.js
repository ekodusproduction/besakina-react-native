import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Snackbar} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const colors = {
  connected: '#4CAF50',
  internetReachable: '#FFEB3B',
  disconnected: '#F44336',
};

const NetworkStatus = () => {
  const [networkState, setNetworkState] = useState(null);
  const [isconnected, setIsconnected] = useState(null);
  const [color, setColor] = useState(colors.disconnected);

  const updateColor = state => {
    if (state.isConnected && state.isInternetReachable) {
      setColor(colors.connected);
    } else if (state.isConnected && !state.isInternetReachable) {
      setColor(colors.internetReachable);
    } else {
      setColor(colors.disconnected);
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log('network state---', state);
      setIsconnected(state.isConnected);
      setNetworkState(state);
      updateColor(state);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state);
      updateColor(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Text>
        {isconnected == true ? '' : 'You are not connected to internet'}
      </Text>
    </SafeAreaProvider>
  );
};

export default NetworkStatus;
