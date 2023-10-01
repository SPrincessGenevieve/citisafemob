import React from "react";
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

function SettingsScreen(props) {
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
            <Text style={{ marginTop: 170, fontWeight: "bold", fontSize: 20 }}>
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
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;
