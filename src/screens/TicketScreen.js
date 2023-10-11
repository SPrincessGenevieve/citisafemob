import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import PreviewComponent from "../components/PreviewComponent";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Octicons";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";

function TicketScreen({ navigation }) {

  
  const handleCite = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <KeyboardWithoutWrapper>
      <View
        style={{
          padding: 20,
          alignContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            padding: 20,
            alignContent: "center",
            width: "100%",
            height: "auto",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            MFTRTA
          </Text>
          <Text style={{ textAlign: "center" }}>09-10-2023</Text>
          <View
            style={{
              borderWidth: 2,
              marginTop: 30,
              padding: 20,
              borderRadius: 10,
              borderStyle: "dashed",
            }}
          >
            <Text
              style={{
                position: "absolute",
                backgroundColor: "white",
                padding: 5,
                marginTop: -15,
                marginLeft: 97,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              MFBRTA Ticket No.
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
            >
              2020083
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "auto",
              marginTop: 30,
            }}
          >
            <View style={{}}>
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    PERSONAL INFORMATION
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 25,
                    borderStyle: "dashed",
                    borderBottomWidth: 2,
                  }}
                >
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
                      fontSize: 25,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    VEHICLE INFORMATION
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: 20,
                    borderStyle: "dashed",
                    borderBottomWidth: 2,
                  }}
                >
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
                      fontSize: 25,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    VIOLATION INFORMATION
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
                      title={"PRINT"}
                      height={50}
                      onPress={handleCite}
                    ></ConstButton>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardWithoutWrapper>
  );
}

export default TicketScreen;
