import React, { Component } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Add from "../components/add";
import Medicines from "../components/Medicines";
import MedicineDetails from "../components/MedicineDetails";
import Header from "../components/header";
import Buy from "../components/Buy";
import Sell from "../components/Sell";
import SellResult from "../components/SellResult";
import Edit from "../components/Edit";

export const AddStack = createStackNavigator({
  Add: {
    screen: Add,
    navigationOptions: {
      header: <Header title="Add Medicine" />
    },
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  }
});

export const MedicineStack = createStackNavigator({
  Medicines: {
    screen: Medicines,
    navigationOptions: {
      header: <Header title="All Medicines" />
    },
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  },

  Details: {
    screen: MedicineDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.medicineName.toUpperCase(),
      headerStyle: { backgroundColor: "#DD80FF" },
      headerTintColor: "#fff"
    }),
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.medicineName.toUpperCase(),
      headerStyle: { backgroundColor: "#DD80FF" },
      headerTintColor: "#fff"
    }),
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  }
});

export const SellStack = createStackNavigator({
  Sell: {
    screen: Sell,
    navigationOptions: {
      header: <Header title="Sell Medicines" />
    },
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  },
  Result: {
    screen: SellResult,
    navigationOptions: {
      header: <Header title="Sell Result" />
    },
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  }
});

export default createDrawerNavigator({
  Medicines: {
    screen: MedicineStack,
    navigationOptions: {
      drawerLabel: "Medicine List",
      drawerIcon: <FontAwesome name="list" size={20} color="#000" />
    }
  },
  Add: {
    screen: AddStack,
    navigationOptions: {
      // header: <Header title="Add Medicine" />,
      drawerLabel: "Add Medicine",
      drawerIcon: <FontAwesome name="plus" size={20} color="#000" />
    }
  },
  Buy: {
    screen: Buy,
    navigationOptions: {
      drawerLabel: "Buy Medicine",
      drawerIcon: <FontAwesome name="shopping-cart" size={20} color="#000" />
    }
  },
  Sell: {
    screen: SellStack,
    navigationOptions: {
      drawerLabel: "Sell Medicine",
      drawerIcon: <FontAwesome name="money" size={20} color="#000" />
    }
  }
});
