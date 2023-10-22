import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import PreviewComponent from "../components/PreviewComponent";
import Icon from "react-native-vector-icons/Octicons";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultDriverRegisterd, setEmptyFinalDriver } from "../components/camera/infoSlice";
import { setDefaultCarRegistered, setEmptyFinalVehicle } from "../components/camera/infoSliceCOR";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';




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

  async function printreciept() {
  
    try {
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText(' MFTRTA Ticket No: ' + ticket.MFRTA_TCT_NO, { align: 'center' });
      await BluetoothEscposPrinter.printText('\r\n', {});
    
      // Personal Information
      await BluetoothEscposPrinter.printText('Personal Info', { align: 'left' });
    
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Name: ' + ticket.driver_info.last_name + ', ' + ticket.driver_info.first_name + ' ' + ticket.driver_info.middle_initial],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['DOB: ' + ticket.driver_info.birthdate],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Nationality: ' + ticket.driver_info.nationality],
        {},
      );
      // Check if the license_number is 'undefined'
      const licenseText = ticket.driver_info.license_number !== 'undefined' ? '' + ticket.driver_info.license_number : 'No License';

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['License Number: ' + licenseText],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Classification: ' + ticket.driver_info.classification],
        {},
      );

      await BluetoothEscposPrinter.printText('\r\n', {});
      // Vehicle Information
      await BluetoothEscposPrinter.printText('Vehicle Info', { align: 'left' });
      await BluetoothEscposPrinter.printText('\r\n', {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Owner: ' + ticket.vehicle_info.name],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Plate No.: ' + ticket.vehicle_info.plate_number],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Make: ' + ticket.vehicle_info.make],
        {},
      );

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Class: ' + ticket.vehicle_info.vehicle_class],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Model: ' + ticket.vehicle_info.vehicle_model],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Contact: ' + ticket.vehicle_info.contact_number],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Color: ' + ticket.vehicle_info.color],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Markings: ' + ticket.vehicle_info.body_markings],
        {},
      );

      // Violation Information
      await BluetoothEscposPrinter.printText('Violation Info', { align: 'left' });
      await BluetoothEscposPrinter.printText('\r\n', {});

      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Officer: ' + ticket.user_ID.first_name + ', ' + ticket.user_ID.middle_name + ' ' + ticket.user_ID.last_name],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Status: ' + ticket.ticket_status],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Date & Time: ' + ticket.date_issued],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Place of Violations: ' + ticket.place_violation],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.LEFT],
        ['Penalty Amount ' + ticket.penalty_amount],
        {},
      );
      // Violations
      await BluetoothEscposPrinter.printText('Violations', { align: 'left' });
      await BluetoothEscposPrinter.printText('\r\n', {});

      ticket.violation_info.violations_info.forEach(async (violation, index) => {
        const violationText = (index + 1) + '. ' + violation;
        await BluetoothEscposPrinter.printText(violationText, { align: 'left' });
        await BluetoothEscposPrinter.printText('\r\n', {});
      });

      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n', {});

    } catch (e) {
      alert(e.message || 'ERROR');
    }
    }
    

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
                      onPress={printreciept}
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
