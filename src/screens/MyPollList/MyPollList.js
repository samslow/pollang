import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, FlatList, RefreshControl} from 'react-native';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';

import PollItem from 'components/PollItem/PollItem';
import WritePoll from 'components/WritePoll/WritePoll';
import PollPlaceHolder from 'components/PollItem/PlaceHolder';
import Header from 'components/Header/Header';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const MyPollList = ({RootStore}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const PollListStore = RootStore.PollListStore;
  useEffect(() => {
    getMyPollList().then(data => {
      PollListStore.set('myPollList', data);
      setLoading(false);
    });
  }, []);

  const getMyPollList = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log('userId', userId);
    const pollList = await firestore()
      .collection('Poll')
      .where('authorId', '==', userId)
      .orderBy('endDate')
      .get();
    let waitingPoll = [];
    let onGoingPoll = [];
    let closedPoll = [];
    pollList.forEach(item => {
      // 종료된 투표일 때
      if (moment().isAfter(moment(item.data().endDate), 'minute')) {
        closedPoll.push(item.data());
      } else if (
        moment().isBetween(
          moment(item.data().startDate),
          moment(item.data().endDate),
          'minute',
        )
      ) {
        onGoingPoll.push(item.data());
      } else if (moment().isBefore(moment(item.data().startDate), 'minute')) {
        waitingPoll.push(item.data());
      }
    });
    const pollData = onGoingPoll.concat(waitingPoll).concat(closedPoll);

    return pollData;
  };

  const handleRefresh = async () => {
    console.log('새로고침!');
    setRefreshing(true);
    await getMyPollList();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#e0e5ec',
        alignItems: 'center',
      }}>
      <Header title={'내 투표 보기'} right={<WritePoll />} />
      {loading === true ? (
        <>
          <PollPlaceHolder />
          <PollPlaceHolder />
        </>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={{padding: 5}}
            data={PollListStore.myPollList}
            renderItem={({item}) => <PollItem info={item} />}
            ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                title="원이 가득 차면 손을 놓으세요"
                titleColor={'#000'}
                colors={['#9Bd35A', '#689F38']}
                tintColor={'#000'}
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

export default inject('RootStore')(observer(MyPollList));
