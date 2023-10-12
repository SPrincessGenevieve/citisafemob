import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import OCRImage from "./../../assets/OCR_Image.png";
import ConstButton from "./ConstButton";

function IntroOCR({ navigation }) {
  const handleOCRSreen = () => {
    navigation.navigate("CameraScanOCR");
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "white",
        height: "100%",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={styles.title}>eTCMF</Text>
        <Text style={styles.title}>Car Verification</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          The Car Registration will be converted into text
        </Text>
        <Text style={styles.subtitle}>
          Please place the document in the frame as clear as possible
        </Text>
      </View>
      <View style={styles.id}>
        <Image
          style={{ marginTop: 150, width: 225, height: 280 }}
          source={OCRImage}
        ></Image>
      </View>
      <View
        style={{
          display: "flex",
          marginTop: "80%",
        }}
      >
        <Text style={styles.subtitlebottom}>
          Every Driver will get the same experience
        </Text>
        <Text style={styles.subtitlebottom}>
          The information will be encrypted and secured
        </Text>
      </View>
      <View style={{ width: "90%", marginTop: 30 }}>
        <ConstButton
          onPress={handleOCRSreen}
          title={"Start Identification"}
          marginLeftText={10}
          height={60}
        ></ConstButton>
      </View>
    </View>
  );
}

export default IntroOCR;

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
  },
  subtitlebottom: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    bottom: 0,
  },
  id: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
    width: "100%",
  },
});
