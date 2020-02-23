import React from 'react';
import {View, Text} from 'react-native';
import colorPallet from 'theme/colorPallet';

const Header = ({left, title, right}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorPallet.bg,
      }}>
      <View style={{width: '15%', alignItems: 'center'}}>{left}</View>
      <View style={{width: '70%', alignItems: 'center'}}>
        <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
      <View style={{width: '15%', alignItems: 'center'}}>{right}</View>
    </View>
  );
};

export default Header;
