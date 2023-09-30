import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import ConstInput from "../components/ConstInput";
import ConstInputShort from "../components/ConstInputShort";
import ConstButtonShort from "../components/ConstButtonShort";
import Confirm from "./ConfirmScreen";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Octicons";
import Search from "react-native-vector-icons/EvilIcons";
import Ant from "react-native-vector-icons/AntDesign";
import Light from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import predefinedColors from "./../components/PredefineColor.json";
import MapLocation from "../components/MapLocation";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ColorSelector from "../components/ColorSelector";
import DropDownPicker from "react-native-dropdown-picker";

function FormScreen({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true); // Initial state set to true (ascending)
  const [cat1, setCat1] = useState(true);
  const [cat2, setCat2] = useState(false);
  const [cat3, setCat3] = useState(false);
  const [cat4, setCat4] = useState(false);
  const [cat5, setCat5] = useState(false);

  const toggleSortIcon = () => {
    setSortAsc(!sortAsc); // Toggle the state between true and false
  };

  return (
    <View style={styles.container}>
      <KeyboardWithoutWrapper>
        <View style={{ width: "100%", marginTop: 20, height: 1360 }}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}
            >
              You are hereby cited for committing traffic violation/s as
              indicated hereunder
            </Text>
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
                  <View style={styles.box}></View>
                </View>
                <View style={styles.category}>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat1(!cat1)}
                  >
                    <Ant name="filetext1" style={styles.icon}></Ant>
                    <Text>Licensing and Documentation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat1(!cat1)}
                  >
                    <Text>Licensing and Documentation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View //========================================================CATEGORY 2
          >
            {cat2 ? (
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat2(!cat2)}
                  >
                    <Text>Traffic Rule Violations</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.category}>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat2(!cat2)}
                  >
                    <Light name="traffic-light" style={styles.icon}></Light>
                    <Text>Traffic Rule Violations</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View //========================================================CATEGORY 3
          >
            {cat3 ? (
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat3(!cat3)}
                  >
                    <Text>Personal Information</Text>
                  </TouchableOpacity>
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
                <View>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat4(!cat4)}
                  >
                    <Text>Vehicle Information</Text>
                  </TouchableOpacity>
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
                <View>
                  <TouchableOpacity
                    style={styles.drop}
                    onPress={() => setCat5(!cat5)}
                  >
                    <Text>Violation Information</Text>
                  </TouchableOpacity>
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
        </View>
      </KeyboardWithoutWrapper>
    </View>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  category: {
    height: 50,
    width: "100%",
    backgroundColor: "#D0FFCC",
    marginBottom: 5,
    justifyContent: "center",
  },
  drop: {
    flexDirection: "row",
  },
  box: {
    width: "90%",
    height: 300,
    backgroundColor: "#D0FFCC",
    display: "flex",
    borderRadius: 10,
  },
  icon: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 50,
    color: "#787878",
  },
});
