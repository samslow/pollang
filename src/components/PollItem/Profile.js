import React from "react";
import { View, Text } from "react-native";
import { NeomorphBox } from "react-native-neomorph-shadows";
import moment from "moment";
import colorPallet from "theme/colorPallet";
import Image from "react-native-fast-image";

const Profile = ({ author, date, voteStatus }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "space-between",
      }}
    >
      <NeomorphBox
        style={{
          shadowRadius: 3,
          borderRadius: 50,
          backgroundColor: colorPallet.bg,
          width: 45,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/avatar1.jpg")}
          style={{ width: 40, height: 40, borderRadius: 45 }}
        />
      </NeomorphBox>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          marginLeft: 10,
        }}
      >
        <Text style={{ color: colorPallet.text, fontSize: 15 }}>{author}</Text>
        <Text style={{ color: colorPallet.text, fontSize: 12 }}>
          {moment(date.createdDate.toDate()).format("M월 DD일")}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: voteStatus.color,
            borderRadius: 15,
            marginLeft: 7,
            marginRight: 5,
          }}
        />
        <Text style={{ color: voteStatus.color }}>{voteStatus.msg}</Text>
      </View>
    </View>
  );
};

export default Profile;
