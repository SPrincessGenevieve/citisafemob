import React, { useState } from "react";
import { View } from "react-native";
import KeyboardWithoutWrapper from "../../../components/KeyboardWithoutWrapper";
import GradientBackground from "../../../components/GradientBG";
import { Text } from "react-native";
import ConstInput from "../../../components/ConstInput";
import ConstButton from "../../../components/ConstButton";
import axios from '../../../../plugins/axios'

function ForgotPass(props) {
  const [visible, setVisible] = useState(false);
  const [resend, setResend] = useState(false)
  const [countdown, setCountdown] = useState(60); // Set the initial countdown value in seconds

  const [mail, setMail] = useState({
    email: 'jaydemike21@gmail.com'
  });

  const handleForgotPassword = () => {
    axios.post('accounts/users/reset_password/', mail).then((response) => {
      console.log("Email Sent");
      setVisible(true);
      startCountdown(); // Start the countdown when the email is sent
    }).catch((error) => {
      console.log(error);
    });
  };

  const startCountdown = () => {
    setResend(true);
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the countdown reaches 0
    setTimeout(() => {
      clearInterval(intervalId);
      setResend(false);
      setCountdown(60); // Reset the countdown value
    }, 60000);
  };

  return (
    <KeyboardWithoutWrapper>
      <View style={{ height: 890, width: "100%", flex: 1 }}>
        <GradientBackground />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: 1,
            position: "absolute",
            width: "100%",
            marginTop: "40%",
            padding: 30,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 26, textAlign: "center" }}
            >
              Enter Email
            </Text>
            <Text style={{ textAlign: "center", color: "#71727A" }}>
              A link will be sent to your account to update your username and
              password
            </Text>
          </View>
          <Text style={{ fontSize: 25, color: "white", marginBottom: 30 }}>
            Forgot Password
          </Text>
          <ConstInput
            marginBottom={30}
            placeholder="Please enter your email"
            borderRadius={10}
            value={mail.email}
            onChangeText={(text) => {
              setMail({
                ...mail, email: text
              })
            }}
          ></ConstInput>
          {!resend ? (
            <ConstButton
            marginLeftText={-10}
            title="Send Email"
            height={55}
            onPress={handleForgotPassword}
          ></ConstButton>
          ) : (
            <Text style={{ fontSize: 16, color: "red" }}>
              Resend in {countdown} seconds
            </Text>            
          ) }

        </View>
        {visible ? (
          <View
            style={{
              width: "100%",
              height: 1000,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                width: "100%",
                height: 1000,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
              }}
            ></View>
            <View
              style={{
                padding: 20,
                backgroundColor: "white",
                width: "80%",
                height: 300,
                position: "absolute",
                top: 1,
                marginTop: "60%",
                borderRadius: 20,
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 30, marginTop: 60 }}
              >
                Email sent
              </Text>
              <ConstButton
                onPress={() => setVisible(!visible)}
                name="check"
                title="Done"
                height={55}
                marginLeftText={10}
              ></ConstButton>
              <Text>
                Please check your email. We have sent a link for you to update
                your password.
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </KeyboardWithoutWrapper>
  );
}

export default ForgotPass;
