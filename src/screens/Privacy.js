import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import ConstInput from "../components/ConstInputVisible";
import ConstButton from "../components/ConstButton";
import KeyboardWithoutWrapper from "../components/KeyboardWithoutWrapper";

function Privacy(props) {
  const [display, setDisplay] = useState(false);
  const updated = () => {
    setDisplay(!display);
  };

  return (
    <KeyboardWithoutWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 150,
        }}
      >
        <View style={{ marginBottom: 40 }}>
          {display ? (
            <>
              <Text>Your password has been updated</Text>
            </>
          ) : null}
        </View>
        <View style={{ width: 330 }}>
          <ConstInput
            text={"Current Password"}
            placeholder="Current Password"
          ></ConstInput>
          <ConstInput
            text={"New Password"}
            placeholder="New Password"
          ></ConstInput>
          <ConstInput
            text={"Confirm New Password"}
            placeholder="Confirm New Password"
          ></ConstInput>
        </View>
        <View style={{ width: "60%", marginTop: 50 }}>
          <ConstButton
            onPress={updated}
            height={50}
            title={"Save Changes"}
          ></ConstButton>
        </View>
      </View>
    </KeyboardWithoutWrapper>
  );
}

export default Privacy;
