// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   Dimensions,
//   Text,
// } from "react-native";
// import {
//   Camera,
//   CameraType,
//   requestCameraPermissionsAsync,
//   getCameraPermissionsAsync, // Fixed typo here
// } from "expo-camera";
// import Feather from "@expo/vector-icons/Feather";
// import * as ImagePicker from "expo-image-picker";
// import {
//   setDriverID,
//   setDriverRegisterd,
//   setFinalDriver,
//   setGetFinalDriver,
//   setRecognizedText,
// } from "./camera/infoSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { ImageManipulator as ExpoImageManipulator } from "expo-image-crop";
// import ScanOutlined from "react-native-vector-icons/MaterialCommunityIcons";
// import Icon from "react-native-vector-icons/Ionicons";
// import corners from "./../../assets/corners.png";
// import axios from "../../plugins/axios";
// import { setdriverID } from "./camera/infoSliceCOR";

// export default function CameraScan() {
//   const [flash, setFlash] = useState("off"); // Changed to string type
//   const [cameraRef, setCameraRef] = useState(null);
//   const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr
//   const [cropMode, setCropMode] = useState(false);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [capturedImage, setCapturedImage] = useState("");

//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const Token = useSelector((state) => state.auth.token);

//   const toggleFlash = () => {
//     setFlash((currentFlash) =>
//       currentFlash === Camera.Constants.FlashMode.off
//         ? Camera.Constants.FlashMode.on
//         : Camera.Constants.FlashMode.off
//     );
//   };

//   // saving data
//   const [data, setData] = useState({
//     type: "",
//     first_name: "",
//     last_name: "",
//     middle_name: "",
//     nationality: "",
//     sex: "",
//     date_of_birth: "",
//     weight: "",
//     height: "",
//     address: "",
//     license_no: "",
//     expiration_date: "",
//     dl_codes: "",
//     conditions: "",
//     agency_code: "",
//     restrictions: "",
//   });

//   // registered driver
//   const [drivers, getDrivers] = useState([]);

//   useEffect(() => {
//     axios
//       .get("drivers/register/", {
//         headers: {
//           Authorization: `token ${Token}`,
//         },
//       })
//       .then((response) => {
//         getDrivers(response.data);
//       })
//       .catch((error) => {
//         console.log(`Error Fetch Driver's Data: ${error}`);
//       });
//   }, []);

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const requestPermission = async () => {
//     await requestCameraPermissionsAsync();
//   };

//   const getPermission = async () => {
//     const cameraPermission = await getCameraPermissionsAsync();
//     return cameraPermission.granted;
//   };

//   const { width, height } = Dimensions.get("window");
//   const aspectRatio = height / width;

//   const takePicture = async () => {
//     if (cameraRef) {
//       const uri = await cameraRef.takePictureAsync();

//       setCapturedImage(uri.uri); // Set the captured image URI directly
//       setCropMode(true);
//       setShowPicture(true);
//     }
//   };

//   const cancelPicture = () => {
//     setCapturedImage("");
//     setShowPicture(false);
//   };

//   const handleNextButton = async () => {
//     try {
//       if (!capturedImage) {
//         Alert.alert("Please take a picture first.");
//         return;
//       }

//       const apiKey = "5f9a18dcb66e4eca17af461b4b619bc9";
//       const apiUrl =
//         "https://api.mindee.net/v1/products/SPrincessGenevieve/gems/v1/predict";

//       const formData = new FormData();
//       formData.append("document", {
//         uri: capturedImage,
//         name: "image.jpg",
//         type: "image/jpeg",
//       });

//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Token ${apiKey}`,
//         },
//       });

//       if (response?.data?.document !== undefined) {
//         const extractedData =
//           response.data.document.inference.pages[0].prediction;

//         const concatenatedFields = {
//           type: "",
//           address: "",
//           agency_code: "",
//           blood_type: "",
//           conditions: "",
//           date_of_birth: "",
//           dl_codes: "",
//           expiration_date: "",
//           last_name_first_name_middle_name: "",
//           height: "",
//           license_no: "",
//           nationality: "",
//           sex: "",
//           weight: "",
//           restrictions: "",
//         };

//         for (const fieldName in concatenatedFields) {
//           if (extractedData[fieldName]?.values) {
//             let concatenatedValue = "";
//             for (const value of extractedData[fieldName]?.values || []) {
//               concatenatedValue += value.content + " ";
//             }
//             concatenatedFields[fieldName] = concatenatedValue.trim();
//           }
//         }

//         setData({
//           ...data,
//           ...concatenatedFields,
//         });

//         dispatch(
//           setRecognizedText({
//             type: concatenatedFields.type,
//             name: concatenatedFields.last_name_first_name_middle_name,
//             licenseNumber: concatenatedFields.license_no,
//             dateOfBirth: concatenatedFields.date_of_birth,
//             nationality: concatenatedFields.nationality,
//             sex: concatenatedFields.sex,
//             address: concatenatedFields.address,
//           })
//         );

//         // check if the driver is exist
//         const driverExists = drivers.find(
//           (driver) => driver.license_number === concatenatedFields.license_no
//         );

//         if (driverExists) {
//           alert(`Existing Driver: ${concatenatedFields.license_no}`);

//           const driverId = driverExists.id;
//           const classificationString = driverExists.classification.toString();
//           dispatch(setDriverRegisterd());
//           dispatch(setDriverID(driverId));

//           // for editing soon
//           dispatch(
//             setGetFinalDriver({
//               ...driverExists,
//               license_number: driverExists.license_number,
//               first_name: driverExists.first_name,
//               middle_initial: driverExists.middle_initial,
//               last_name: driverExists.last_name,
//               address: driverExists.address,
//               birthdate: driverExists.birthdate,
//               nationality: driverExists.nationality,
//               classification: classificationString,
//             })
//           );
//           // vehicle slice
//           dispatch(setdriverID(driverId));
//           // if there is changes

//           // clear setData
//           setData({
//             type: "",
//             first_name: "",
//             last_name: "",
//             middle_name: "",
//             nationality: "",
//             sex: "",
//             date_of_birth: "",
//             weight: "",
//             height: "",
//             address: "",
//             license_no: "",
//             expiration_date: "",
//             dl_codes: "",
//             conditions: "",
//             agency_code: "",
//             restrictions: "",
//           });
//           navigation.navigate("IntroOCR");
//         } else {
//           console.log(`Driver not found: ${concatenatedFields.license_no}`);
//           alert(`New Driver: ${concatenatedFields.license_no}`);
//           dispatch(setFinalDriver());

//           // clear setData
//           setData({
//             type: "",
//             first_name: "",
//             last_name: "",
//             middle_name: "",
//             nationality: "",
//             sex: "",
//             date_of_birth: "",
//             weight: "",
//             height: "",
//             address: "",
//             license_no: "",
//             expiration_date: "",
//             dl_codes: "",
//             conditions: "",
//             agency_code: "",
//             restrictions: "",
//           });
//           navigation.navigate("IntroOCR");
//         }
//       } else {
//         Alert.alert("Text extraction failed. Please try again later.");
//       }
//     } catch (error) {
//       console.log("Error extracting text:", error);
//       Alert.alert("Error extracting text. Please try again later.");
//     }
//   };

//   // useEffect(() => {
//   //   console.log("Updated Data:", data);
//   // }, [data]);

//   if (!getPermission()) {
//     return Alert.alert(
//       "Permission Required!",
//       "You need to provide the permissions to access the camera",
//       [{ text: "Got it" }]
//     );
//   }

//   const switchFlashMode = () => {
//     setFlash(flash === "off" ? "on" : "off");
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 1,
//     });

//     console.log(result);
//     if (!result.canceled) {
//       setCapturedImage(result.assets[0].uri);
//       setShowPicture(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {showPicture ? (
//         <View
//           style={{
//             backgroundColor: "black",
//             position: "absolute",
//             zIndex: 4,
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           {capturedImage ? (
//             <Image style={styles.picture} source={{ uri: capturedImage }} />
//           ) : null}

//           <TouchableOpacity style={styles.nextBtn} onPress={handleNextButton}>
//             <Text style={styles.nextText}>Next</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.cancelBtn} onPress={cancelPicture}>
//             <Text style={styles.cancelText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}

//       {cropMode ? (
//         <View>
//           <ExpoImageManipulator
//             photo={{ uri: capturedImage }}
//             isVisible
//             onPictureChoosed={(uri) => setCapturedImage(uri)}
//             onToggleModal={() => setCropMode(!cropMode)}
//           />
//         </View>
//       ) : (
//         <View style={{ height: "100%", width: "100%" }}>
//           <Image style={styles.corners} source={corners}></Image>
//           <Camera
//             flashMode={flash}
//             style={styles.camera}
//             type={type}
//             ratio="18:9"
//             ref={(ref) => {
//               setCameraRef(ref);
//             }}
//           ></Camera>
//           <View style={styles.controlsContainer}>
//             <View
//               style={{
//                 position: "absolute",
//                 zIndex: 4,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%",
//                 top: -550,
//               }}
//             >
//               <Text
//                 style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
//               >
//                 Photo of Driver’s License
//               </Text>
//               <Text style={{ color: "white" }}>
//                 Please place the front of the Driver’s License
//               </Text>
//               <Text style={{ color: "white" }}>in the frame</Text>
//             </View>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#75B956",
//                 width: 70,
//                 height: 70,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: 50,
//                 marginRight: 20,
//               }}
//               onPress={pickImage}
//             >
//               <Icon name="image" size={28} color="white" style={{}} />
//             </TouchableOpacity>

//             <View>
//               <TouchableOpacity
//                 style={styles.takePictureBtn}
//                 onPress={takePicture}
//               >
//                 <ScanOutlined
//                   style={{
//                     color: "white",
//                     fontSize: 50,
//                   }}
//                   name="line-scan"
//                 ></ScanOutlined>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#75B956",
//                 width: 70,
//                 height: 70,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: 50,
//               }}
//               onPress={toggleFlash}
//             >
//               <Feather
//                 name={
//                   flash === Camera.Constants.FlashMode.off ? "zap-off" : "zap"
//                 }
//                 size={28}
//                 color="white"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "flex-end",
//   },
//   button: {
//     backgroundColor: "white",
//     borderRadius: 5,
//     padding: 15,
//   },
//   text: {
//     fontSize: 18,
//     color: "black",
//   },
//   controlsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     display: "flex",
//     position: "absolute",
//     bottom: 50,
//     width: "100%",
//     justifyContent: "center",
//     zIndex: 3,
//   },
//   takePictureBtn: {
//     backgroundColor: "#3E7C1F",
//     borderRadius: 50,
//     height: 90,
//     width: 90,
//     marginVertical: 10,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 20,
//   },
//   corners: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     zIndex: 1,
//   },
//   picture: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "contain",
//   },
//   nextBtn: {
//     position: "absolute",
//     bottom: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     paddingHorizontal: 50,
//     marginLeft: -50,
//     left: 95,
//   },
//   nextText: {
//     color: "green",
//     fontSize: 16,
//   },
//   cancelBtn: {
//     position: "absolute",
//     bottom: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     right: 40,
//     paddingHorizontal: 50,
//   },
//   cancelText: {
//     color: "red",
//     fontSize: 16,
//   },
// });
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
import * as ImagePicker from "expo-image-picker";
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

export default function CameraScan() {
  const [flash, setFlash] = useState("off"); // Changed to string type
  const [cameraRef, setCameraRef] = useState(null);
  const [showPicture, setShowPicture] = useState(false); // New state variable to control showing the picturerrr
  const [cropMode, setCropMode] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState("");

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
  const aspectRatio = height / width;


  // camera
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

  // ocr
  const handleNextButton = async () => {
    try {
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
        if (concatenatedFields.license_no.length !== 13) {
          Alert.alert("License number must have 13 characters.");
          return;
        }

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

  // oki nani
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      setShowPicture(true);
    }
  };

  return (
    <View>
      {showPicture ? (
        
        <View style={styles.viewpicture}>
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
          <ExpoImageManipulator
            photo={{ uri: capturedImage }}
            isVisible
            onPictureChoosed={(uri) => setCapturedImage(uri.uri)}          
            onToggleModal={() => setCropMode(!cropMode)}

          />
      ) : (
        <View style={{ height: "100%", width: "100%" }}>
          <Image style={styles.corners} source={corners}></Image>
          <Camera
            flashMode={flash}
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          ></Camera>
          <View style={styles.controlsContainer}>
            <View style={styles.controlText}>
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Photo of Driver’s License
              </Text>
              <Text style={{ color: "white" }}>
                Please place the front of the Driver’s License
              </Text>
              <Text style={{ color: "white" }}>in the frame</Text>
            </View>

            {/* oki nani */}
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
  },
  manipulator: {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
});
