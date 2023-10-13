import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Text,
} from "react-native";
import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync, // Fixed typo here
} from "expo-camera";
import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import axios from "../../plugins/axios";
import * as ImagePicker from "expo-image-picker";
import {
  setFinalVehicle,
  setGetFinalVehicle,
  setIsCarRegistered,
  setRecognizedText,
  setVehicleID,
} from "./camera/infoSliceCOR";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import corners from "./../../assets/cornersOCR.png";
import { setGetFinalDriver } from "./camera/infoSlice";
import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";


export default function CameraScanCOR() {
  const [cameraMode, setCameraMode] = useState(CameraType.back);
  const [flash, setFlash] = useState("off"); // Changed to string type
  const [capturedImage, setCapturedImage] = useState("");
  const [pictureUri, setPictureUri] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr
  const [cropMode, setCropMode] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const Token = useSelector((state) => state.auth.token);

  const [data, setData] = useState({
    plate_no: "",
    make: "",
    date: "",
    series: "",
    make: "",
    complete_owners_name: "",
    complete_address: "",
    telephone_no_contact_details: "",
  });

  const [vehicle, setVehicle] = useState([]);
  // registered vehicle

  useEffect(() => {
    axios
      .get("vehicles/register/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((error) => {
        console.log("error dong");
      });
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleFlash = () => {
    setFlash((currentFlash) =>
      currentFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const requestPermission = async () => {
    await requestCameraPermissionsAsync();
  };

  const getPermission = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    return cameraPermission.granted;
  };

  const takePicture = async () => {
    if (cameraRef) {
      const uri = await cameraRef.takePictureAsync();
      
      
      setCapturedImage(uri.uri); // Set the captured image URI directly
      setCropMode(true);
      setShowPicture(true);
    }
  };

  const cancelPicture = () => {
    setCapturedImage("");
    setShowPicture(false);
  };

  const handleNextButton = async () => {
    try {
      if (!capturedImage) {
        Alert.alert("Please take a picture first.");
        return;
      }

      const apiKey = "8e467a5f1e58b9b383da543d49105ce5";
      const apiUrl =
        "https://api.mindee.net/v1/products/SPrincessGenevieve/cor/v1/predict";

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
          plate_no: "",
          make: "",
          date: "",
          series: "",
          make: "",
          complete_owners_name: "",
          complete_address: "",
          telephone_no_contact_details: "",
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
        if (concatenatedFields.plate_number >= 7) {
          Alert.alert("Plate number atleast have 6 characters.");
          return;
        }

        setData({
          ...data,
          ...concatenatedFields,
        });

        dispatch(
          setRecognizedText({
            plate_no: concatenatedFields.plate_no,
            make: concatenatedFields.make,
            date: concatenatedFields.date,
            series: concatenatedFields.series,
            make: concatenatedFields.make,
            complete_owners_name: concatenatedFields.complete_owners_name,
            complete_address: concatenatedFields.complete_address,
            telephone_no_contact_details:
              concatenatedFields.telephone_no_contact_details,
          })
        );

        // Check if the driver exists
        const vehicleExists = vehicle.find(
          (vehicles) => vehicles.plate_number === concatenatedFields.plate_no
        );

        if (vehicleExists) {
          alert(`Existing Vehicle: ${concatenatedFields.plate_no}`);

          const vehicleID = vehicleExists.id;
          const driverIDString = vehicleExists.driverID.toString();
          dispatch(setIsCarRegistered());
          dispatch(setVehicleID(vehicleID));
          dispatch(
            setGetFinalVehicle({
              ...vehicleExists,
              name: vehicleExists.name,
              address: vehicleExists.address,
              contact_number: vehicleExists.contact_number,
              plate_number: vehicleExists.plate_number,
              make: vehicleExists.make,
              color: vehicleExists.color,
              vehicle_class: vehicleExists.vehicle_class,
              body_markings: vehicleExists.body_markings,
              vehicle_model: vehicleExists.vehicle_model,
              driverID: driverIDString,
            })
          );
          navigation.navigate("FormScreen");
        } else {
          console.log(`Vehicle Not found: ${concatenatedFields.plate_no}`);
          alert(`New Vehicle: ${concatenatedFields.plate_no}`);
          dispatch(setFinalVehicle());
          navigation.navigate("FormScreen");
        }
      } else {
        Alert.alert("Text extraction failed. Please try again later.");
      }
    } catch (error) {
      console.log("Error extracting text:", error);
      Alert.alert("Error extracting text. Please try again later.");
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

  const switchFlashMode = () => {
    setFlash(flash === "off" ? "on" : "off");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false, // Set to false to disable cropping
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      const { uri } = result;
      setCapturedImage(uri); // Use result.uri directly
      setCropMode(false);
      setShowPicture(true);
    }
  };

  return (
    <View>
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

          <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {cropMode ? (
        <View>
          <ExpoImageManipulator
            photo={{ uri: capturedImage }}
            isVisible
            onPictureChoosed={(uri) => setCapturedImage(uri.uri)}
            onToggleModal={() => setCropMode(!cropMode)}
          />
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Image style={styles.corners} source={corners} />

          <Camera
            flashMode={flash}
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          ></Camera>
          <View style={styles.controlsContainer}>
     
            <View style={styles.control}>
            <TouchableOpacity
              style={styles.otherbtn}  
              onPress={pickImage}
            >
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

            <TouchableOpacity
              style={styles.otherbtn}
              onPress={toggleFlash}
            >
              <Feather
                name={
                  flash === Camera.Constants.FlashMode.off ? "zap-off" : "zap"
                }
                size={28}
                color="white"
              />
            </TouchableOpacity>
            </View>


          </View>
        </View>
      )}
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
    height: '100%',
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
  },

  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nextBtn: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 50,
    marginLeft: -50,
    left: 95,
  },
  nextText: {
    color: "green",
    fontSize: 16,
  },
  cancelBtn: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    right: 40,
    paddingHorizontal: 50,
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
  }
});
