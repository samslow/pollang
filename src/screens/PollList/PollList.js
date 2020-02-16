import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import Header from "components/Header/Header";
import firestore from "@react-native-firebase/firestore";

import COLOR from "theme/colorPallet";
import PollItem from "components/PollItem/PollItem";
import FooterPoll from "components/PollItem/FooterPoll";
import PollPlaceHolder from "components/PollItem/PlaceHolder";

const PollList = () => {
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);

  const pollListRef = useRef();
  useEffect(() => {
    getPollList().then(data => {
      setPoll(data);
    });
  }, []);

  const getPollList = async () => {
    const pollList = await firestore()
      .collection("Poll")
      .get();
    let pollData = [];
    pollList.forEach(item => {
      pollData.push(item.data());
    });
    setLoading(false);

    return pollData;
  };

  const scrollUp = ref => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
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
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PollList;
