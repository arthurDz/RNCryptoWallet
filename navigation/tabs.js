import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setTradeModalVisibility } from "../stores/tab/tabActions";

import { TabIcon } from "../components/index";
import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarCutomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
  const dispatch = useDispatch();
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducer.isTradeModalVisible
  );

  const tradeTabBtnOnClickHandler = () => {
    dispatch(setTradeModalVisibility(!isTradeModalVisible));
  };

  // console.log(isTradeModalVisible);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 100,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return isTradeModalVisible ? null : (
              <TabIcon focused={focused} icon={icons.home} label="Home" />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return isTradeModalVisible ? null : (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                label="Portfolio"
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={
                  isTradeModalVisible ? { width: 15, height: 15 } : null
                }
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <TabBarCutomButton
              {...props}
              onPress={() => tradeTabBtnOnClickHandler()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            return isTradeModalVisible ? null : (
              <TabIcon focused={focused} icon={icons.market} label="Market" />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return isTradeModalVisible ? null : (
              <TabIcon focused={focused} icon={icons.profile} label="Profile" />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
