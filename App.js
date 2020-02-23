import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'mobx-react';

import PollListStack from 'stacks/PollListStack/PollListStack';
import GeneratePoll from 'stacks/GeneratePoll/GeneratePoll';
import Mypage from 'screens/Mypage/MyPage';
import RootStore from 'stores/rootStore';

const Tab = createBottomTabNavigator();
const rootStore = new RootStore();

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider RootStore={rootStore}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="pollList">
          <Tab.Screen
            name="getPoll"
            component={GeneratePoll}
            options={{
              tabBarLabel: '투표 생성',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="vote" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="pollList"
            component={PollListStack}
            options={{
              tabBarLabel: '투표 목록',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="playlist-check"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="myPage"
            component={Mypage}
            options={{
              tabBarLabel: '내 정보',
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="user-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
