import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

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
  required,
  borderRadius,
  minHeight, // New prop for minimum height
  multiline,
}) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./../../assets/fonts/Roboto-Light.ttf"),
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Text
        style={{
          fontSize: 15,
          color: "grey",
          fontFamily: "Roboto-Light",
          marginLeft: 7,
          marginTop: marginTop,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          required={required}
          value={value}
          type={type}
          placeholder={placeholder}
          placeholderTextColor="#C5C6CC"
          autoCapitalize={autoCapitalize}
          editable={editable}
          onChangeText={onChangeText}
          style={{
            color: "black",
            borderWidth: 1,
            borderRadius: borderRadius,
            padding: 10,
            borderColor: "#C5C6CC",
            fontSize: 17,
            flex: 1, // Take up remaining space
            textAlign: textAlign,
            marginBottom: marginBottom,
            minHeight: minHeight, // Set a minimum height
          }}
          multiline={multiline} // Enable multiline input
          numberOfLines={1} // Set an initial number of lines
        />
      </View>
    </>
  );
}

export default ConstInput;
