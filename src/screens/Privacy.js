import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import ConstInput from "../components/ConstInputVisible";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../plugins/axios";
import { useNavigation } from "@react-navigation/native";

function Privacy(props) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [responseText, setResponseText] = useState("");

  const Token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState({
    new_password: "",
    re_new_password: "",
    current_password: "",
  });

  const handleChangePassword = () => {
    axios
      .post("accounts/users/set_password/", newPassword, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        setResponseText("Your password has been updated");
        alert("Changed Password Successfully");
        setNewPassword({
          new_password: "",
          re_new_password: "",
          current_password: "",
        });
      })
      .catch((error) => {
        console.log("Error Changed Password");
        setResponseText("Your password hasn't been updated");
      });
  };

  return (
    <View
      style={{
        display: "flex",
        height: 800,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <KeyboardWithoutWrapper>
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10%",
              backgroundColor: "white",
            }}
          >
            <View style={{ marginBottom: 40 }}>
              {display ? (
                <>
                  <Text>{responseText}</Text>
                </>
              ) : null}
            </View>
            <View style={{ width: 330 }}>
              <ConstInput
                text={"Current Password"}
                placeholder="Current Password"
                value={newPassword.current_password}
                onChangeText={(text) => {
                  setNewPassword({
                    ...newPassword,
                    current_password: text,
                  });
                }}
              ></ConstInput>
              <ConstInput
                text={"New Password"}
                placeholder="New Password"
                value={newPassword.new_password}
                onChangeText={(text) => {
                  setNewPassword({
                    ...newPassword,
                    new_password: text,
                  });
                }}
              ></ConstInput>
              <ConstInput
                text={"Confirm New Password"}
                placeholder="Confirm New Password"
                value={newPassword.re_new_password}
                onChangeText={(text) => {
                  setNewPassword({
                    ...newPassword,
                    re_new_password: text,
                  });
                }}
              ></ConstInput>
            </View>
            <View style={{ width: "60%", marginTop: 50 }}>
              <ConstButton
                onPress={handleChangePassword}
                height={50}
                title={"Save Changes"}
              ></ConstButton>
            </View>
          </View>
        </View>
      </KeyboardWithoutWrapper>
    </View>
  );
}

export default Privacy;
