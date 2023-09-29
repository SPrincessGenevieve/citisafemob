import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native";
import ConstInput from "../components/ConstInput";
import Icon from "react-native-vector-icons/AntDesign";

function Profile({ onPress, handleLogout }) {
  const [edit, setEdit] = useState(true);

  return (
    <View>
      <Text>PROFILE</Text>
    </View>
  );
}

export default Profile;

styles = StyleSheet.create({
  icon: {
    fontSize: 40,
    margin: 10,
    color: "white",
  },
});
