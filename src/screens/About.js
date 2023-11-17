import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View, Linking } from "react-native";
import logo from "./../../assets/logo.png";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";

function About(props) {
  const websiteURL =
    "https://www.figma.com/files/recents-and-sharing/recently-viewed?fuid=1148900068494730290";

  const openWebsite = () => {
    Linking.openURL(websiteURL).catch((err) =>
      console.error("Failed to open the website: ", err)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <KeyboardWithoutWrapper>
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Image source={logo} style={{ height: 100, width: 250 }}></Image>
          </View>
          <View style={{ height: "auto", marginTop: 20 }}>
            <Text style={styles.title}>eTCMF: Your E-Ticketing Solution</Text>
            <Text style={styles.subtitle}>Version: 1.0</Text>
          </View>
          <View style={styles.welcome}>
            <Text style={{ textAlign: "center", fontSize: 17 }}>
              Streamline citation issuance, enhance security, and improve
              transparency for Manolo Fortich's traffic enforcers.
            </Text>
          </View>
          <View style={styles.welcome}>
            <Text
              style={{ textAlign: "justify", fontSize: 20, fontWeight: "bold" }}
            >
              Contact Information
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 17 }}>
              Email: eTCMFBukidnon@gmail.com
            </Text>
            <Text style={{ textAlign: "justify", fontSize: 17 }}>
              Phone: 09927978238
            </Text>
            <TouchableOpacity
              onPress={openWebsite}
              style={{ textAlign: "justify", fontSize: 17 }}
            >
              <Text style={{ textAlign: "justify", fontSize: 17 }}>
                Website: https://sprincessgenevieve.github.io/citisafeweb/#/
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardWithoutWrapper>
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 1,
  },
  subtitle: {
    textAlign: "center",
  },
  welcome: {
    marginTop: 25,
    padding: 10,
    paddingHorizontal: 20,
  },
});
