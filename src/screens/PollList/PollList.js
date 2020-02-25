import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import Header from 'components/Header/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import {useFocusEffect} from '@react-navigation/native';

import COLOR from 'theme/colorPallet';
import PollItem from 'components/PollItem/PollItem';
import FooterPoll from 'components/PollItem/FooterPoll';
import PollPlaceHolder from 'components/PollItem/PlaceHolder';

const PollList = ({RootStore}) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pollListRef = useRef();
  const PollListStore = RootStore.PollListStore;

  useEffect(() => {
    OneSignal.init('c2648951-c87e-4e95-b2cf-8d3c69ed4120', {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    getPollList().then(data => {
      PollListStore.set('pollList', data);
      setLoading(false);
    });
    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('focused');
      handleRefresh();
    }, []),
  );

  const onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  const onOpened = openResult => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = async device => {
    console.log('Device info: ', device);

    let userId = await AsyncStorage.getItem('userId');
    console.log('userId', userId);
    if (userId === null) {
      await AsyncStorage.setItem('userId', device.userId);
      const existUser = (
        await firestore()
          .collection('Users')
          .where('id', '==', device.userId)
          .get()
      ).size;
      if (existUser === 0) {
        await firestore()
          .collection('Users')
          .add({id: device.userId, name: 'Anonymous'});
        await AsyncStorage.setItem('userName', 'Anonymous');
      }
    }
  };

  const getPollList = async () => {
    const pollList = await firestore()
      .collection('Poll')
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
    console.log('pollData', pollData);

    return pollData;
  };

  const scrollUp = ref => {
    ref.current.scrollToOffset({animated: true, offset: 0});
    handleRefresh();
  };

  const handleRefresh = () => {
    console.log('새로고침!');
    setRefreshing(true);
    getPollList().then(data => {
      PollListStore.set('pollList', data);
    });
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.bg}}>
      <Header title="투표 목록" />
      {loading === true ? (
        <>
          <PollPlaceHolder />
          <PollPlaceHolder />
        </>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <FlatList
            ref={pollListRef}
            contentContainerStyle={{padding: 5}}
            data={PollListStore.pollList}
            renderItem={({item}) => <PollItem info={item} />}
            ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
            ListFooterComponent={
              <FooterPoll scrollUp={() => scrollUp(pollListRef)} />
            }
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

export default inject('RootStore')(observer(PollList));
