import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Text,
} from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync, // Fixed typo here
} from "expo-camera";
import Feather from "@expo/vector-icons/Feather";
// import * as ImagePicker from "expo-image-picker";
import Scanning from "./Scanning";

import {
  setDriverID,
  setDriverRegisterd,
  setFinalDriver,
  setGetFinalDriver,
  setRecognizedText,
} from "./camera/infoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import corners from "./../../assets/corners.png";
import axios from "../../plugins/axios";
import { setdriverID } from "./camera/infoSliceCOR";
import ImagePicker from "react-native-image-crop-picker";

export default function CameraScan() {
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraRef, setCameraRef] = useState(null);
  const [showPicture, setShowPicture] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);
  const [scanning, setScanning] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const Token = useSelector((state) => state.auth.token);

  const toggleFlash = () => {
    setFlash((currentFlash) =>
      currentFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  // saving data
  const [data, setData] = useState({
    type: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    nationality: "",
    sex: "",
    date_of_birth: "",
    weight: "",
    height: "",
    address: "",
    license_no: "",
    expiration_date: "",
    dl_codes: "",
    conditions: "",
    agency_code: "",
    restrictions: "",
  });

  // registered driver
  const [drivers, getDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("drivers/register/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        getDrivers(response.data);
      })
      .catch((error) => {
        console.log(`Error Fetch Driver's Data: ${error}`);
      });
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    await requestCameraPermissionsAsync();
  };

  const getPermission = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    return cameraPermission.granted;
  };

  const { width, height } = Dimensions.get("window");

  // camera
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();

      // Check if photo has a valid path property
      if (photo && photo.uri) {
        ImagePicker.openCropper({
          path: photo.uri, // Use the path property
          includeBase64: true,
        })
          .then((image) => {
            const base64Image = `data:${image.mime};base64,${image.data}`;
            setCapturedImage(base64Image);

            setShowPicture(true);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    }
  };

  const cancelPicture = () => {
    setCapturedImage("");
    setShowPicture(false);
  };

  // ocr
  const handleNextButton = async () => {
    try {
      setScanning(true);
      if (!capturedImage) {
        Alert.alert("Please take a picture first.");
        return;
      }

      const apiKey = "5f9a18dcb66e4eca17af461b4b619bc9";
      const apiUrl =
        "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";

      const formData = new FormData();
      formData.append("document", {
        uri: capturedImage,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${apiKey}`,
        },
      });

      if (response?.data?.document !== undefined) {
        const extractedData =
          response.data.document.inference.pages[0].prediction;

        const concatenatedFields = {
          type: "",
          address: "",
          agency_code: "",
          blood_type: "",
          conditions: "",
          date_of_birth: "",
          dl_codes: "",
          expiration_date: "",
          last_name_first_name_middle_name: "",
          height: "",
          license_no: "",
          nationality: "",
          sex: "",
          weight: "",
          restrictions: "",
        };

        for (const fieldName in concatenatedFields) {
          if (extractedData[fieldName]?.values) {
            let concatenatedValue = "";
            for (const value of extractedData[fieldName]?.values || []) {
              concatenatedValue += value.content + " ";
            }
            concatenatedFields[fieldName] = concatenatedValue.trim();
          }
        }

        // validation
        // if (concatenatedFields.license_no.length !== 13) {
        //   Alert.alert("License number must have 13 characters.");
        //   return;
        // }

        setData({
          ...data,
          ...concatenatedFields,
        });

        dispatch(
          setRecognizedText({
            type: concatenatedFields.type,
            name: concatenatedFields.last_name_first_name_middle_name,
            licenseNumber: concatenatedFields.license_no,
            dateOfBirth: concatenatedFields.date_of_birth,
            nationality: concatenatedFields.nationality,
            sex: concatenatedFields.sex,
            address: concatenatedFields.address,
          })
        );

        // check if the driver is exist
        const driverExists = drivers.find(
          (driver) => driver.license_number === concatenatedFields.license_no
        );

        if (driverExists) {
          alert(`Existing Driver: ${concatenatedFields.license_no}`);

          const driverId = driverExists.id;
          const classificationString = driverExists.classification.toString();
          dispatch(setDriverRegisterd());
          dispatch(setDriverID(driverId));

          // for editing soon
          dispatch(
            setGetFinalDriver({
              ...driverExists,
              license_number: driverExists.license_number,
              first_name: driverExists.first_name,
              middle_initial: driverExists.middle_initial,
              last_name: driverExists.last_name,
              address: driverExists.address,
              birthdate: driverExists.birthdate,
              nationality: driverExists.nationality,
              classification: classificationString,
            })
          );
          // vehicle slice
          dispatch(setdriverID(driverId));
          // if there is changes

          // clear setData
          setData({
            type: "",
            first_name: "",
            last_name: "",
            middle_name: "",
            nationality: "",
            sex: "",
            date_of_birth: "",
            weight: "",
            height: "",
            address: "",
            license_no: "",
            expiration_date: "",
            dl_codes: "",
            conditions: "",
            agency_code: "",
            restrictions: "",
          });
          navigation.navigate("IntroOCR");
        } else {
          console.log(`Driver not found: ${concatenatedFields.license_no}`);
          alert(`New Driver: ${concatenatedFields.license_no}`);
          dispatch(setFinalDriver());

          // clear setData
          setData({
            type: "",
            first_name: "",
            last_name: "",
            middle_name: "",
            nationality: "",
            sex: "",
            date_of_birth: "",
            weight: "",
            height: "",
            address: "",
            license_no: "",
            expiration_date: "",
            dl_codes: "",
            conditions: "",
            agency_code: "",
            restrictions: "",
          });
          navigation.navigate("IntroOCR");
        }
      } else {
        setScanning(false);
        Alert.alert("Text extraction failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error extracting text:", error);
      Alert.alert("Error extracting text. Please try again later.");
      setScanning(false);
    }
  };

  // useEffect(() => {
  //   console.log("Updated Data:", data);
  // }, [data]);

  if (!getPermission()) {
    return Alert.alert(
      "Permission Required!",
      "You need to provide the permissions to access the camera",
      [{ text: "Got it" }]
    );
  }

  // not available

  // const switchFlashMode = () => {
  //   setFlash(flash === "off" ? "on" : "off");
  // };

  // // oki nani
  const pickImage = async () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        const base64Image = `data:${image.mime};base64,${image.data}`;

        setCapturedImage(base64Image);
        setShowPicture(true);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {showPicture ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            zIndex: 4,
            width: "100%",
            height: "100%",
          }}
        >
          {capturedImage ? (
            <Image style={styles.picture} source={{ uri: capturedImage }} />
          ) : null}
          {scanning ? <Scanning></Scanning> : null}

          <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Image style={styles.corners} source={corners}></Image>
        <Camera
          flashMode={flash}
          style={styles.camera}
          ref={(ref) => {
            setCameraRef(ref);
          }}
          ratio="16:9" // Set the aspect ratio to 1:1
        ></Camera>
        <View style={styles.controlsContainer}>
          <View style={styles.controlText}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
              Photo of Driver’s License
            </Text>
            <Text style={{ color: "white" }}>
              Please place the front of the Driver’s License
            </Text>
            <Text style={{ color: "white" }}>in the frame</Text>
          </View>

          {/* oki nani */}
          <View style={styles.control}>
            {/* outdated system */}
            <TouchableOpacity style={styles.otherbtn} onPress={pickImage}>
              <Icon name="image" size={28} color="white" style={{}} />
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={styles.takePictureBtn}
                onPress={takePicture}
              >
                <ScanOutlined
                  style={{
                    color: "white",
                    fontSize: 50,
                  }}
                  name="line-scan"
                ></ScanOutlined>
              </TouchableOpacity>
            </View>

            {/* no flash */}
            {/* <TouchableOpacity style={styles.otherbtn} onPress={toggleFlash}>
                <Feather
                  name={
                    flash === Camera.Constants.FlashMode.off ? "zap-off" : "zap"
                  }
                  size={28}
                  color="white"
                />
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  // ok
  controlsContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 3,
  },
  control: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 3,
  },
  // done
  takePictureBtn: {
    backgroundColor: "#3E7C1F",
    borderRadius: 50,
    height: 90,
    width: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  otherbtn: {
    backgroundColor: "#75B956",
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
  // ok
  corners: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  // tan awon
  controlText: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 180,
  },

  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nextBtn: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
    width: 110,
    left: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "green",
    fontSize: 16,
  },
  cancelBtn: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
    width: 110,
    right: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },

  viewpicture: {
    backgroundColor: "black",
    position: "absolute",
    zIndex: 4,
    width: "100%",
    height: "100%",
    ratio: "16:9",
  },
  manipulator: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
});
