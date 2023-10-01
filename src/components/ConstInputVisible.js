import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import ConstButton from "./ConstButton";

function ConstInput({
  secureTextEntry,
  onChangeText,
  marginBottom,
  textAlign,
  placeholder,
  text,
  editable,
  marginTop,
  autoCapitalize,
  value,
  type,
}) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./../../assets/fonts/Roboto-Light.ttf"),
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ width: "100%", marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 15,
          color: "black",
          marginLeft: 7,
          marginTop: marginTop,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={value}
          type={type}
          placeholder={placeholder}
          placeholderTextColor="#C5C6CC"
          autoCapitalize={autoCapitalize}
          editable={editable}
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on the showPassword state
          onChangeText={onChangeText}
          style={{
            color: "grey",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: "#C5C6CC",
            fontSize: 17,
            flex: 1, // Take up remaining space
            textAlign: textAlign,
            marginBottom: marginBottom,
          }}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            display: "flex",
            position: "absolute",
            alignItems: "flex-end",
            marginLeft: 280,
          }}
        >
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConstInput;
