import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import FirstScreen from "./src/screens/Authentication/Login/FirstScreen";
import OCRScreen from "./src/screens/OCRScreen";
import Records from "./src/screens/Records";
import ORCRScreen from "./src/screens/ORCRScreen";
import FormScreen from "./src/screens/FormScreen";
import Violations from "./src/screens/Violations";
import Profile from "./src/screens/Profile";
import ForgotPass from "./src/screens/Authentication/ForgotPass/ForgotPass";
import RecordDetails from "./src/screens/RecordDetails";
import CameraScanCOR from "./src/components/CameraScanCOR";
import ColorSelector from "./src/components/ColorSelector";
import MapLocation from "./src/components/MapLocation";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LogsScreen from "./src/screens/LogsScreen";
import IntroLicense from "./src/components/IntroLicense";
import IntroOCR from "./src/components/IntroOCR";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: "#3E7C1F",
        headerShown: false,
        activeTintColor: "#007AFF",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: "#3E7C1F",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          tabBarActiveTintColor: "#3E7C1F",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarActiveTintColor: "#3E7C1F",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#3E7C1F",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen" headerMode="none">
      <Stack.Screen
        name="FirstScreen"
        options={{ headerShown: false }}
        component={FirstScreen}
      />
      <Stack.Screen
        name="IntroLicense"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#518638",
          },
          headerTintColor: "#ffff",
        }}
        component={IntroLicense}
      />
      <Stack.Screen
        name="IntroOCR"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#518638",
          },
          headerTintColor: "#ffff",
        }}
        component={IntroOCR}
      />
      <Stack.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OCRScan"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#518638",
          },
          headerTintColor: "#ffff",
        }}
        component={OCRScreen}
      />
      <Stack.Screen
        name="CameraScanOCR"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#518638",
          },
          headerTintColor: "#ffff",
        }}
        component={CameraScanCOR}
      />
      <Stack.Screen
        name="Records"
        options={{ headerShown: false }}
        component={Records}
      />
      <Stack.Screen
        name="FormScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#518638",
          },
          headerTintColor: "#ffff",
        }}
        component={FormScreen}
      />
      <Stack.Screen
        name="ViolationScreen"
        options={{ headerShown: false }}
        component={Violations}
      />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <Stack.Screen
        name="RecordDetails"
        options={{ headerShown: false }}
        component={RecordDetails}
      />
      <Stack.Screen
        name="ColorSelector"
        options={{ headerShown: false }}
        component={ColorSelector}
      />
      <Stack.Screen
        name="MapLocation"
        options={{ headerShown: false }}
        component={MapLocation}
      />
      <Stack.Screen
        name="ForgotPass"
        options={{ headerShown: false }}
        component={ForgotPass}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
