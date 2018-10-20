import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Badge } from "native-base";

class Medicine extends Component {
  state = {};
  dateFormat = date => {
    let newdate = new Date(date);
    let mm = newdate.getMonth() + 1;
    let yy = newdate.getFullYear();
    return mm + "/" + yy;
  };
  render() {
    let medicine = this.props.medicine;
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{medicine.medicineName}</Text>
          {/* <Text style={styles.rightText}>{medicine.manufacturerName}</Text> */}
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.rightText, styles.quantity]}>
            {medicine.quantity}
          </Text>

          <Text style={styles.rightText}>{medicine.price}</Text>
        </View>
      </View>
    );
  }
}

export default Medicine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: 350,
    marginLeft: 5,
    marginTop: 5,
    backgroundColor: "#fFF",
    flexDirection: "row"
  },
  title: {
    color: "#000",
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 5
  },
  rightContainer: {
    flex: 1,
    // alignContent: "right",
    alignItems: "flex-end",
    marginRight: 5
  },
  rightText: {
    color: "#000",
    fontSize: 20
  },
  leftText: {
    color: "#000",
    fontSize: 20
  },
  quantity: {
    marginBottom: 5
  }
});
