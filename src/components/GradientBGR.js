import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function GradientBackground(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["white", "white", "white"]}
        style={{ height: "100%", width: "100%", position: "absolute" }}
        start={[0, 0]}
        end={[0, 1]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default GradientBackground;
