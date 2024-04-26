// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const handleGetToken = async () => {
//   try {
//     const dataToken = await AsyncStorage.getItem("UserData");
//     console.log('dataToken--->',dataToken);
//     return dataToken;
//   } catch (error) {
//     console.error('Error retrieving user token:', error);
//     return null;
//   }
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleGetToken = async () => {
  try {
    const dataToken = await AsyncStorage.getItem('UserData');
    return dataToken ? dataToken.replace(/"/g, '') : null;
  } catch (error) {
    console.error('Error retrieving user token:', error);
    return null;
  }
};
