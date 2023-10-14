import React, { useState, useEffect, Children } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import GradientBackground from "../../../components/GradientBG";
import { useFonts } from "expo-font";
import ConstInput from "../../../components/ConstInput";
import ConstInputVisible from "../../../components/ConstInputVisible";
import KeyboardWithoutWrapper from "../../../components/KeyboardWithoutWrapper";
import ConstButton from "../../../components/ConstButton";
import Title from "../../../components/Title";
import TextButton from "../../../components/TextButton";
import axios from "../../../../plugins/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnforcer,
  setLogin,
  setLogout,
  setOffline,
  setOnline,
  setToken,
} from "../authSlice";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from "expo-sqlite";
import * as Crypto from 'expo-crypto';

function FirstScreen({ navigation }) {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    "Zen Dots Regular": require("./../../../../assets/fonts/ZenDots-Regular.ttf"),
  });
  const [showPassword, setShowPassword] = useState(true);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const [animationValue] = useState(new Animated.Value(1));

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // get the authSlice Online
  const internet = useSelector((state) => state.auth.Online)


  // database
  const db = SQLite.openDatabase('localstorage5');

  // create table users
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT, 
        password TEXT, 
        token TEXT,
        first_name TEXT,
        last_name TEXT,
        middle_name TEXT,
        position TEXT 
        );`
    );
  });



  // insert users
  const saveCredentialsToDatabase = async (username, password, token, first_name, last_name, middle_name, position) => {
    try {

      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (username, password, token, first_name, last_name, middle_name, position) VALUES (?, ?, ?, ?, ?, ?, ?);',
          [username, password, token, first_name, last_name, middle_name, position],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              console.log('Credentials saved successfully.');
            } else {
              console.log('Failed to save credentials.');
            }
          }
        );
      });
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  };

// offline login
const checkOfflineCredentials = async () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?;',
        [credentials.username, credentials.password],
        (tx, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);

            const userID = user.id;
            const username = user.username;
            const first_name = user.first_name;
            const last_name = user.last_name;
            const middle_name = user.middle_name;
            const position = user.position;
            const token = user.token;

            dispatch(setToken(token));
            dispatch(setEnforcer({userID, first_name, middle_name, last_name, position}))


            dispatch(setLogin());
          } else {
            alert('Invalid credentials or user not found.');
          }
        }
      );
    });
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};


  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected === false) {
      console.log("Not Connected");
      dispatch(setOffline());
      dispatch(setLogout());
    } else if (state.isConnected === true) {
      console.log("Connected");
      dispatch(setOnline());
      dispatch(setLogout());

    }
  }, [1]);

  useEffect(() => {
    unsubscribe();
  });


  const handleForgotPass = () => {
    navigation.navigate("ForgotPass");
  };


  const handleLogin = async () => {
    if (!internet) {
      checkOfflineCredentials();
      alert("You are in OFFLINE MODE");
    } else {
      try {
        const response = await axios.post("accounts/token/login/", credentials);
        const token = response.data.auth_token;
  
        dispatch(setToken(token));
  
        const userResponse = await axios.get("accounts/users/me/", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
  
        const role = userResponse.data.role;
        const last_name = userResponse.data.last_name;
        const first_name = userResponse.data.first_name;
        const middle_name = userResponse.data.middle_name;
        const position = userResponse.data.position;

  
        dispatch(setEnforcer(userResponse.data));
  
        if (role !== "ENFORCER") {
          alert(`Sir ${last_name}, Your Role is ${role}`);
          setCredentials({
            username: "",
            password: "",
          });
        } else {
          // Save credentials to local SQLite database          
          saveCredentialsToDatabase(credentials.username, credentials.password, token, first_name, last_name, middle_name, position );
          dispatch(setLogin());
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle the error, e.g., show an alert or update the UI
      }
    }
  };
  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);



  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardWithoutWrapper>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GradientBackground></GradientBackground>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: "100%",
              marginTop: "50%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 72,
                    fontWeight: "bold",
                    color: "#285712",
                  }}
                >
                  eTC
                </Text>
                <Text
                  style={{ fontSize: 72, fontWeight: "bold", color: "#61680C" }}
                >
                  MF
                </Text>
              </View>
              <Text style={{ marginTop: -15, color: "#353904" }}>
                e-Ticketing Citation Manolo Fortich
              </Text>
            </View>

            <View
              style={{
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ConstInput
                borderRadius={10}
                placeholder="username"
                value={credentials.username}
                onChangeText={(text) => {
                  setCredentials({
                    ...credentials,
                    username: text,
                  });
                }}
              ></ConstInput>
              <ConstInputVisible
                placeholder="password"
                value={credentials.password}
                onChangeText={(text) => {
                  setCredentials({
                    ...credentials,
                    password: text,
                  });
                }}
              ></ConstInputVisible>
              <TextButton onPress={handleForgotPass}></TextButton>
              <View style={{ width: "100%", marginTop: 20 }}>
                <ConstButton
                  height={60}
                  title="Login"
                  marginLeftText={-10}
                  onPress={handleLogin}
                  borderRadius={10}
                ></ConstButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardWithoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 900,
  },
});

export default FirstScreen;
