import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

class Header extends Component {
  state = {};
  open = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.icon} onPress={this.open}>
          <FontAwesome name="bars" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  headerContainer: {
    height: "13%",
    width: "100%",
    backgroundColor: "#DD80FF",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    // fontStyle: "italic",
    flex: 5,
    marginTop: 10
  },
  icon: {
    flex: 1,
    marginLeft: 5,
    marginTop: 10
  }
});
