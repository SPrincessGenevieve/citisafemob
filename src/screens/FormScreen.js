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
import { useDispatch, useSelector } from "react-redux";
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
import axios from '../../plugins/axios'
import { setAddress, setAgencyCodes, setBirthDate, setBloodTypes, setDLCodes, setDriverClassification, setDriverID, setExpirationDate, setFirstName, setGender, setHeight, setLastName, setLicenseNumber, setMiddleInitial, setNationality, setWeight } from "../components/camera/infoSlice";
import { setBodyMarkings, setColor, setFinalVehicle, setMake, setManualDriverID, setOwnerAddress, setOwnerContactNumber, setOwnerName, setPlateNumber, setVehicleClass, setVehicleID, setVehicleModel, setdriverID } from "../components/camera/infoSliceCOR";

function FormScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.auth.token)

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

  // driver details
  const driver = useSelector((state) => state.infoText)
  // vehicel details
  const vehicle = useSelector((state) => state.infoTextOCR)



  // selected violation id's 
  const [violationIDs, setViolationIDs] = useState({
    "violation_id": []
  })


  // datas
  const ocrText = useSelector((state) => state.infoText.finalDriver);
  const ocrTextOCR = useSelector((state) => state.infoTextOCR.finalVehicle);

  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // mao ning violation

  const [violationData1, setViolationData1] = useState([])

  useEffect(() => {
    axios.get('ticket/violation/', {
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      // Filter out only the active penalties
      const activePenalties = response.data.filter(item => item.penalty_ID.status === 'Active');
      setViolationData1(activePenalties);
    }).catch(error => {
      console.log(error);
    });
  }, []);


  const filteredData = violationData1.filter((item) =>
    item.violation_type.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleCheckboxChange = (text, isChecked, ids) => {
    if (isChecked) {
      setCheckedViolations((prev) => [...prev, text]);
      // id
      setViolationIDs(prevState => ({
        violation_id: [...prevState.violation_id, ids]
      }));

      console.log(violationIDs)

    } else {
      setCheckedViolations((prev) =>
        prev.filter((violation) => violation !== text)
      );

      setViolationIDs(prevState => ({
        violation_id: prevState.violation_id.filter(id => id !== ids)
      }));
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


// final screen

  const handleTicket = () => {
    navigation.navigate("TicketScreen");
  };


  const handleNextButton = () => {
    // check if the driver and vehicle registered
    const isDriverExist = driver.isDriverRegisterd
    const isVehicleExist = vehicle.isCarRegistered

    // if driver exist
    if (!isDriverExist) {
      console.log('Not Exist')
      console.log(isDriverExist)

      const drivers = driver.finalDriver
      console.log(drivers)  

      axios.post(`drivers/register/`, drivers, {
        headers: {
          Authorization: `token ${Token}`
        }
      }).then((response) => {
          const id = response.data.id
          dispatch(setManualDriverID(id))
          dispatch(setDriverID(id))
          console.log(drivers)
          alert('Successfully Register Driver')
  
        }).catch((error) => {
          console.log('Error for Drivers')
          console.log(error)
        })


    }

    if (!isVehicleExist) {
      console.log('Vehicle Not Exist')
      console.log(isVehicleExist)

      const vehicles = vehicle.finalVehicle
      console.log(vehicles)

      axios.post(`vehicles/register/`, vehicles, {
        headers: {
          Authorization: `token ${Token}`
        }
      }).then((response) => {
          const id = response.data.id
          dispatch(setVehicleID(id))
          console.log(vehicles)
          alert('Successfully Register Vehicle')
  
        }).catch((error) => {
          console.log('Error for Vehicle')
          console.log(error)
          console.log(vehicles)
        })
    }
    Keyboard.dismiss(); // Dismiss the keyboard
    scrollToTop(); // Scroll to the top
    setViolation(!violation);

  }


// for ticket
  const [trafficViolationID, setTrafficViolationID] = useState("")

  const handlePreviewTicket = () => {

    
    
    const driverID = driver.id
    const vehicleID = vehicle.id

    // first post the traffic violation
    axios.post('ticket/trafficviolation/', violationIDs,{
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      // traffic violation id
      const traffic_violationID = response.data.id
      setTrafficViolationID(trafficViolationID)
      console.log(response.data)

      const formData = {
        vehicle: vehicleID,
        driver_ID: driverID,
        violations: traffic_violationID,
        place_violation: selectedPin.address,
        ticket_status: 'PENDING',
      }
  

      axios.post('ticket/register/', JSON.stringify(formData), {
        headers: {
          Authorization: `token ${Token}`
        }
      }).then((response) => {
        alert("Successfully Cited")
        console.log(response.data)


        setPreview(!preview) && setViolation(!violation) && Keyboard.dismiss() && scrollToTop()


      }).catch((error) => {
        console.log(error)
        console.log(formData)
      })




    }).catch((error) => {
      console.log(error)
    })





  }

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
                      {/* driver info */}
                      {/* <PreviewComponent
                        title={"MFRTA TICKET NO."}
                        value={mfrtaTctNo}
                      ></PreviewComponent> */}
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

                      {/* violation area */}

                        {filteredData.map((item) => (
                          <ViolationCheck
                            key={item.id}
                            id={item.id}
                            text={item.violation_type}
                            isChecked={checkedViolations.includes(item.violation_type)}
                            handleCheckboxChange={(isChecked) =>
                              handleCheckboxChange(item.violation_type, isChecked, item.id)
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
                      onPress={handlePreviewTicket}
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
                        {/* <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"MFRTA TCT No*"}
                          editable={false}
                          required
                          value={mfrtaTctNo}
                        ></ConstInput> */}
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Driver's License Number*"}
                          value={ocrText.license_number}
                          onChangeText={(text) => {
                            dispatch(setLicenseNumber(text))
                          }}
                          marginTop={25}
                          marginBottom={25}
                          required
                        ></ConstInput>                        
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          value={ocrText.first_name}
                          onChangeText={(text) => {
                            dispatch(setFirstName(text));
                          }}
                          text="First Name"
                          required
                        ></ConstInput>
                        {/* make validation */}
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          value={ocrText.middle_initial}
                          onChangeText={(text) => {
                            dispatch(setMiddleInitial(text))
                          }}
                          text="Middle Initial"
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          value={ocrText.last_name}
                          text="Last Name"
                          onChangeText={(text) => {
                            dispatch(setLastName(text));
                          }}
                          required
                        ></ConstInput>         
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Address*"}
                          value={ocrText.address}
                          onChangeText={(text) => {
                            dispatch(setAddress(text));
                          }}                          
                          marginTop={25}
                          required
                          multiline={true}
                        ></ConstInput>                                                               
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          value={ocrText.birthdate}
                          text={"Date of Birth*"}
                          onChangeText={(text) => {
                            dispatch(setBirthDate(text));
                          }}                          
                          marginTop={25}
                          required
                        ></ConstInput>
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          text={"Nationality*"}
                          value={ocrText.nationality}
                          onChangeText={(text) => {
                            dispatch(setNationality(text));
                          }}                          
                          marginTop={25}
                          required
                        ></ConstInput>                        
                                         
                      
                              {/* if possible, selection ra sya */}
                        <ConstInput
                          borderRadius={10}
                          height={40}
                          type={Number}
                          text={"Classification"}
                          value={ocrText.classification}
                          onChangeText={(text) => {
                            dispatch(setDriverClassification(text))
                          }}
                          marginTop={25}
                          marginBottom={25}
                          required
                        ></ConstInput>                           
                          {/* if existing user there is button for edit of his/her info */}


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
                        text={"Plate Number*"}
                        value={ocrTextOCR.plate_number}
                        onChangeText={(text) => {
                          dispatch(setPlateNumber(text));
                        }}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        marginTop={25}
                        text={"Registered Owner*"}
                        value={ocrTextOCR.name}
                        onChangeText={(text) => {
                          dispatch(setOwnerName(text));
                        }}
                        required
                      ></ConstInput>            
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Owner Address"}
                        value={ocrTextOCR.address}
                        onChangeText={(text) => {
                          dispatch(setOwnerAddress(text));
                        }}
                        required
                      ></ConstInput>              
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Contact No.*"}
                        value={ocrTextOCR.contact_number}
                        onChangeText={(text) => {
                          dispatch(setOwnerContactNumber(text));
                        }}
                        required
                      ></ConstInput>                                          
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Make*"}
                        value={ocrTextOCR.make}
                        onChangeText={(text) => {
                          dispatch(setMake(text));
                        }}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        value={ocrTextOCR.vehicle_class}
                        text={"Class*"}
                        onChangeText={(text) => {
                          dispatch(setVehicleClass(text));
                        }}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        value={ocrTextOCR.vehicle_model}
                        text={"Model*"}
                        onChangeText={(text) => {
                          dispatch(setVehicleModel(text));
                        }}
                        required
                      ></ConstInput>
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        value={ocrTextOCR.body_markings}
                        text={"Body Markings*"}
                        onChangeText={(text) => {
                          dispatch(setBodyMarkings(text));
                        }}
                        required
                      ></ConstInput>             
                            
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        value={ocrTextOCR.color}
                        text={"Colors*"}
                        onChangeText={(text) => {
                          dispatch(setColor(text));
                        }}
                        required
                        marginBottom={25}
                      ></ConstInput>                                  
                      <View>
                        {/* <Text
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
                        </Text> */}
                        {/* <ColorSelector value={ocrTextOCR.color}
                          onChangeText={(text) => {
                            dispatch(setColor(text));
                          }}                        
                        ></ColorSelector> */}
                         
                      </View>

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
                      {/* dili na need e butang */}
                      <ConstInput
                        borderRadius={10}
                        height={40}
                        text={"Ticket Status"}
                        value="PENDING"
                        required
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
                  onPress={handleNextButton}
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
