import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { SelectList } from "react-native-dropdown-select-list";

function ConstDrop({
  item,
  text,
  marginTop,
  marginBottom,
  setSelected,
  data,
  save,
}) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./../../assets/fonts/Roboto-Light.ttf"),
  });

  const [showPassword, setShowPassword] = useState(false);

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "70%",
          marginBottom: marginBottom,
        }}
      >
        <SelectList
          boxStyles={{
            width: 353,
            height: 50,
            borderColor: "#C5C6CC",
          }}
          dropdownStyles={{
            width: 353,
            borderWidth: 1,
            borderColor: "#C5C6CC",
          }}
          dropdownItemStyles={{
            width: 353,
            borderColor: "#C5C6CC",
          }}
          setSelected={setSelected}
          data={data}
          save={save}
        ></SelectList>
      </View>
    </>
  );
}

export default ConstDrop;
