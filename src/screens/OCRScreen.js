import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CameraScan from "../components/CameraScan";

function OCRScreen(props) {
  return (
    <CameraScan
    ></CameraScan>
  );
}

export default OCRScreen;

// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import CameraScan from "../components/CameraScan";

// function OCRScreen(props) {
//   return (
//     <CameraScan
//     ></CameraScan>
//   );
// }

// export default OCRScreen;


// import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, Image } from "react-native";
// import CameraScan from "../components/CameraScan";
// import ImagePicker from 'react-native-image-crop-picker';


// function OCRScreen(props) {
//   const [croppedImage, setCroppedImage] = useState(null); // State to hold the cropped image

//   const upload = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       includeBase64: true,
//     })
//       .then(image => {
//         const base64Image = `data:${image.mime};base64,${image.data}`;

//         setCroppedImage(base64Image);

//       })
//       .catch(error => {
//         console.log('Error:', error);
//       });
//   }

//   const takePhotoFromCamera = () => {
//     ImagePicker.openCamera({
//       cropping: true,
//       includeBase64: true,
//     })
//       .then(image => {
//         const base64Image = `data:${image.mime};base64,${image.data}`;

//         setCroppedImage(base64Image);

//       })
//       .catch(error => {
//         console.log('Error:', error);
//       });
//   }

//   return (
//     <View>
//       {croppedImage && (
//         <View>
//           <Text>Cropped Image:</Text>
//           <Image
//               source={{ uri: croppedImage }}
//               style={{ width: 300, height: 200 }}
//           />
//         </View>
//       )}

//       <Text>Hello World</Text>
//       <Button title='Choose From Library' onPress={upload} color="tomato" />
//       <Button title='Open Camera' onPress={takePhotoFromCamera} color="tomato" />


//     </View>
//   );
// }

// export default OCRScreen;
