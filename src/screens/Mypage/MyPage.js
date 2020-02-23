import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

import Header from 'components/Header/Header';
import colorPallet from 'theme/colorPallet';

const MyPage = () => {
  const [userName, setUserName] = useState('');
  const [nameChangeModal, setNameChangeModal] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => setUserName(name));
  }, []);

  const handleSubmitUserName = async () => {
    const userId = await AsyncStorage.getItem('userId');
    (
      await firestore()
        .collection('Users')
        .where('id', '==', userId)
        .get()
    ).forEach(user => {
      console.log('user', user);
      firestore()
        .collection('Users')
        .doc(user.id)
        .update({
          name: userName,
        });
    });
    setNameChangeModal(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorPallet.bg}}>
      <Header title={'내 정보'} />
      <View
        style={{
          flex: 1,
          backgroundColor: colorPallet.bg,
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <NeomorphBox
          style={{
            shadowRadius: 3,
            borderRadius: 100,
            backgroundColor: colorPallet.bg,
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('assets/avatar1.jpg')}
            style={{width: 140, height: 140, borderRadius: 150}}
          />
        </NeomorphBox>
        <View
          style={{
            flex: 1,
            width: '100%',
            marginTop: '10%',
            alignItems: 'flex-start',
            paddingHorizontal: '5%',
          }}>
          <Text style={{marginVertical: 10}}>이름</Text>
          <TouchableOpacity
            onPress={() => setNameChangeModal(true)}
            style={{
              borderWidth: 1,
              borderRadius: 15,
              width: '100%',
              padding: 10,
            }}>
            <Text>{userName}</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 20,
            }}>
            <Text style={{marginVertical: 10}}>투표 시작 알람</Text>
            <Switch disabled />
          </View>
        </View>
      </View>
      <Modal
        isVisible={nameChangeModal}
        style={{padding: 0, margin: 0}}
        onBackdropPress={() => setNameChangeModal(false)}
        swipeDirection={['down']}>
        <View
          style={{backgroundColor: '#FFF', borderRadius: 15, height: '30%'}}>
          <View style={{alignItems: 'center', marginVertical: 15}}>
            <Text>유저 이름 변경</Text>
          </View>
          <TextInput
            autoFocus
            value={userName}
            onChangeText={text => setUserName(text)}
            style={{
              marginHorizontal: 15,
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorPallet.text,
            }}
            onSubmitEditing={() => handleSubmitUserName()}
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
              onPress={() => handleSubmitUserName()}>
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

export default MyPage;
