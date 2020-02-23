import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import Header from 'components/Header/Header';
import colorPallet from 'theme/colorPallet';
import AsyncStorage from '@react-native-community/async-storage';

const GeneratePoll = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [addItemContent, setAddItemContent] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [items, setItems] = useState(['항목 1', '항목 2', '항목 3']);
  const [showItem, setShowItem] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().format('YYYY-MM-DD HH:mm'),
  );
  const [endDate, setEndDate] = useState(
    moment()
      .add(1, 'day')
      .format('YYYY-MM-DD HH:mm'),
  );
  const navigation = useNavigation();

  const handleConfirm = (type, date) => {
    console.log('type, date', type);
    const configDate = moment(date).format('YYYY-MM-DD HH:mm');
    if (type === 'start') {
      setStartDate(configDate);
    } else {
      setEndDate(configDate);
    }
    setShowDatePicker(false);
  };

  const deleteItem = index => {
    items.splice(index, 1);
    setItems(items.concat());
  };

  const handleAddItem = () => {
    items.push(addItemContent);
    setShowItem(false);
    setAddItemContent('');
  };

  const handleSubmit = async () => {
    console.log('subject', subject);
    console.log('content', content);
    console.log('items', items);
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    const userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('userName');

    const ref = await firestore()
      .collection('Poll')
      .add({
        authorId: userId,
        authorName: userName,
        subject: subject,
        contents: content,
        startDate: startDate,
        endDate: endDate,
        createdDate: moment().format('YYYY-MM-DD HH:mm'),
      });
    items.forEach(async item => {
      await firestore()
        .collection('Poll')
        .doc(ref.id)
        .collection('votingItems')
        .add({
          participants: [],
          value: item,
        });
    });
    await firestore()
      .collection('Poll')
      .doc(ref.id)
      .update({
        id: ref.id,
      });
    navigation.navigate('PollList');
  };

  console.disableYellowBox = true;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#e0e5ec',
      }}>
      <Header
        title={'투표 생성'}
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
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView style={{paddingHorizontal: '5%'}}>
          <View>
            <Text style={{color: colorPallet.text}}>투표 제목</Text>
            <TextInput
              value={subject}
              style={{
                color: colorPallet.text,
                borderColor: colorPallet.text,
                borderWidth: 1,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 5,
              }}
              placeholder={'여기에 투표 제목을 입력하세요.'}
              onChangeText={text => setSubject(text)}
            />
          </View>
          <View>
            <Text style={{color: colorPallet.text}}>투표 기간</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '25%',
                  alignItems: 'center',
                  padding: 10,
                  borderColor: colorPallet.text,
                  marginRight: '5%',
                }}>
                <Text style={{color: colorPallet.text}}>시작 날짜</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: '70%',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colorPallet.text,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={{color: colorPallet.text}}>{startDate}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                headerTextIOS={'날짜를 선택하세요'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                onConfirm={date => {
                  console.log('start');
                  handleConfirm('start', date);
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: '25%',
                  alignItems: 'center',
                  padding: 10,
                  borderColor: colorPallet.text,
                  marginRight: '5%',
                }}>
                <Text style={{color: colorPallet.text}}>종료 날짜</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: '70%',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colorPallet.text,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={{color: colorPallet.text}}>{endDate}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                headerTextIOS={'날짜를 선택하세요'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                onConfirm={date => handleConfirm('end', date)}
                onCancel={() => setShowDatePicker(false)}
              />
            </View>
          </View>
          <View>
            <Text style={{color: colorPallet.text}}>투표 내용</Text>
            <TextInput
              value={content}
              style={{
                color: colorPallet.text,
                borderColor: colorPallet.text,
                borderWidth: 1,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginVertical: 5,
                height: 100,
              }}
              placeholder={'여기에 투표 내용을 입력하세요.'}
              multiline={true}
              onChangeText={text => setContent(text)}
            />
          </View>
          <View>
            <Text style={{color: colorPallet.text}}>투표 항목</Text>
            <View>
              <FlatList
                data={items}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: colorPallet.text,
                      paddingHorizontal: 10,
                      marginVertical: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: colorPallet.text}}>{item}</Text>
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={() => deleteItem(index)}>
                      <AntDesign
                        name={'minuscircleo'}
                        size={20}
                        color={colorPallet.text}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: colorPallet.text,
                      paddingHorizontal: 10,
                      marginVertical: 5,
                      alignItems: 'center',
                    }}
                    onPress={() => setShowItem(true)}>
                    <View style={{padding: 10}}>
                      <AntDesign
                        name={'pluscircleo'}
                        size={20}
                        color={colorPallet.text}
                      />
                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
          <View
            style={{width: '100%', alignItems: 'center', paddingVertical: 15}}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                width: '50%',
                alignItems: 'center',
                backgroundColor: colorPallet.voting,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                저 장
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={showItem}
          style={{
            margin: 0,
            padding: 0,
            justifyContent: 'center',
          }}
          onBackdropPress={() => setShowItem(false)}
          swipeDirection={['down']}>
          <View
            style={{
              height: '30%',
              borderRadius: 15,
              backgroundColor: '#FFF',
            }}>
            <View style={{alignItems: 'center', marginVertical: 15}}>
              <Text>항목 추가</Text>
            </View>
            <TextInput
              autoFocus
              placeholder={'추가할 항목을 적어주세요.'}
              value={addItemContent}
              onChangeText={text => setAddItemContent(text)}
              style={{
                marginHorizontal: 15,
                borderBottomWidth: 1,
                padding: 10,
                borderColor: colorPallet.text,
              }}
              onSubmitEditing={() => handleAddItem()}
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
                onPress={() => handleAddItem()}>
                <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                  추 가
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GeneratePoll;
