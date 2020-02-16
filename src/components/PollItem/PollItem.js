import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";
import { NeomorphBox } from "react-native-neomorph-shadows";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";

import COLOR from "theme/colorPallet";

const window = Dimensions.get("window");

const PollItem = ({ info }) => {
  return (
    <NeomorphBox
      style={{
        shadowRadius: 3,
        borderRadius: 10,
        backgroundColor: COLOR.bg,
        width: window.width * 0.95,
        height: 450,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NeomorphBox
        inner
        style={{
          shadowRadius: 5,
          borderRadius: 9,
          backgroundColor: COLOR.bg,
          width: window.width * 0.9,
          height: 430,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ margin: "3%" }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <NeomorphBox
                style={{
                  shadowRadius: 3,
                  borderRadius: 50,
                  backgroundColor: COLOR.bg,
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
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: COLOR.text, fontSize: 15 }}>
                    {info.author}
                  </Text>
                  <Text style={{ color: COLOR.text, fontSize: 12 }}>
                    {moment(info.createdDate.toDate()).format("M월 DD일")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("assets/voting.png")}
                resizeMode={"contain"}
                style={{
                  width: "80%",
                  height: 170,
                  marginBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLOR.text,
                  fontSize: 18 / PixelRatio.getFontScale(),
                  fontWeight: "bold",
                }}
              >
                {info.subject}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo
                  name="calendar"
                  color={COLOR.text}
                  size={20}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: COLOR.text }}>
                  <Text>
                    {moment(info.startDate.toDate()).format("M월 DD일")}부터{" "}
                    {moment(info.endDate.toDate()).format("M월 DD일")}까지
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: COLOR.voting,
                    borderRadius: 15,
                    marginLeft: 7,
                    marginRight: 5,
                  }}
                />
                <Text style={{ color: COLOR.voting }}>진행 중</Text>
              </View>
            </View>
            <View>
              <Text style={{ color: COLOR.text }}>
                품에 그러므로 그들의 원질이 무한한 인생을 그들을 때문이다.
                우리의 것은 이상, 우리의 곧 눈이 그들의 ...
                <Text style={{ color: "#888" }}> 더보기</Text>
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <NeomorphBox
                  style={{
                    shadowRadius: 3,
                    borderRadius: 5,
                    backgroundColor: COLOR.bg,
                    width: window.width * 0.8,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLOR.text }}>자세히 보기</Text>
                </NeomorphBox>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </NeomorphBox>
    </NeomorphBox>
  );
};

export default PollItem;
