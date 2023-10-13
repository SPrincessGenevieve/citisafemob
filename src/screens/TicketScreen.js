import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import PreviewComponent from "../components/PreviewComponent";
import Icon from "react-native-vector-icons/Octicons";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Print from 'expo-print';
import {shareAsync} from 'expo-sharing'
import { setEmptyFinalDriver } from "../components/camera/infoSlice";
import { setEmptyFinalVehicle } from "../components/camera/infoSliceCOR";


function TicketScreen({ navigation }) {

  const dispatch = useDispatch();

  const ticket = useSelector((state) => state.ticket.ticketInfo)

  const handleCite = () => {
    navigation.navigate("HomeScreen");
  };

// DATE
  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

//  print
  const printTicket = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .section {
            margin-bottom: 5px; /* Adjusted margin */
          }
          .title {
            font-size: 14px; /* Adjusted font size */
            font-weight: bold;
          }
          .value {
            font-size: 12px; /* Adjusted font size */
          }
        </style>
      </head>
      <body>
        <div style="font-size: 14px; font-weight: bold; text-align: center;">MFTRTA Ticket No: ${ticket.MFRTA_TCT_NO}</div>
        
        <!-- Personal Information -->
        <div class="section">
          <div class="title">PERSONAL INFORMATION</div>
          <!-- Adjusted font size for personal information -->
          <div class="value">LAST NAME, FIRST NAME, MIDDLE NAME: ${ticket.driver_info.last_name}, ${ticket.driver_info.first_name} ${ticket.driver_info.middle_initial}.</div>
          <div class="value">DATE OF BIRTH: ${ticket.driver_info.birthdate}</div>
          <div class="value">NATIONALITY: ${ticket.driver_info.nationality}</div>
          <div class="value">ADDRESS: ${ticket.driver_info.address}</div>
          <div class="value">LICENSE NO.: ${ticket.driver_info.license_number !== 'undefined' ? ticket.driver_info.license_number : "No License Number"}</div>
        </div>

        <!-- Vehicle Information -->
        <div class="section">
          <div class="title">VEHICLE INFORMATION</div>
          <!-- Adjusted font size for vehicle information -->
          <div class="value">REGISTERED OWNER: ${ticket.vehicle_info.name}</div>
          <div class="value">PLATE NO.: ${ticket.vehicle_info.plate_number}</div>
          <div class="value">MAKE: ${ticket.vehicle_info.make}</div>
          <div class="value">CLASS: ${ticket.vehicle_info.vehicle_class}</div>
          <div class="value">MODEL: ${ticket.vehicle_info.vehicle_model}</div>
          <div class="value">CONTACT NO.: ${ticket.vehicle_info.contact_number}</div>
          <div class="value">COLOR: ${ticket.vehicle_info.color}</div>
          <div class="value">BODY MARKS: ${ticket.vehicle_info.body_markings}</div>
        </div>

        <!-- Violation Information -->
        <div class="section">
          <div class="title">VIOLATION INFORMATION</div>
          <div class="value">APPREHENDING OFFICER: ${ticket.user_ID.first_name}, ${ticket.user_ID.middle_name} ${ticket.user_ID.last_name}.</div>
          <div class="value">DATE AND TIME: ${ticket.date_issued}</div>
          <div class="value">PLACE OF VIOLATION: ${ticket.place_violation}</div>
          <div class="title">TRAFFIC RULES VIOLATION</div>
          
          <!-- Map over violations_info array and display each violation -->
          ${ticket.violation_info.violations_info.map((violation, index) => `
            <div class="value">${index + 1}. ${violation}</div>
          `).join('')}
        </div>
        
      </body>
    </html>
  `;
    try {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('File has been saved to:', uri);

      // Share the generated PDF file
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

      dispatch(setEmptyFinalDriver());
      dispatch(setEmptyFinalVehicle());
      navigation.navigate("HomeScreen");

    } catch (error) {
      console.error('Error while printing:', error);
    }
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
          <Text style={{ textAlign: "center" }}>{formattedDate}</Text>
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
              {ticket.MFRTA_TCT_NO}
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
                    value={`${ticket.driver_info.last_name}, ${ticket.driver_info.first_name} ${ticket.driver_info.middle_initial}.`}
                    ></PreviewComponent>
                  <PreviewComponent
                    title={"DATE OF BIRTH"}
                    value={ticket.driver_info.birthdate}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"NATIONALITY"}
                    value={ticket.driver_info.nationality}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"ADDRESS"}
                    value={ticket.driver_info.address}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"LICENSE NO."}
                    value={ticket.driver_info.license_number !== 'undefined' ? ticket.driver_info.license_number : "No License Number"}
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
                    value={ticket.vehicle_info.name}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"PLATE NO."}
                    value={ticket.vehicle_info.plate_number}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"MAKE"}
                    value={ticket.vehicle_info.make}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"CLASS"}
                    value={ticket.vehicle_info.vehicle_class}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"MODEL"}
                    value={ticket.vehicle_info.vehicle_model}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"CONTACT NO."}
                    value={ticket.vehicle_info.contact_number}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"COLOR"}
                    value={ticket.vehicle_info.color}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"BODY MARKS"}
                    value={ticket.vehicle_info.body_markings}
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
                    value={`${ticket.user_ID.first_name}, ${ticket.user_ID.middle_name} ${ticket.user_ID.last_name}.`}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"DATE AND TIME"}
                    value={ticket.date_issued}
                  ></PreviewComponent>
                  <PreviewComponent
                    title={"PLACE OF VIOLATION"}
                    value={ticket.place_violation}
                  ></PreviewComponent>
                  <Text style={{ color: "grey", marginTop: 20 }}>
                    TRAFFIC RULES VIOLATION
                  </Text>
                  {ticket.violation_info.violations_info.map((violation, index) => (
                  <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                  > 
                          <Icon
                            name="dot-fill"
                            style={{ marginRight: 10, marginTop: 3 }}
                          ></Icon>
                          <Text
                            style={{ fontSize: 20, fontWeight: "bold" }}
                            key={index}
                          >
                            {violation}
                          </Text>                
                 </View>                    
                  ))}



                  <View style={{ marginTop: 40 }}>
                    <ConstButton
                      name={"printer"}
                      title={"PRINT"}
                      height={50}
                      onPress={printTicket}
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
