import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { NeomorphBox } from "react-native-neomorph-shadows";

import COLOR from "theme/colorPallet";

const FooterPoll = ({ scrollUp }) => {
  const window = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={() => scrollUp()}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
      }}
    >
      <NeomorphBox
        style={{
          flexDirection: "row",
          shadowRadius: 3,
          borderRadius: 10,
          backgroundColor: COLOR.bg,
          width: window.width * 0.5,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather
          name="arrow-up-circle"
          size={20}
          style={{ marginRight: 5 }}
          color={COLOR.text}
        />
        <Text style={{ color: COLOR.text }}>터치하여 위로 가기</Text>
      </NeomorphBox>
    </TouchableOpacity>
  );
};

export default FooterPoll;
