import React from "react";
import { Toucha } from "react-native";
import { Text, TextInput, View } from "react-native";
import { useFonts } from "expo-font";

function ConstInputShort({
  editable,
  disabled,
  marginRight,
  marginLeft,
  width,
  placeholder,
  text,
  onPress,
  autoCapitalize,
  value,
  onChangeText,
}) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./../../assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: 20,
      }}
    >
      <View style={{ zIndex: 1, width: 150 }}>
        <Text
          style={{
            fontSize: 13,
            color: "black",
            marginLeft: 7,
            position: "absolute",
            backgroundColor: "white",
            paddingHorizontal: 10,
            marginTop: -10,
          }}
        >
          {text}
        </Text>
      </View>

      <TextInput
        editable={editable}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="grey"
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        style={{
          color: "black",
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "black",
          fontSize: 15,
          width: width,
          height: 45,
          paddingHorizontal: 10,
        }}
      ></TextInput>
    </View>
  );
}

export default ConstInputShort;
