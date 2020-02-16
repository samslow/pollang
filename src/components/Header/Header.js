import React from "react";
import { View, Text } from "react-native";

const Header = ({ title }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
