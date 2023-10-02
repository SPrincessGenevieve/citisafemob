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
import moment from "moment";
import Confirm from "./ConfirmScreen";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Octicons";
import Search from "react-native-vector-icons/EvilIcons";
import Ant from "react-native-vector-icons/AntDesign";
import Light from "react-native-vector-icons/FontAwesome5";
import Circle from "react-native-vector-icons/Entypo";
import MapLocation from "../components/MapLocation";
import * as Location from "expo-location";
import ColorSelector from "../components/ColorSelector";
import ViolationCheck from "../components/ViolationCheck";
import violationData from "./../components/ViolationList.json";
import { useTheme } from "react-native-paper";
import PreviewComponent from "../components/PreviewComponent";

function FormScreen({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [cat1, setCat1] = useState(true);
  const [cat2, setCat2] = useState(true);
  const [cat3, setCat3] = useState(true);
  const [cat4, setCat4] = useState(true);
  const [cat5, setCat5] = useState(true);
  const [location, setLocation] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [mfrtaTctNo, setMfrtaTctNo] = useState("");
  const [currentTime, setCurrentTime] = useState(moment().format("hh:mm A"));
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [showMap, setShowMap] = useState(true);
  const [form, setForm] = useState(false);
  const [isAtLeastOneChecked, setIsAtLeastOneChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [violation, setViolation] = useState(false);
  const [checkedViolations, setCheckedViolations] = useState([]);
  const [preview, setPreview] = useState(false);
  const ocrText = useSelector((state) => state.infoText.extractedInfo);
  const ocrTextOCR = useSelector((state) => state.infoTextOCR.extractedInfo);

  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  const filteredData = violationData.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateMfrtaTctNo = () => {
    const year = moment().format("YYYY");
    const month = moment().format("MM");
    const unique = generateUniqueNumber().toString().padStart(2, "0");
    const tctNo = `${year}${month}${unique}`;
    setMfrtaTctNo(tctNo);
  };

  useEffect(() => {
    generateMfrtaTctNo();
  }, []);

  let uniqueNumber = 1;

  const generateUniqueNumber = () => {
    return uniqueNumber++;
  };

  useEffect(() => {
    const fetchTime = () => {
      const currentTimeFormatted = moment().format("hh:mm A");
      setCurrentTime(currentTimeFormatted);
    };

    const fetchDate = () => {
      const currentDateFormatted = moment().format("YYYY-MM-DD");
      setCurrentDate(currentDateFormatted);
    };

    fetchTime();
    fetchDate();
  }, []);

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

  const handleTicket = () => {
    navigation.navigate("TicketScreen");
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
            {preview ? (
              <View
                style={{
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                  onPress={() => setPreview(!preview)}
                >
                  <Ant size={30} name="leftcircleo"></Ant>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 20,
                      fontSize: 20,
                      color: "green",
                    }}
                  >
                    BACK
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 45,
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "#367717",
                      }}
                    >
                      Preview
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: "grey",
                      }}
                    >
                      Please check all of the information is correct before you
                      submit the form.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#E4FAD9",
                    height: "100%",
                    padding: 40,
                  }}
                >
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#038855",
                          fontWeight: "bold",
                        }}
                      >
                        Personal Information
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <PreviewComponent
                        title={"MFRTA TICKET NO."}
                        value={mfrtaTctNo}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"DATE"}
                        value={currentDate}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"LAST NAME, FIRST NAME, MIDDLE NAME"}
                        value={ocrText.name}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"DATE OF BIRTH"}
                        value={ocrText.dateOfBirth}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"SEX"}
                        value={ocrText.sex}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"NATIONALITY"}
                        value={ocrText.nationality}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"WEIGHT"}
                        value={ocrText.weight}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"HEIGHT"}
                        value={ocrText.height}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"ADDRESS"}
                        value={ocrText.address}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"LICENSE NO."}
                        value={ocrText.licenseNumber}
                      ></PreviewComponent>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#038855",
                          fontWeight: "bold",
                        }}
                      >
                        Vehicle Information
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                      <PreviewComponent
                        title={"REGISTERED OWNER"}
                        value={ocrTextOCR.complete_owners_name}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"PLATE NO."}
                        value={ocrTextOCR.plate_no}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"MAKE"}
                        value={ocrTextOCR.make}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"CLASS"}
                        value={"E CONNECT PANI"}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"MODEL"}
                        value={ocrTextOCR.series}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"CONTACT NO."}
                        value={ocrTextOCR.telephone_no_contact_details}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"COLOR"}
                        value={"E CONNECT PANI"}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"BODY MARKS"}
                        value={"E CONNECT PANI"}
                      ></PreviewComponent>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#038855",
                          fontWeight: "bold",
                        }}
                      >
                        Violation Information
                      </Text>
                    </View>
                    <View style={{}}>
                      <PreviewComponent
                        title={"APPREHENDING OFFICER"}
                        value={"E CONNECT PANI"}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"TIME"}
                        value={currentTime}
                      ></PreviewComponent>
                      <PreviewComponent
                        title={"PLACE OF VIOLATION"}
                        value={selectedPin.address}
                      ></PreviewComponent>
                      <Text style={{ color: "grey", marginTop: 20 }}>
                        TRAFFIC RULES VIOLATION
                      </Text>
                      {checkedViolations.map((checkedViolation, index) => (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 20,
                            marginTop: 10,
                          }}
                          key={index}
                        >
                          <Icon
                            name="dot-fill"
                            style={{ marginRight: 10, marginTop: 3 }}
                          ></Icon>
                          <Text
                            style={{ fontSize: 20, fontWeight: "bold" }}
                            key={index}
                          >
                            {checkedViolation}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <ConstButton
                      onPress={handleTicket}
                      title={"Print Ticket"}
                      height={50}
                    ></ConstButton>
                  </View>
                </View>
              </View>
            ) : null}
            {violation ? (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                  onPress={() => setViolation(!violation)}
                >
                  <Ant size={30} name="leftcircleo"></Ant>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 20,
                      fontSize: 20,
                      color: "green",
                    }}
                  >
                    BACK
                  </Text>
                </TouchableOpacity>
                <View style={{}}>
                  <View style={{ padding: 20 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: 600,
                      }}
                    >
                      You are hereby cited for committing traffic violation/s as
                      indicated hereunder
                    </Text>
                  </View>
                </View>
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
                      onPress={() =>
                        setPreview(!preview) &
                        setViolation(!violation) &
                        Keyboard.dismiss() &
                        scrollToTop()
                      }
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
                  <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginRight: 80,
                        color: "grey",
                      }}
                    >
                      Please fill out the relevant information in each section
                    </Text>
                    <Text style={{ marginTop: 30, color: "grey" }}>
                      Fields marked with * are mandatory
                    </Text>
                  </View>
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
                          text={"MFRTA TCT No*"}
                          editable={false}
                          required
                          value={mfrtaTctNo}
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          marginTop={25}
                          value={currentDate}
                          text="Date*"
                          required
                          editable={false}
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          marginTop={25}
                          value={ocrText.name}
                          autoCapitalize="characters"
                          text="Last Name, First Name, Middle Name*"
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          value={ocrText.dateOfBirth}
                          text={"Date of Birth*"}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Sex*"}
                          value={ocrText.sex}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Nationality*"}
                          value={ocrText.nationality}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Weight*"}
                          value={ocrText.weight}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Height*"}
                          value={ocrText.height}
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Address*"}
                          value={ocrText.address}
                          marginTop={25}
                          required
                          multiline={true}
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Driver's License Number*"}
                          value={ocrText.licenseNumber}
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
                        value={ocrTextOCR.complete_owners_name}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Plate Number*"}
                        value={ocrTextOCR.plate_no}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Make*"}
                        value={ocrTextOCR.make}
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
                        value={ocrTextOCR.series}
                        marginTop={25}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Contact No.*"}
                        value={ocrTextOCR.telephone_no_contact_details}
                        marginTop={25}
                        marginBottom={25}
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
                        value="ANNA NICOLE GABRIENTO"
                        required
                        editable={false}
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Time of Violation*"}
                        value={currentTime}
                        editable={false}
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
                          multiline={true}
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
