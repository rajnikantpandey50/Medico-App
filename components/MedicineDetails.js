import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";

class MedicineDetails extends Component {
  state = {};
  update = () => {
    console.log("update");
  };
  dateFormat = date => {
    console.log(date);
    if (!date) return "Not Available";
    let newdate = new Date(date);
    let dd = newdate.getDate();
    let mm = newdate.getMonth() + 1;
    let yy = newdate.getFullYear();
    return dd + "/" + mm + "/" + yy;
  };
  render() {
    let {
      medicineName,
      manufacturerName,
      medicineType,
      supplier,
      quantity,
      mrp,
      totalQuantity,
      //expiryDate,
      purchaseDate,
      totalSold
    } = this.props.navigation.state.params;
    //expiryDate = this.dateFormat(expiryDate[0]);
    // console.log(expiryDate);
    purchaseDate = this.dateFormat(purchaseDate);
    totalQuantity = totalQuantity || 0;
    let expDate = "Not Available";
    let expiryDate = [];
    quantity.forEach(q => {
      //  console.log(q.expiryDate);
      expiryDate.push(q.expiryDate);
    });
    if (expiryDate.length > 0) {
      expDate = this.dateFormat(
        expiryDate.reduce(function(a, b) {
          return a < b ? a : b;
        })
      );
    } else expDate = "Not Available";
    return (
      <ScrollView style={styles.container}>
        <View style={{ borderWidth: 1 }}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Medicine Name:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{medicineName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Medicine Type:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{medicineType}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Manufactuer Name:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{manufacturerName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Supplier:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{supplier}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>MRP:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{mrp}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Quantity:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>{totalQuantity}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Exp. Date:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}> {expDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Purchase Date:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}> {purchaseDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Total Sold:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}> {totalSold || 0} Pack</Text>
            </View>
          </View>
        </View>
        <TouchableNativeFeedback
          onPress={this.update}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}

export default MedicineDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 5
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flex: 1,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1
  },
  text: {
    fontSize: 20
  },
  button: {
    width: "70%",
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    opacity: 0.5,
    justifyContent: "center",
    marginLeft: "15%",
    marginTop: 15,
    borderRadius: 5
  },
  buttonText: {
    margin: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
});
