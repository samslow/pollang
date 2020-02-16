import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import GeneratePoll from "screens/GeneratePoll/GeneratePoll";
import PollList from "screens/PollList/PollList";
import Mypage from "screens/Mypage/MyPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="pollList">
        <Tab.Screen
          name="getPoll"
          component={GeneratePoll}
          options={{
            tabBarLabel: "투표 생성",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="vote" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="pollList"
          component={PollList}
          options={{
            tabBarLabel: "투표 목록",
            tabBarIcon: ({ color, size }) => (
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
            tabBarLabel: "내 정보",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
