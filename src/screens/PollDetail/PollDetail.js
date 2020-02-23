import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import Image from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import colorPallet from 'theme/colorPallet';
import Header from 'components/Header/Header';
import Profile from 'components/PollItem/Profile';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import {toJS} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import ArrangeVotingItems from 'components/ArrangeVotingItems/ArrangeVotingItems';

const window = Dimensions.get('window');

const PollDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const info = route.params.info;
  const voteStatus = route.params.voteStatus;
  console.log('PollDetail route.params', toJS(info));
  const [showChangeTitle, setShowChangeTitle] = useState(false);
  const [subject, setSubject] = useState(info.subject);

  const pollImage =
    info?.pollImage !== undefined
      ? info.pollImage
      : require('assets/voting.png');

  const isOwner = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (info.authorId === userId) {
      return true;
    }
    return false;
  };

  const handleDelete = () => {
    console.log('삭제 호출');
    Alert.alert(
      '삭제 경고',
      '한번 삭제된 투표는 다시 살릴 수 없습니다.\n계속하시겠습니까?',
      [
        {
          text: '네',
          onPress: async () => {
            await firestore()
              .collection('Poll')
              .doc(info.id)
              .delete();
            navigation.goBack();
          },
        },
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const changeTitle = () => {
    setShowChangeTitle(true);
  };

  const handleChangeSubject = () => {
    setShowChangeTitle(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorPallet.bg}}>
      <Header
        title={'투표 정보'}
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: '100%',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <AntDesign name="arrowleft" size={20} />
          </TouchableOpacity>
        }
        right={
          isOwner && (
            <TouchableOpacity
              onPress={() => handleDelete()}
              style={{
                height: '100%',
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <AntDesign name="delete" size={20} color={'#D44'} />
            </TouchableOpacity>
          )
        }
      />
      <ScrollView style={{flex: 1, paddingHorizontal: '5%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <NeomorphBox
            style={{
              shadowRadius: 3,
              borderRadius: 5,
              backgroundColor: colorPallet.bg,
              width: window.width * 0.9,
              height: 270,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <NeomorphBox
              inner
              style={{
                shadowRadius: 5,
                borderRadius: 5,
                backgroundColor: colorPallet.bg,
                width: window.width * 0.87,
                height: 255,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={pollImage}
                resizeMode={'contain'}
                style={{
                  width: '80%',
                  height: 270,
                }}
              />
            </NeomorphBox>
          </NeomorphBox>
        </View>
        <Profile
          author={info.authorName}
          date={{
            startDate: info.startDate,
            endDate: info.endDate,
            createdDate: info.createdDate,
          }}
          voteStatus={voteStatus}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Entypo
            name="calendar"
            color={colorPallet.text}
            size={20}
            style={{marginRight: 5}}
          />
          <Text
            style={{
              color: colorPallet.text,
              fontSize: 17 / PixelRatio.getFontScale(),
            }}>
            {moment(info.startDate).format('MM-DD HH:mm')} ~{' '}
            {moment(info.endDate).format('MM-DD HH:mm')}
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 17 / PixelRatio.getFontScale(),
              color: colorPallet.text,
            }}>
            {info.contents}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginVertical: 30}}>
          <NeomorphBox
            style={{
              shadowRadius: 3,
              borderRadius: 5,
              backgroundColor: colorPallet.bg,
              width: window.width * 0.9,
              height: 65,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <NeomorphBox
              inner
              style={{
                shadowRadius: 3,
                borderRadius: 5,
                backgroundColor: colorPallet.bg,
                width: window.width * 0.87,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 20 / PixelRatio.getFontScale(),
                  width: '85%',
                }}>
                {subject}
              </Text>
              <TouchableOpacity
                onPress={() => changeTitle()}
                style={{padding: 5}}>
                <Entypo name={'pencil'} size={20} style={{color: 'green'}} />
              </TouchableOpacity>
            </NeomorphBox>
          </NeomorphBox>

          <ArrangeVotingItems doc={info} />
        </View>
      </ScrollView>
      <Modal
        isVisible={showChangeTitle}
        style={{padding: 0, margin: 0}}
        onBackdropPress={() => setShowChangeTitle(false)}
        swipeDirection={['down']}>
        <View
          style={{backgroundColor: '#FFF', borderRadius: 15, height: '30%'}}>
          <View style={{alignItems: 'center', marginVertical: 15}}>
            <Text>투표 제목 변경</Text>
          </View>
          <TextInput
            autoFocus
            value={subject}
            onChangeText={text => setSubject(text)}
            style={{
              marginHorizontal: 15,
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorPallet.text,
            }}
            onSubmitEditing={() => handleChangeSubject()}
          />
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: colorPallet.voting,
                alignItems: 'center',
                paddingVertical: 10,
              }}
              onPress={() => handleChangeSubject()}>
              <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                변 경
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PollDetail;
