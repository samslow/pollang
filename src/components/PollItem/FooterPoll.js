import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const FooterPoll = ({ scrollUp }) => {
  return (
    <TouchableOpacity
      onPress={() => scrollUp()}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        flexDirection: "row",
      }}
    >
      <Feather name="arrow-up-circle" size={20} style={{ marginRight: 5 }} />
      <Text>터치하여 위로 가기</Text>
    </TouchableOpacity>
  );
};

export default FooterPoll;
