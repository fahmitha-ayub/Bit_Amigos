// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import SignUp from '/home/grigary/hackathon/SignUpNumber/Login_Setup/SignUp.js'
// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" /> */}
//       <SignUp/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '/home/grigary/hackathon/SignUpNumber/Login_Setup/SignUp.js';
import Chat from '/home/grigary/hackathon/SignUpNumber/ChatPage/Chat.js';
import ChatNew from '/home/grigary/hackathon/SignUpNumber/ChatPage/ChatNew.js'
import Authorities from './ChatPage/Authorities';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authorities">
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Chat" options={{headerShown:false}} component={Chat} />
        <Stack.Screen name="ChatNew" options={{headerShown:false}} component={ChatNew} />
        <Stack.Screen name="Authorities" options={{headerShown:false}} component={Authorities} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
