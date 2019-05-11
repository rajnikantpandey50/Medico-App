import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { Right, Button } from "native-base";
import * as firebase from "firebase";

class Header extends Component {
  state = {};
  open = () => {
    this.props.navigation.openDrawer();
  };
  logout = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("login");
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.icon} onPress={this.open}>
          <FontAwesome name="bars" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.title}</Text>

        {/* <Button transparent style={styles.logout} onPress={this.logout}>
          <FontAwesome name="sign-out" size={30} color="#fff" />
        </Button> */}
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
  },
  logout: {
    flex: 1,
    alignContent: "flex-end",
    justifyContent: "center",
    marginTop: 30
  }
});
