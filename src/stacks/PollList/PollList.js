import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import Header from "components/Header/Header";
import firestore from "@react-native-firebase/firestore";

import COLOR from "theme/colorPallet";
import PollItem from "components/PollItem/PollItem";
import FooterPoll from "components/PollItem/FooterPoll";
import PollPlaceHolder from "components/PollItem/PlaceHolder";
import moment from "moment";

const PollList = () => {
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const pollListRef = useRef();
  useEffect(() => {
    getPollList().then(data => {
      setPoll(data);
    });
  }, []);

  const getPollList = async () => {
    const pollList = await firestore()
      .collection("Poll")
      .orderBy("endDate")
      .get();
    let waitingPoll = [];
    let onGoingPoll = [];
    let closedPoll = [];
    pollList.forEach(item => {
      // 종료된 투표일 때
      if (moment().isAfter(item.data().endDate.toDate(), "minute")) {
        closedPoll.push(item.data());
      } else if (
        moment().isBetween(
          item.data().startDate.toDate(),
          item.data().endDate.toDate(),
          "minute",
        )
      ) {
        onGoingPoll.push(item.data());
      } else if (moment().isBefore(item.data().startDate.toDate(), "minute")) {
        waitingPoll.push(item.data());
      }
    });
    const pollData = onGoingPoll.concat(waitingPoll).concat(closedPoll);
    setLoading(false);

    return pollData;
  };

  const scrollUp = ref => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleRefresh = async () => {
    console.log("새로고침!");
    setRefreshing(true);
    await getPollList();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <Header title="투표 목록" />
      {loading === true ? (
        <>
          <PollPlaceHolder />
          <PollPlaceHolder />
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <FlatList
            ref={pollListRef}
            contentContainerStyle={{ padding: 5 }}
            data={poll}
            renderItem={({ item }) => <PollItem info={item} />}
            ItemSeparatorComponent={() => (
              <View style={{ marginVertical: 10 }} />
            )}
            ListFooterComponent={
              <FooterPoll scrollUp={() => scrollUp(pollListRef)} />
            }
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                title="원이 가득 차면 손을 놓으세요"
                titleColor={"#000"}
                colors={["#9Bd35A", "#689F38"]}
                tintColor={"#000"}
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PollList;
