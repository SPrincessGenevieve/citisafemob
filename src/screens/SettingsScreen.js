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
import { useDispatch } from "react-redux";
import { setEmptyFinalVehicle } from "../components/camera/infoSliceCOR";
import { setEmptyFinalDriver } from "../components/camera/infoSlice";
import { setLogout } from "./Authentication/authSlice";

function SettingsScreen({ navigation }) {
  const [logout1, setLogout1] = useState(false);
  const dispatch = useDispatch();

  const handlePrivacy = () => {
    navigation.navigate("PrivacyScreen");
  };

  const handleAbout = () => {
    navigation.navigate("AboutScreen");
  };

  const handleLogout = () => {
    // clear all info
    dispatch(setEmptyFinalDriver())
    dispatch(setEmptyFinalVehicle())
    dispatch(setLogout())
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
          <View style={{ position: "absolute" }}>
            <Image
              style={{ height: 90, width: 90, borderRadius: 30 }}
              source={profile}
            ></Image>
          </View>
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
          <View style={{ marginTop: "35%" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Jayde Engracia
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
              marginTop: "50%",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "40%",
              }}
            >
              <ConstButton
                onPress={() => setLogout1(!logout1)}
                title={"Logout"}
                height={50}
              ></ConstButton>
            </View>
          </View>
        </View>
        {logout1 ? (
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
                      onPress={() => setLogout1(!logout1)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "65%",
                        backgroundColor: "#3E7C1F",
                        borderWidth: 2,
                        borderColor: "green",
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                      onPress={handleLogout}
                    >
                      <Text style={{ color: "white" }}>Logout</Text>
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
