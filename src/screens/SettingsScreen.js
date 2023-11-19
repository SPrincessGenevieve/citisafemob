import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import profile from "./../../assets/profile.png";
import Icon from "react-native-vector-icons/AntDesign";
import ConstButton from "../components/ConstButton";
import { useDispatch, useSelector } from "react-redux";
import { setEmptyFinalVehicle } from "../components/camera/infoSliceCOR";
import { setEmptyFinalDriver } from "../components/camera/infoSlice";
import {
  setEnforcerFirstName,
  setEnforcerLastName,
  setEnforcerMiddleName,
  setEnforcerPosition,
  setEnforcerProfilePicture,
  setEnforcerUsername,
  setLogout,
} from "./Authentication/authSlice";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import ConstInput from "../components/ConstInputShort";
import axios from "../../plugins/axios";
import ImagePicker from "react-native-image-crop-picker";

function SettingsScreen({ navigation }) {
  const [logout1, setLogout1] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const Token = useSelector((state) => state.auth.token);
  const officer = useSelector((state) => state.auth.enforcer);
  const isOnline = useSelector((state) => state.auth.Online);

  const handlePrivacy = () => {
    navigation.navigate("PrivacyScreen");
  };

  const handleAbout = () => {
    navigation.navigate("About");
  };

  const handleBluetoothApp = () => {
    navigation.navigate("Bluetooth");
  };

  const handleLogout = () => {
    // clear all info
    dispatch(setEmptyFinalDriver());
    dispatch(setEmptyFinalVehicle());
    dispatch(setLogout());
  };

  const handleImagePicker = async () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        const base64Image = `data:${image.mime};base64,${image.data}`;

        dispatch(setEnforcerProfilePicture(base64Image));
      })
      .catch((error) => {
        console.error("ImagePicker Error: ", error);
      });
  };

  const handleUpdateUserInfo = () => {
    const ID = officer.id;

    const formData = new FormData();
    formData.append("profile_picture", {
      uri: officer.profile_picture,
      type: "image/jpeg", // or the actual type of your image
      name: "profile_picture.jpg",
    });

    formData.append("username", officer.username);
    formData.append("first_name", officer.first_name);
    formData.append("middle_name", officer.middle_name);
    formData.append("last_name", officer.last_name);
    formData.append("id", officer.id);
    formData.append("position", officer.position);

    axios
      .patch(`accounts/users/${ID}/`, formData, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        alert("Successfully Update User");
        setEdit(!edit);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed Update User");
        setEdit(!edit);
      });
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {edit ? (
        <>
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <View style={{ display: "flex", zIndex: 1 }}>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: "100%",
                    height: 100,
                    paddingTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setEdit(!edit)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Icon size={30} name="back"></Icon>
                    <Text style={{ marginLeft: 10, fontSize: 20 }}>BACK</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 80,
                    backgroundColor: "white",
                  }}
                >
                  <View>
                    <Image
                      style={{ height: 90, width: 90, borderRadius: 30 }}
                      source={
                        officer.profile_picture
                          ? { uri: officer.profile_picture }
                          : require("./../../assets/default_profile.png")
                      }
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
                        marginTop: 80,
                        marginLeft: 70,
                        padding: 2,
                      }}
                      onPress={handleImagePicker}
                    >
                      <Icon
                        style={{ fontSize: 20, color: "white" }}
                        name="edit"
                      ></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <KeyboardWithoutWrapper>
                <View style={{ alignItems: "center", marginTop: "50%" }}>
                  <View
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      zIndex: 10,
                    }}
                  >
                    <ConstInput
                      text={"First name"}
                      placeholder="First name"
                      width={300}
                      value={officer.first_name}
                      onChangeText={(text) => {
                        dispatch(setEnforcerFirstName(text));
                      }}
                    ></ConstInput>
                    <ConstInput
                      text={"Middle name"}
                      placeholder="Middle name"
                      width={300}
                      value={officer.middle_name}
                      onChangeText={(text) => {
                        dispatch(setEnforcerMiddleName(text));
                      }}
                    ></ConstInput>
                    <ConstInput
                      text={"Last name"}
                      placeholder="Last name"
                      width={300}
                      value={officer.last_name}
                      onChangeText={(text) => {
                        dispatch(setEnforcerLastName(text));
                      }}
                    ></ConstInput>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 300,
                      }}
                    >
                      <View>
                        <ConstInput
                          text={"Position"}
                          placeholder="Position"
                          width={300}
                          value={officer.position}
                          onChangeText={(text) => {
                            dispatch(setEnforcerPosition(text));
                          }}
                        ></ConstInput>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: "40%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: 40,
                        backgroundColor: "#3E7C1F",
                        borderWidth: 2,
                        borderColor: "green",
                        borderRadius: 10,
                        marginRight: 20,
                      }}
                      onPress={handleUpdateUserInfo}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardWithoutWrapper>
            </View>
          </View>
        </>
      ) : null}

      <View>
        <View
          style={{
            height: "24%",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View style={{ position: "absolute" }}>
            <Image
              style={{ height: 90, width: 90, borderRadius: 30 }}
              source={
                officer.profile_picture
                  ? { uri: officer.profile_picture }
                  : require("./../../assets/default_profile.png")
              }
            ></Image>
          </View>

          <View style={{ marginTop: "25%" }}>
            <View
              style={{
                position: "absolute",
                display: "flex",
                zIndex: 2,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#3E7C1F",
                  borderRadius: 20,
                  marginLeft: 190,
                  padding: 2,
                  marginTop: -20,
                }}
                onPress={() => setEdit(!edit)}
              >
                <Icon
                  style={{ fontSize: 20, color: "white" }}
                  name="edit"
                ></Icon>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {officer.first_name} {officer.middle_name} {officer.last_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {officer.role}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {officer.position}
            </Text>
          </View>
        </View>

        <View style={{ height: "100%" }}>
          {isOnline ? (
            <>
              {/* privacy */}
              <View style={styles.containerBtn}>
                <TouchableOpacity
                  onPress={handlePrivacy}
                  style={styles.constainerInnerBtn}
                >
                  <View style={styles.InnerBtCon}>
                    <Text style={{ fontSize: 15 }}>Privary and Security</Text>
                    <Icon
                      name="right"
                      style={{ fontSize: 20, color: "grey" }}
                    ></Icon>
                  </View>
                </TouchableOpacity>
              </View>
              {/* about */}
              <View style={styles.containerSubBtn}>
                <TouchableOpacity
                  onPress={handleAbout}
                  style={styles.constainerInnerBtn}
                >
                  <View style={styles.InnerBtCon}>
                    <Text style={{ fontSize: 15 }}>About</Text>
                    <Icon
                      name="right"
                      style={{ fontSize: 20, color: "grey" }}
                    ></Icon>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.containerSubBtn}>
                <TouchableOpacity
                  onPress={handleBluetoothApp}
                  style={styles.constainerInnerBtn}
                >
                  <View style={styles.InnerBtCon}>
                    <Text style={{ fontSize: 15 }}>Printer</Text>
                    <Icon
                      name="right"
                      style={{ fontSize: 20, color: "grey" }}
                    ></Icon>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.containerSubBtn}>
                <TouchableOpacity
                  onPress={handleAbout}
                  style={styles.constainerInnerBtn}
                >
                  <Text style={{ fontSize: 15 }}>About</Text>
                  <Icon
                    name="right"
                    style={{ fontSize: 20, color: "grey" }}
                  ></Icon>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "35%",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "60%",
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
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 5,
              }}
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
                  marginTop: "50%",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    height: "20%",
                    borderRadius: 5,
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
                      marginTop: 15,
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

const styles = StyleSheet.create({
  containerBtn: {
    height: 60,
    justifyContent: "center",
    marginTop: 20,
    borderTopColor: "#D9D9D9",
    borderBottomColor: "#D9D9D9",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  containerSubBtn: {
    height: 60,
    justifyContent: "center",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
  },
  constainerInnerBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  InnerBtCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
});
