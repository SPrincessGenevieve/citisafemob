import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import FirstScreen from './src/screens/Authentication/Login/FirstScreen';
import OCRScreen from './src/screens/OCRScreen';
import Records from './src/screens/Records';
import ORCRScreen from './src/screens/ORCRScreen';
import FormScreen from './src/screens/FormScreen';
import Violations from './src/screens/Violations';
import Profile from './src/screens/Profile';
import ForgotPass from './src/screens/Authentication/ForgotPass/ForgotPass';

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FirstScreen" headerMode= "none">
                <Stack.Screen name="FirstScreen" options={{headerShown:false}} component={FirstScreen}/>
                <Stack.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen}/>
                <Stack.Screen name="OCRScan"  options={{headerShown:false}} component={OCRScreen}/>
                <Stack.Screen name="ORCRScan"  options={{headerShown:false}} component={ORCRScreen}/>
                <Stack.Screen name="Records" options={{headerShown:false}} component={Records}/>
                <Stack.Screen name="FormScreen" options={{headerShown:false}} component={FormScreen}/>
                <Stack.Screen name="ViolationScreen" options={{headerShown:false}} component={Violations}/>
                <Stack.Screen name="Profile" options={{headerShown:false}} component={Profile}/>
                <Stack.Screen name='ForgotPass' options={{headerShown:false}} component={ForgotPass}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;