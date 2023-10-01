import React from "react";
import { View } from "react-native";
import { Text } from "react-native";

function PreviewComponent({ title, value, key }) {
  return (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      <Text style={{ color: "grey" }}>{title}</Text>
      <Text key={key} style={{ fontWeight: "bold", fontSize: 18 }}>
        {value}
      </Text>
    </View>
  );
}

export default PreviewComponent;
