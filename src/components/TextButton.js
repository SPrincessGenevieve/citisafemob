import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function TextButton({ onPress }) {
  return (
    <>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          marginTop: 10,
          width: "100%",
          display: "flex",
        }}
        onPress={onPress}
      >
        <Text style={{ color: "#353904", fontSize: 17 }}>Forgot Password?</Text>
      </TouchableOpacity>
    </>
  );
}

export default TextButton;
