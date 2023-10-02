import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, PaperProvider, DataTable } from "react-native-paper";
import GradientBackground from "../components/GradientBG";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Octicons";
import PreviewComponent from "../components/PreviewComponent";
import ConstButton from "../components/ConstButton";

function Records({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [preview, setPreview] = useState(false);
  const toggleSortIcon = () => {
    setSortAsc(!sortAsc); // Toggle the state between true and false
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const handleDetails = () => {
    navigation.navigate("RecordDetails");
  };

  handlePrint = () => {
    navigation.navigate("TicketScreen");
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <KeyboardWithoutWrapper>
        <View style={{}}>
          {preview ? (
            <View
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  height: "auto",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                    marginTop: 25,
                  }}
                  onPress={() => setPreview(!preview)}
                >
                  <Icon size={30} name="leftcircleo"></Icon>
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
                </View>

                <View
                  style={{
                    backgroundColor: "#E4FAD9",
                    height: "100%",
                    padding: 40,
                  }}
                >
                  <View style={{}}>
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
                        <PreviewComponent
                          title={"MFRTA TICKET NO."}
                          value={"2030903"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"DATE"}
                          value={"02-10-2023"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"LAST NAME, FIRST NAME, MIDDLE NAME"}
                          value={"ANNA NICOLE GABRIENTO"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"DATE OF BIRTH"}
                          value={"09-12-2001"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"SEX"}
                          value={"F"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"NATIONALITY"}
                          value={"PHL"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"WEIGHT"}
                          value={"50"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"HEIGHT"}
                          value={"1.2"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"ADDRESS"}
                          value={"GUSA, CAGAYAN DE ORO CITY"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"LICENSE NO."}
                          value={"GA23-3233322-SADF1"}
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
                          value={"ALDUIN MAGALLONES"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"PLATE NO."}
                          value={"ABC123"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"MAKE"}
                          value={"TOYOTA"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"CLASS"}
                          value={"E CONNECT PANI"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"MODEL"}
                          value={"ISUZU"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"CONTACT NO."}
                          value={"09992837465"}
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
                          value={"4:11 PM"}
                        ></PreviewComponent>
                        <PreviewComponent
                          title={"PLACE OF VIOLATION"}
                          value={"Lapasan, Cagayan de Oro City"}
                        ></PreviewComponent>
                        <Text style={{ color: "grey", marginTop: 20 }}>
                          TRAFFIC RULES VIOLATION
                        </Text>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: 20,
                            marginTop: 10,
                          }}
                        >
                          <Icon
                            name="car"
                            style={{
                              marginRight: 10,
                              marginTop: 3,
                              fontSize: 25,
                            }}
                          ></Icon>
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {"Driving without a helmet"}
                          </Text>
                        </View>
                        <View style={{ marginTop: 40 }}>
                          <ConstButton
                            name={"printer"}
                            title={"RE-PRINT"}
                            height={50}
                            onPress={handlePrint}
                          ></ConstButton>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <KeyboardWithoutWrapper>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <View style={{ padding: 20 }}>
                  <View
                    style={{
                      height: "100%",
                      borderRadius: 40,
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        marginTop: 20,
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        style={{
                          width: "90%",
                          borderRadius: 20,
                          height: 40,
                          paddingLeft: 20,
                          paddingRight: 20,
                          backgroundColor: "#E0E0E0",
                          textAlign: "left",
                        }}
                      >
                        <Icon name="search1" style={{ fontSize: 25 }}></Icon>
                      </TextInput>
                      <TouchableOpacity onPress={toggleSortIcon}>
                        <Icon2
                          name={sortAsc ? "sort-asc" : "sort-desc"}
                          size={30}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginBottom: 10,
                        marginTop: 40,
                        height: "auto",
                      }}
                    >
                      <TouchableOpacity onPress={() => setPreview(!preview)}>
                        <View
                          style={{
                            width: "100%",
                            height: "auto",
                            paddingVertical: 10,
                            borderTopColor: "#D9D9D9",
                            borderBottomColor: "#D9D9D9",
                            borderTopWidth: 5,
                            borderBottomWidth: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{ marginLeft: "75%", fontWeight: "bold" }}
                          >
                            02-10-2023
                          </Text>

                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "green",
                            }}
                          >
                            202030803
                          </Text>

                          <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Anna Nicole Gabriento
                          </Text>
                          <Text style={{ fontSize: 15, marginTop: 5 }}>
                            GA23-3233322-SADF1
                          </Text>
                          <View
                            style={{
                              width: "80%",
                              marginLeft: 20,
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 5,
                            }}
                          >
                            <Icon name="right"></Icon>
                            <Text>Driving without a helmet</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardWithoutWrapper>
          )}
        </View>
      </KeyboardWithoutWrapper>
    </View>
  );
}

export default Records;
