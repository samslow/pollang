import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GeneratePoll from 'screens/GeneratePoll/GeneratePoll';
import MyPollList from 'screens/MyPollList/MyPollList';

const GeneratePollStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={MyPollList} headerMode="none">
      <Stack.Screen name="MyPollList" component={MyPollList} />
      <Stack.Screen name="GeneratePoll" component={GeneratePoll} />
    </Stack.Navigator>
  );
};

export default GeneratePollStack;
