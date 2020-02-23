import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import {NeomorphBox} from 'react-native-neomorph-shadows';
import firestore from '@react-native-firebase/firestore';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx';
import {useNavigation} from '@react-navigation/native';

import colorPallet from 'theme/colorPallet';
import {upVote} from 'components/ArrangeVotingItems/ArrangeVotingItemsFetch';

const window = Dimensions.get('window');

const arrangeVotingItems = ({doc, RootStore}) => {
  const PollListStore = RootStore.PollListStore;
  const navigation = useNavigation();
  console.log('doc', toJS(doc));

  useEffect(() => {
    firestore()
      .collection('Poll')
      .doc(doc.id)
      .collection('votingItems')
      .orderBy('value')
      .get()
      .then(votingList => {
        const items = [];
        votingList.forEach(item => {
          items.push(item.data());
        });
        PollListStore.set('votingItems', items);
      });
  }, []);

  return (
    <View>
      {PollListStore.votingItems.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={async () => {
              await upVote(doc, PollListStore.votingItems, item);
              navigation.navigate('PollList');
            }}>
            <NeomorphBox
              style={{
                shadowRadius: 3,
                borderRadius: 5,
                backgroundColor: colorPallet.bg,
                width: window.width * 0.9,
                height: 50,
                paddingHorizontal: 15,
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colorPallet.text}}>{item.value}</Text>
                <Text style={{color: colorPallet.text}}>
                  {PollListStore.votingItems[index].participants.length} 표
                </Text>
              </View>
            </NeomorphBox>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default inject('RootStore')(observer(arrangeVotingItems));
