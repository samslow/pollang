import React from "react";
import { View, Button, Text } from "react-native";
import { NeomorphBox } from "react-native-neomorph-shadows";

const GeneratePoll = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e0e5ec",
      }}
    >
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <NeomorphBox
        style={{
          shadowRadius: 3,
          borderRadius: 100,
          backgroundColor: "#DDDDDD",
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NeomorphBox
          inner
          style={{
            shadowRadius: 7,
            borderRadius: 90,
            backgroundColor: "#F19F9F",
            width: 180,
            height: 180,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NeomorphBox
            style={{
              shadowRadius: 7,
              borderRadius: 50,
              backgroundColor: "#DDDDDD",
              width: 100,
              height: 100,
            }}
          />
        </NeomorphBox>
      </NeomorphBox>
    </View>
  );
};

export default GeneratePoll;
