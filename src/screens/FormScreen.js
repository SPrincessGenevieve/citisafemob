import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import ConstInput from "../components/ConstInput";
import ConstButton from "../components/ConstButton";
import Confirm from "./ConfirmScreen";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Octicons";
import Search from "react-native-vector-icons/EvilIcons";
import Ant from "react-native-vector-icons/AntDesign";
import Light from "react-native-vector-icons/FontAwesome5";
import Circle from "react-native-vector-icons/Entypo";
import moment from "moment";
import predefinedColors from "./../components/PredefineColor.json";
import MapLocation from "../components/MapLocation";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ColorSelector from "../components/ColorSelector";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import ViolationCheck from "../components/ViolationCheck";
import violationData from "./../components/ViolationList.json";

function FormScreen({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true); // Initial state set to true (ascending)
  const [cat1, setCat1] = useState(true);
  const [cat2, setCat2] = useState(true);
  const [cat3, setCat3] = useState(true);
  const [cat4, setCat4] = useState(true);
  const [cat5, setCat5] = useState(true);
  const [location, setLocation] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [form, setForm] = useState(false);
  const [isAtLeastOneChecked, setIsAtLeastOneChecked] = useState(false); // New state
  const [searchQuery, setSearchQuery] = useState("");
  const [violation, setViolation] = useState(false);
  const [checkedViolations, setCheckedViolations] = useState([]);
  const scrollViewRef = useRef(null);
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  const filteredData = violationData.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (text, isChecked) => {
    if (isChecked) {
      setCheckedViolations((prev) => [...prev, text]);
    } else {
      setCheckedViolations((prev) =>
        prev.filter((violation) => violation !== text)
      );
    }
  };

  const handleMapPress = async (e) => {
    const newPin = {
      coordinate: e.nativeEvent.coordinate,
      address: await getAddressFromCoordinates(e.nativeEvent.coordinate),
    };
    setSelectedPin(newPin);
    onUpdateLocation(e.nativeEvent.coordinate);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  const getAddressFromCoordinates = async (coordinate) => {
    try {
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });

      if (addressResponse && addressResponse.length > 0) {
        const { name, street, region, city, postalCode, country } =
          addressResponse[0];
        return `${name || ""} ${street || ""}, ${region || ""}, ${
          city || ""
        }, ${postalCode || ""}, ${country || ""}`;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
    return "Address not found";
  };

  useEffect(() => {
    if (location) {
      getAddressFromCoordinates(location).then((currentAddress) =>
        setCurrentAddress(currentAddress)
      );
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      getAddressFromCoordinates(location).then((currentAddress) =>
        setCurrentAddress(currentAddress)
      );
    }
  }, [location]);

  useEffect(() => {
    setIsAtLeastOneChecked(checkedViolations.length > 0);
  }, [checkedViolations]);

  const toggleSortIcon = () => {
    setSortAsc(!sortAsc); // Toggle the state between true and false
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <KeyboardWithoutWrapper>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              height: "auto",
            }}
          >
            <View style={{ padding: 20 }}>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}
              >
                You are hereby cited for committing traffic violation/s as
                indicated hereunder
              </Text>
            </View>

            {violation ? (
              <>
                <View // SEARCH BAR AND SORTS
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5%",
                  }}
                >
                  <Search
                    style={{
                      fontSize: 30,
                      position: "absolute",
                      left: 15,
                      top: 5,
                    }}
                    name="search"
                  ></Search>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 20,
                      fontSize: 15,
                      padding: 5,
                      paddingLeft: 40,
                      width: "80%",
                    }}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="search violation"
                  />
                  <View style={{ width: 40, height: 40, marginLeft: 10 }}>
                    <TouchableOpacity onPress={toggleSortIcon}>
                      <Icon
                        name={sortAsc ? "sort-asc" : "sort-desc"}
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ padding: 20 }}>
                  <Text style={styles.subtitle}>
                    Please fill out the relevant information in each section
                  </Text>
                  <Text style={styles.subtitle}>
                    Fields marked with * are mandatory
                  </Text>
                </View>

                <View //========================================================CATEGORY 1
                >
                  {cat1 ? (
                    <View>
                      <View //BOX VIOLATION CONTAINER
                        style={{
                          width: "100%",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <View style={styles.box}>
                          {checkedViolations.length > 0 ? (
                            checkedViolations.map((checkedViolation, index) => (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginLeft: 20,
                                  marginTop: 10,
                                }}
                                key={index}
                              >
                                <Circle
                                  name="controller-record"
                                  style={{ marginRight: 10, fontSize: 6 }}
                                ></Circle>
                                <Text key={index}>{checkedViolation}</Text>
                              </View>
                            ))
                          ) : (
                            <View
                              style={{
                                alignItems: "center",
                                paddingVertical: 20,
                                justifyContent: "center",
                              }}
                            >
                              <Text>No selected violation...</Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.category}>
                        <TouchableOpacity
                          style={styles.drop}
                          onPress={() => setCat1(!cat1)}
                        >
                          <Ant
                            name="filetext1"
                            style={[styles.icon, { color: "green" }]}
                          ></Ant>
                          <Text style={styles.textSelect}>
                            Licensing and Documentation
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.category}>
                        <TouchableOpacity
                          style={styles.drop}
                          onPress={() => setCat1(!cat1)}
                        >
                          <Ant
                            name="filetext1"
                            style={[styles.icon, { color: "black" }]}
                          ></Ant>
                          <Text style={{ color: "black" }}>
                            Licensing and Documentation
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                <View //========================================================CATEGORY 2
                >
                  {cat2 ? (
                    <View>
                      <View style={styles.category}>
                        <TouchableOpacity
                          style={styles.drop}
                          onPress={() => setCat2(!cat2)}
                        >
                          <Light
                            name="traffic-light"
                            style={[styles.icon, { color: "green" }]}
                          ></Light>
                          <Text style={styles.textSelect}>
                            Traffic Rule Violations
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 25, marginTop: 20 }}>
                        {filteredData.map((item) => (
                          <ViolationCheck
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            isChecked={checkedViolations.includes(item.text)}
                            handleCheckboxChange={(isChecked) =>
                              handleCheckboxChange(item.text, isChecked)
                            }
                          />
                        ))}
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.category}>
                        <TouchableOpacity
                          style={styles.drop}
                          onPress={() => setCat2(!cat2)}
                        >
                          <Light
                            name="traffic-light"
                            style={styles.icon}
                          ></Light>
                          <Text>Traffic Rule Violations</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                >
                  <View style={{ width: "70%", height: "100%" }}>
                    <ConstButton
                      title="Preview Ticket"
                      onPress={() => setViolation(!violation)}
                      height={50}
                    ></ConstButton>
                  </View>
                </View>
              </>
            ) : null}

            <View //========================================================CATEGORY 3
            >
              {cat3 ? (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat3(!cat3)}
                    >
                      <Icon
                        name="check"
                        style={[styles.icon, { color: "green" }]}
                      ></Icon>
                      <Text style={styles.textSelect}>
                        Personal Information
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >
                      <View style={{ width: "90%" }}>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"First Name*"}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Last Name*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Date of Birth*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Sex*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Nationality*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Weight*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Height*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Address*"}
                          marginTop={25}
                          required
                          multiline={true}
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Driver's License Number*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Contact No.*"}
                          marginTop={25}
                          marginBottom={25}
                          required
                        ></ConstInput>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat3(!cat3)}
                    >
                      <Icon name="check" style={styles.icon}></Icon>
                      <Text>Personal Information</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View //========================================================CATEGORY 4
            >
              {cat4 ? (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat4(!cat4)}
                    >
                      <Icon
                        name="check"
                        style={[styles.icon, { color: "green" }]}
                      ></Icon>
                      <Text style={styles.textSelect}>Vehicle Information</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <View style={{ width: "90%" }}>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Registered Owner*"}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Plate Number*"}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Make*"}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Class*"}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Model*"}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "grey",
                            fontFamily: "Roboto-Light",
                            marginLeft: 7,
                            marginTop: 20,
                            marginBottom: -30,
                            fontWeight: "bold",
                          }}
                        >
                          Vehicle Color*
                        </Text>
                        <ColorSelector></ColorSelector>
                      </View>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Body Markings*"}
                        marginTop={-35}
                        marginBottom={25}
                        required
                      ></ConstInput>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat4(!cat4)}
                    >
                      <Icon name="check" style={styles.icon}></Icon>
                      <Text>Vehicle Information</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View //========================================================CATEGORY 5
            >
              {cat5 ? (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat5(!cat5)}
                    >
                      <Icon
                        name="check"
                        style={[styles.icon, { color: "green" }]}
                      ></Icon>
                      <Text style={styles.textSelect}>
                        Violation Information
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <View style={{ width: "90%" }}>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Apprehending Officer*"}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Time of Violation*"}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <View style={{ marginTop: 30 }}>
                        <View style={{ height: 400 }}>
                          <MapLocation
                            location={location}
                            selectedPin={selectedPin}
                            currentAddress={currentAddress}
                            handleMapPress={handleMapPress}
                            getLocation={getLocation}
                            setShowMap={setShowMap}
                            form={form}
                            setForm={setForm}
                          ></MapLocation>
                        </View>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Place of Violation*"}
                          marginTop={25}
                          marginBottom={25}
                          required
                          value={selectedPin ? selectedPin.address : "N/A"}
                        ></ConstInput>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.category}>
                    <TouchableOpacity
                      style={styles.drop}
                      onPress={() => setCat5(!cat5)}
                    >
                      <Icon name="check" style={styles.icon}></Icon>
                      <Text>Violation Information</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              <View style={{ width: "70%", height: "100%" }}>
                <ConstButton
                  title="Next"
                  onPress={() => {
                    Keyboard.dismiss(); // Dismiss the keyboard
                    scrollToTop(); // Scroll to the top
                    setViolation(!violation);
                  }}
                  height={50}
                ></ConstButton>
              </View>
            </View>
          </View>
        </KeyboardWithoutWrapper>
      </ScrollView>
    </View>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  category: {
    height: 50,
    width: "100%",
    backgroundColor: "#D0FFCC",
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 1,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
  drop: {
    flexDirection: "row",
  },
  box: {
    width: "90%",
    height: "auto",
    backgroundColor: "#D0FFCC",
    display: "flex",
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  icon: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 50,
    color: "#787878",
  },
  textSelect: {
    color: "green",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#7F7F7F",
  },
});
