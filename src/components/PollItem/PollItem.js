import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Image from 'react-native-fast-image';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import colorPallet from 'theme/colorPallet';
import Profile from 'components/PollItem/Profile';

const window = Dimensions.get('window');

const PollItem = ({info}) => {
  const navigation = useNavigation();
  const decideVoteStatus = (start, end) => {
    if (moment().isBefore(start, 'hour')) {
      return {msg: '진행 전', color: colorPallet.beforeVoting};
    } else if (moment().isBetween(start, end)) {
      return {msg: '진행 중', color: colorPallet.voting};
    } else if (moment().isAfter(end)) {
      return {msg: '투표 완료', color: colorPallet.afterVoting};
    }
  };
  const voteStatus = decideVoteStatus(
    moment(info.startDate),
    moment(info.endDate),
  );
  const contentsCutter = msg => {
    return (
      <Text style={{color: colorPallet.text}}>
        {msg.slice(0, 60)}
        {msg.length > 60 && <Text style={{color: '#AAA'}}>... 더보기</Text>}
      </Text>
    );
  };
  return (
    <NeomorphBox
      style={{
        shadowRadius: 3,
        borderRadius: 10,
        backgroundColor: colorPallet.bg,
        width: window.width * 0.95,
        height: 450,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <NeomorphBox
        inner
        style={{
          shadowRadius: 5,
          borderRadius: 9,
          backgroundColor: colorPallet.bg,
          width: window.width * 0.9,
          height: 430,
        }}>
        <View style={{flex: 1}}>
          <View style={{margin: '3%'}}>
            <Profile
              author={info.authorName}
              date={{
                startDate: info.startDate,
                endDate: info.endDate,
                createdDate: info.createdDate,
              }}
              voteStatus={voteStatus}
            />
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('assets/voting.png')}
                resizeMode={'contain'}
                style={{
                  width: '80%',
                  height: 170,
                  marginBottom: 20,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18 / PixelRatio.getFontScale(),
                  fontWeight: 'bold',
                }}>
                {info.subject}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo
                  name="calendar"
                  color={colorPallet.text}
                  size={20}
                  style={{marginRight: 5}}
                />
                <Text style={{color: colorPallet.text}}>
                  {moment(info.startDate).format('MM-DD HH:mm')} ~{' '}
                  {moment(info.endDate).format('MM-DD HH:mm')}
                </Text>
              </View>
            </View>
            <View>{contentsCutter(info.contents)}</View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('PollDetail', {
                    info: info,
                    voteStatus: voteStatus,
                  })
                }>
                <NeomorphBox
                  style={{
                    shadowRadius: 3,
                    borderRadius: 5,
                    backgroundColor: colorPallet.bg,
                    width: window.width * 0.8,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: colorPallet.text}}>자세히 보기</Text>
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
