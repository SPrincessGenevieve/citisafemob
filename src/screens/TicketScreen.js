import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import PreviewComponent from "../components/PreviewComponent";
import Icon from "react-native-vector-icons/Octicons";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultDriverRegisterd,
  setEmptyFinalDriver,
} from "../components/camera/infoSlice";
import {
  setDefaultCarRegistered,
  setEmptyFinalVehicle,
  setEmptyextractedInfo,
} from "../components/camera/infoSliceCOR";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";
import { hsdLogo } from "./dummy-logo";

function TicketScreen({ navigation }) {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket.ticketInfo);

  const handleCite = () => {
    navigation.navigate("HomeScreen");
  };

  // DATE
  // Get the current date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  const options = {
    width: 384, // Set the pic width (dots) based on your device (58mm - 58)
    left: 0, // Set the left padding for printing position adjustment
  };
  async function printreciept() {
    try {
      // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.printText("Republic of the Philippines ", {
        align: "center",
      });
      await BluetoothEscposPrinter.printText(
        "Municipality of Manolo Fortich ",
        { align: "center" }
      );
      await BluetoothEscposPrinter.printText(
        "ROADS AND TRAFFIC ADMINISTRATION ",
        { align: "center", widthtimes: 3 }
      );
      await BluetoothEscposPrinter.printText("GEMS - eMFTC ", {
        align: "center",
      });
      await BluetoothEscposPrinter.printText(
        " MFTRTA Ticket No: " + ticket.MFRTA_TCT_NO,
        { align: "center" }
      );
      // await BluetoothEscposPrinter.printPic(hsdLogo, options);

      // Personal Information
      await BluetoothEscposPrinter.printText("Personal Info", {
        align: "center",
      });
      await BluetoothEscposPrinter.printText(
        " Name: " +
          ticket.driver_info.last_name +
          ", " +
          ticket.driver_info.first_name +
          " " +
          ticket.driver_info.middle_initial,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Date of Birth: " + ticket.driver_info.birthdate,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Nationality: " + ticket.driver_info.nationality,
        { align: "left" }
      );
      // Check if the license_number is 'undefined'
      const licenseText =
        ticket.driver_info.license_number !== "undefined"
          ? "" + ticket.driver_info.license_number
          : "No License";
      await BluetoothEscposPrinter.printText(" License No: " + licenseText, {
        align: "left",
      });
      await BluetoothEscposPrinter.printText(
        " Classification: " + ticket.driver_info.classification,
        { align: "left" }
      );

      // Vehicle Information
      await BluetoothEscposPrinter.printText(
        "--------------------------------",
        { align: "center" }
      );
      await BluetoothEscposPrinter.printText("Vehicle Information", {
        align: "center",
      });
      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printText(
        " Owner: " + ticket.vehicle_info.name,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Plate Number: " + ticket.vehicle_info.plate_number,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Make: " + ticket.vehicle_info.make,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Class: " + ticket.vehicle_info.vehicle_class,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Model: " + ticket.vehicle_info.vehicle_model,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Color: " + ticket.vehicle_info.color,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Body Markings: " + ticket.vehicle_info.body_markings,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Contact Number: " + ticket.vehicle_info.contact_number,
        { align: "left" }
      );

      // Violation Information
      await BluetoothEscposPrinter.printText(
        "--------------------------------",
        { align: "center" }
      );
      await BluetoothEscposPrinter.printText("Violation Info", {
        align: "left",
      });
      await BluetoothEscposPrinter.printText("\r\n", {});

      await BluetoothEscposPrinter.printText(
        " Officer: " +
          ticket.user_ID.first_name +
          ", " +
          ticket.user_ID.middle_name +
          " " +
          ticket.user_ID.last_name,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Status: " + ticket.ticket_status,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Date & Time: " + ticket.date_issued,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Place of Violations: " + ticket.place_violation,
        { align: "left" }
      );
      await BluetoothEscposPrinter.printText(
        " Penalty Amount: " + ticket.penalty_amount,
        { align: "left" }
      );

      // Violations
      await BluetoothEscposPrinter.printText(
        "--------------------------------",
        { align: "center" }
      );
      await BluetoothEscposPrinter.printText("Violations", { align: "center" });
      await BluetoothEscposPrinter.printText("\r\n", {});

      ticket.violation_info.violations_info.forEach(
        async (violation, index) => {
          const violationText = index + 1 + ". " + violation;
          await BluetoothEscposPrinter.printText(violationText, {
            align: "left",
          });
          await BluetoothEscposPrinter.printText("\r\n", {});
        }
      );

      await BluetoothEscposPrinter.printText("\r\n", {});
      await BluetoothEscposPrinter.printText("\r\n", {});

      dispatch(setEmptyFinalDriver());
      dispatch(setEmptyFinalVehicle());
      dispatch(setEmptyextractedInfo());
      navigation.navigate("HomeScreen");
    } catch (e) {
      alert(e.message || "ERROR");

      dispatch(setEmptyFinalDriver());
      dispatch(setEmptyFinalVehicle());
      dispatch(setEmptyextractedInfo());
      navigation.navigate("HomeScreen");
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
                    value={
                      ticket.driver_info.license_number !== "undefined"
                        ? ticket.driver_info.license_number
                        : "No License Number"
                    }
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
                  {ticket.violation_info.violations_info.map(
                    (violation, index) => (
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
                    )
                  )}
                  <View style={{ marginTop: 20 }}>
                    <ConstButton
                      name={"home"}
                      title={"Home"}
                      height={50}
                      onPress={handleCite}
                    ></ConstButton>
                    <ConstButton
                      name={"printer"}
                      title={"Print"}
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
