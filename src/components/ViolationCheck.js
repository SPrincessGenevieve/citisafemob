import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "expo-checkbox";

function ViolationCheck({ text, isChecked, handleCheckboxChange }) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
    >
      <CheckBox
        borderColor="#D9D9D9"
        color={isChecked ? "green" : "#D9D9D9"}
        value={isChecked}
        onValueChange={handleCheckboxChange}
        style={{
          height: 25,
          width: 25,
          borderWidth: 2,
          borderRadius: 5,
        }}
      />
      <Text style={{ fontSize: 15, marginLeft: 20, color: "black" }}>
        {text}
      </Text>
    </View>
  );
}

export default ViolationCheck;
