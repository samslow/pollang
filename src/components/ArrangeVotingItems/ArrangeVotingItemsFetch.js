import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {toJS} from 'mobx';
import moment from 'moment';

const upVote = async (doc, cells, cell) => {
  console.log('doc, cells, cell', toJS(doc), toJS(cells), toJS(cell));
  const userId = await AsyncStorage.getItem('userId');
  let alreadyVote = false;
  if (moment().isAfter(moment(doc.endDate), 'minute')) {
    return alert('이미 종료된 투표에는 투표 할 수 없습니다.');
  }
  const votingItems = firestore()
    .collection('Poll')
    .doc(doc.id)
    .collection('votingItems');

  await votingItems.get().then(items => {
    items.forEach(item => {
      if (item.data().participants.includes(userId)) {
        alert('이미 투표했습니다.');
        alreadyVote = true;
      }
    });
  });

  !alreadyVote &&
    (await votingItems
      .where('value', '==', cell.value)
      .get()
      .then(items => {
        items.forEach(async item => {
          await votingItems.doc(item.id).update({
            participants: firestore.FieldValue.arrayUnion(userId),
          });
          alert(`${item.data().value} 투표 완료!`);
        });
      }));
};

export {upVote};
