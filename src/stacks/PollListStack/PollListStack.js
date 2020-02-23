import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PollList from 'screens/PollList/PollList';
import PollDetail from 'screens/PollDetail/PollDetail';

const PollListStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={PollList} headerMode="none">
      <Stack.Screen name="PollList" component={PollList} />
      <Stack.Screen name="PollDetail" component={PollDetail} />
    </Stack.Navigator>
  );
};

export default PollListStack;
