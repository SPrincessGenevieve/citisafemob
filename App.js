import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import store from "./plugins/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
