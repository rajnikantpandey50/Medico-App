import React from "react";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import MainDrawerNavigator from "./MainDrawerNavigator";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AuthLoadingScreen from "../components/AuthLoading";

export const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },

  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  }
});

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // AuthLoading: AuthLoadingScreen,
    // Login: Login,
    // Signup: Signup,
    Main: MainDrawerNavigator
  }
  //{ initialRouteName: "AuthLoading" }
);
