import React from "react";
import { Button, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";

function History(props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <View style={{ height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "75%",
              backgroundColor: "white",
              marginRight: 10,
              borderRadius: 20,
              borderWidth: 1,
            }}
          >
            <TextInput
              style={{ height: 50, paddingHorizontal: 20, fontSize: 17 }}
              placeholder="license no. or ticket no."
            ></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                width: 90,
                height: 40,
                borderRadius: 20,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardWithoutWrapper>
          <View
            style={{
              width: "100%",
              height: "auto",
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                borderBottomWidth: 3,
                padding: 10,
                borderColor: "grey",
              }}
            >
              <View>
                <Text style={{ textAlign: "right", fontWeight: "bold" }}>
                  2023-10-12
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  202039994
                </Text>
              </View>
              <View>
                <Text>Princess Genevieve Sagrado</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text> > Driving without a helmet</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity>
                  <Text style={{ textAlign: "right", color: "blue" }}>
                    View more
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardWithoutWrapper>
      </View>
    </View>
  );
}

export default History;
