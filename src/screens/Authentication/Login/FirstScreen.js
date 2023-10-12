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
import { useDispatch } from "react-redux";
import {
  setEnforcer,
  setLogin,
  setOffline,
  setOnline,
  setToken,
} from "../authSlice";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from "expo-sqlite";

function FirstScreen({ navigation }) {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    "Zen Dots Regular": require("./../../../../assets/fonts/ZenDots-Regular.ttf"),
  });
  const [showPassword, setShowPassword] = useState(true);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const [animationValue] = useState(new Animated.Value(1));

  // offline mode
  useEffect(() => {
    // Open a database connection
    const db = SQLite.openDatabase("credentials.db");

    // Create a table for credentials
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);",
        [],
        () => {
          console.log("Table created successfully");
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    // Load credentials from the database
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM credentials LIMIT 1;",
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            const storedCredentials = results.rows.item(0);
            setCredentials({
              username: storedCredentials.username,
              password: storedCredentials.password,
            });
          }
        },
        (_, error) => {
          console.error("Error fetching credentials:", error);
        }
      );
    });

    return () => {
      db._db.close();
    };
  }, []);

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected === false) {
      console.log("No Internet");
      dispatch(setOffline());
    } else if (state.isConnected === true) {
      console.log("Connected");
      dispatch(setOnline());
    }
  });

  useEffect(() => {
    unsubscribe();
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    NetInfo.fetch().then((isConnected) => {
      if (!isConnected) {
        // Offline mode
        const db = SQLite.openDatabase("credentials.db");
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM credentials LIMIT 1;",
            [],
            (_, results) => {
              if (results.rows.length > 0) {
                const storedCredentials = results.rows.item(0);
                setCredentials({
                  username: storedCredentials.username,
                  password: storedCredentials.password,
                });

                // You can now use the stored credentials for local login
                // For example, you might have a function for local authentication
                dispatch(setLogin());

                // if done then erase credentials
                setCredentials({
                  username: "",
                  password: "",
                })
              } else {
                // No stored credentials
                console.log("No stored credentials");
                setCredentials({
                  username: "",
                  password: "",
                })
              }
            },
            (_, error) => {
              console.error("Error fetching credentials:", error);
            }
          );
        });
      } else {
        // online
        axios.post("accounts/token/login/", credentials).then((response) => {
          const token = response.data.auth_token;
          dispatch(setToken(token));

          axios
            .get("accounts/users/me/", {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .then((response) => {
              // Save credentials in the SQLite database
              const db = SQLite.openDatabase("credentials.db");
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT OR REPLACE INTO credentials (id, username, password) VALUES (?, ?, ?);",
                  [1, credentials.username, credentials.password],
                  () => {
                    console.log("Credentials saved successfully");
                  },
                  (_, error) => {
                    console.error("Error saving credentials:", error);
                  }
                );
              });
              const role = response.data.role;
              const last_name = response.data.last_name;

              dispatch(setEnforcer(response.data));

              if (role != "ENFORCER") {
                alert(`Sir ${last_name}, Your Role is ${role}`);
                setCredentials({
                  username: "",
                  password: "",
                });
              } else {
                alert(`Welcome to eTCMF ${role} - ${last_name}`);
                dispatch(setLogin());
              }
            });
        });
      }
    });
  };

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const handleForgotPass = () => {
    navigation.navigate("ForgotPass");
  };

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
