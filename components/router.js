import React, { Component } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Add from "./add";
import Medicines from "./Medicines";
import MedicineDetails from "./MedicineDetails";
import Header from "./header";
import Buy from "./Buy";

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
  }
});

export const BuyStack = createStackNavigator({
  Buy: {
    screen: Buy,
    navigationOptions: {
      header: <Header title="Buy Medicine" />
    },
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
  }
});

export const Drawer = createDrawerNavigator({
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
    screen: AddStack,
    navigationOptions: {
      drawerLabel: "Buy Medicine",
      drawerIcon: <FontAwesome name="plus" size={20} color="#000" />
    }
  }
});

export const Tabs = createBottomTabNavigator({
  Add: {
    screen: Add
  },
  Medicines: {
    screen: Medicines
  }
});

export const Root = createStackNavigator({
  Drawer: Drawer
});
