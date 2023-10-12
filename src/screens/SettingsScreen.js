import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import profile from "./../../assets/profile.png";
import Icon from "react-native-vector-icons/AntDesign";
import ConstButton from "../components/ConstButton";
import ConstButtonShort from "../components/ConstButtonShort";

function SettingsScreen({ navigation }) {
  const [logout, setLogout] = useState(false);

  handlePrivacy = () => {
    navigation.navigate("PrivacyScreen");
  };

  handleAbout = () => {
    navigation.navigate("AboutScreen");
  };

  handleLogout = () => {
    navigation.navigate("FirstScreen");



  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <View
          style={{
            height: "24%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 90, width: 90, borderRadius: 30 }}
            source={profile}
          ></Image>


          
          <View
            style={{
              position: "absolute",
              display: "flex",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#3E7C1F",
                borderRadius: 20,
                marginTop: 70,
                marginLeft: 70,
                padding: 2,
              }}
            >
              <Icon style={{ fontSize: 20, color: "white" }} name="edit"></Icon>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              height: "100%",
            }}
          >
            <Text style={{ marginTop: 180, fontWeight: "bold", fontSize: 20 }}>
              John B. Doe
            </Text>
          </View>
        </View>
        <View style={{ height: "100%" }}>
          <View
            style={{
              height: 60,
              justifyContent: "center",
              marginTop: 20,
              borderTopColor: "#D9D9D9",
              borderBottomColor: "#D9D9D9",
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
              onPress={handlePrivacy}
              style={{
                flexDirection: "row",
                marginLeft: 25,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15 }}>Privary and Security</Text>
              <Icon
                name="right"
                style={{ marginLeft: 210, fontSize: 20, color: "grey" }}
              ></Icon>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 60,
              justifyContent: "center",
              borderBottomColor: "#D9D9D9",
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
              onPress={handleAbout}
              style={{
                flexDirection: "row",
                marginLeft: 25,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15 }}>About</Text>
              <Icon
                name="right"
                style={{ marginLeft: 305, fontSize: 20, color: "grey" }}
              ></Icon>
            </TouchableOpacity>
            
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "80%",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
              }}
            >

            </View>
          </View>
        </View>
        {logout ? (
          <>
            <View
              style={{ width: "100%", height: "100%", position: "absolute" }}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "black",
                  width: "100%",
                  height: "100%",
                  opacity: 0.5,
                }}
              ></View>

              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  marginTop: "80%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    height: "20%",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    You are about to logout
                  </Text>
                  <Text style={{ color: "grey" }}>
                    Please confirm your selection
                  </Text>
                  <View
                    style={{
                      width: "35%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "65%",
                        backgroundColor: "white",
                        borderWidth: 2,
                        borderColor: "green",
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                      onPress={() => setLogout(!logout)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
}

export default SettingsScreen;
