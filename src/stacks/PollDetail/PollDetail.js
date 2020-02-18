import React from "react";
import { View, Text, SafeAreaView, PixelRatio, Dimensions } from "react-native";
import Image from "react-native-fast-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import colorPallet from "theme/colorPallet";
import Header from "components/Header/Header";
import Profile from "components/PollItem/Profile";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import { NeomorphBox } from "react-native-neomorph-shadows";

const window = Dimensions.get("window");

const PollDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const info = route.params.info;
  const voteStatus = route.params.voteStatus;
  console.log("PollDetail route.params", info);

  const pollImage =
    info.pollImage !== null ? info.pollImage : require("assets/voting.png");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorPallet.bg }}>
      <Header title={"투표 정보"} />
      <View style={{ flex: 1, paddingHorizontal: "5%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <NeomorphBox
            style={{
              shadowRadius: 3,
              borderRadius: 5,
              backgroundColor: colorPallet.bg,
              width: window.width * 0.9,
              height: 270,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NeomorphBox
              inner
              style={{
                shadowRadius: 5,
                borderRadius: 5,
                backgroundColor: colorPallet.bg,
                width: window.width * 0.87,
                height: 255,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={pollImage}
                resizeMode={"contain"}
                style={{
                  width: "80%",
                  height: 270,
                }}
              />
            </NeomorphBox>
          </NeomorphBox>
        </View>
        <Profile
          author={info.author}
          date={{
            startDate: info.startDate,
            endDate: info.endDate,
            createdDate: info.createdDate,
          }}
          voteStatus={voteStatus}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo
            name="calendar"
            color={colorPallet.text}
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              color: colorPallet.text,
              fontSize: 17 / PixelRatio.getFontScale(),
            }}
          >
            {moment(info.startDate.toDate()).format("MM-DD HH:mm")} ~{" "}
            {moment(info.endDate.toDate()).format("MM-DD HH:mm")}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 17 / PixelRatio.getFontScale(),
              color: colorPallet.text,
            }}
          >
            {info.contents}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <NeomorphBox
            style={{
              shadowRadius: 3,
              borderRadius: 5,
              backgroundColor: colorPallet.bg,
              width: window.width * 0.9,
              height: 65,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NeomorphBox
              inner
              style={{
                shadowRadius: 3,
                borderRadius: 5,
                backgroundColor: colorPallet.bg,
                width: window.width * 0.87,
                height: 55,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20 / PixelRatio.getFontScale(),
                }}
              >
                {info.subject}
              </Text>
            </NeomorphBox>
          </NeomorphBox>
          <View>
            <Text>{info.votingItems[0].value}</Text>
            <Text>{info.votingItems[1].value}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PollDetail;
