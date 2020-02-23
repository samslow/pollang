import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colorPallet from 'theme/colorPallet';
import {useNavigation} from '@react-navigation/native';

const WritePoll = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('GeneratePoll')}>
      <MaterialCommunityIcons name={'vote'} size={25} />
    </TouchableOpacity>
  );
};

export default WritePoll;
