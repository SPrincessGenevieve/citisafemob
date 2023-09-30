import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import KeyboardWithoutWrapper from "./KeyboardWithoutWrapper";
import colorsData from "./Colors.json";
import ConstInput from "./ConstInput";
import { useRoute } from "@react-navigation/native";

const predefinedColors = [
  { hex: "#000000", name: "Black" },
  { hex: "#F0F0F0", name: "White" },
  { hex: "#C0C0C0", name: "Silver" },
  { hex: "#808080", name: "Gray" },
  { hex: "#0000FF", name: "Blue" },
  { hex: "#FF0000", name: "Red" },
  { hex: "#008000", name: "Green" },
  { hex: "#A52A2A", name: "Brown" },
  { hex: "#FFFF00", name: "Yellow" },
  { hex: "#FFA500", name: "Orange" },
  { hex: "#800080", name: "Purple" },
  { hex: "#FFDF00", name: "Gold" },
];

export default function ColorSelector({ navigation }) {
  const [customColor, setCustomColor] = useState("");
  const [matchedColor, setMatchedColor] = useState(null);
  const [imageUriState, setImageUriState] = useState(null); // Initialize with null
  const [capture, setCapture] = useState(false); // Initialize with false
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMarkings, setSelectedMarkings] = useState(null);
  const route = useRoute();

  const receivedImageUri = route.params?.imageUri;
  console.log("receivedImageUri:", receivedImageUri);

  const handleImageClose = () => {
    setImageUriState(null);
    setCapture(false);
    navigation.setParams({ imageUri: null });
  };

  useEffect(() => {
    setImageUriState(receivedImageUri);
  }, [receivedImageUri]);

  useEffect(() => {
    if (customColor) {
      const matchedPredefinedColor = predefinedColors.find(
        (color) => color.name.toLowerCase() === customColor.toLowerCase()
      );

      if (matchedPredefinedColor) {
        setSelectedColor(matchedPredefinedColor.hex);
        setCustomColor("");
        setMatchedColor(null);
        return;
      }

      const matchedJsonColor = colorsData.find(
        (color) => color.name.toLowerCase() === customColor.toLowerCase()
      );

      if (matchedJsonColor) {
        setSelectedColor(matchedJsonColor.hex);
        setCustomColor("");
        setMatchedColor(null);
        return;
      }

      setMatchedColor("Color not found");
    } else {
      setMatchedColor(null);
    }
  }, [customColor]);

  const handleCustomColorChange = (color) => {
    setCustomColor(color);
  };

  const getColorName = (colorHex) => {
    const predefinedColor = predefinedColors.find(
      (color) => color.hex === colorHex
    );
    if (predefinedColor) {
      return predefinedColor.name;
    }

    const jsonDataColor = colorsData.find((color) => color.hex === colorHex);
    if (jsonDataColor) {
      return jsonDataColor.name;
    }

    return "Unknown";
  };

  const handleForm = () => {
    navigation.navigate("FormScreen", {
      selectedColor: selectedColor,
      selectedClass: selectedClass,
      selectedMarkings: selectedMarkings,
    });
  };

  const renderColorButtons = () => {
    const rows = [];
    for (let i = 0; i < predefinedColors.length; i += 4) {
      const rowColors = predefinedColors.slice(i, i + 4);
      const row = (
        <View key={i} style={styles.colorRow}>
          {rowColors.map((color) => (
            <TouchableOpacity
              key={color.hex}
              style={[
                styles.colorButton,
                {
                  backgroundColor:
                    selectedColor === color.hex ? color.hex : color.hex,
                  borderColor:
                    selectedColor === color.hex ? "black" : color.hex,
                  borderWidth: selectedColor === color.hex ? 2 : 0,
                  opacity: selectedColor === color.hex ? 1 : 0.5,
                },
              ]}
              onPress={() => handleColorSelection(color.hex)}
            >
              <Text
                style={[
                  styles.colorText,
                  {
                    color: selectedColor === color.hex ? "#595959" : "black",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 12,
                  },
                ]}
              >
                {color.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  const handleCustomColorSubmit = () => {
    const matchedColor = predefinedColors.find(
      (color) =>
        color.name.toLowerCase() === customColor.toLowerCase() ||
        color.hex.toLowerCase() === customColor.toLowerCase()
    );

    if (matchedColor) {
      setSelectedColor(matchedColor.hex);
      setCustomColor("");
    } else {
      alert("Color not found. Please enter a valid color name or hex code.");
    }
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleClassSelection = (classCode) => {
    setSelectedClass(classCode);
  };

  const handleBodyMarkingsSelection = (markings) => {
    setSelectedMarkings(markings);
  };

  const handleCam = () => {
    navigation.navigate("CameraProof");
  };

  return (
    <KeyboardWithoutWrapper>
      <View style={styles.container}>
        <View style={{ paddingBottom: 30 }}>
          <View style={styles.selectColor}>
            {matchedColor && (
              <Text style={{ color: "red", marginBottom: 20, fontSize: 20 }}>
                {matchedColor}
              </Text>
            )}
            {renderColorButtons()}
            <View
              style={{ width: "100%", marginBottom: 30, alignItems: "center" }}
            >
              <View
                style={[
                  styles.selectedColorIndicator,
                  { backgroundColor: selectedColor },
                ]}
              >
                <Text style={{ color: "black" }}>
                  {getColorName(selectedColor)}
                </Text>
              </View>
              <ConstInput
                borderRadius={20}
                onChangeText={handleCustomColorChange}
                value={customColor}
                placeholder="Others"
              ></ConstInput>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}></View>
      </View>
    </KeyboardWithoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    height: "auto",
  },

  button: {
    backgroundColor: "",
    borderRadius: 20,
    height: 50,
    width: 200,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  textButtom: {
    fontSize: 20,
  },
  selectColor: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  colorRow: {
    flexDirection: "row",
  },
  colorButton: {
    width: 80,
    height: 30,
    margin: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    opacity: 0.3,
  },
  colorText: {
    fontSize: 10,
    textAlign: "center",
  },
  selectedColorIndicator: {
    width: 100,
    height: 30,
    marginTop: 20,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  customColorInput: {
    marginTop: 10,
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  classOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
});
