import React, { Component } from "react";
import {
  Text,
  TextInput,
  ScrollView,
  DatePickerAndroid,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Picker,
  StyleSheet,
  TouchableNativeFeedback,
  View
} from "react-native";
import Header from "./header";
import Configs from "../constants/Configs";

class Add extends Component {
  state = {
    medicineName: "",
    manufacturer: "",
    medicineType: "Tablet",
    supplier: "",
    purchaseDate: "",
    expiryDate: "",
    price: 0,
    quantity: 0,
    types: ["Tablet", "Capsule", "Injection", "Syrup"]
  };

  submit = () => {
    var medicine = {
      medicineName: this.state.medicineName,
      manufacturerName: this.state.manufacturer,
      medicineType: this.state.medicineType
      // supplier: this.state.supplier,
      // price: this.state.price,
      // quantity: this.state.quantity,
      // expiryDate: this.state.expiryDate,
      // purchaseDate: this.state.purchaseDate
    };
    //console.log(medicine);
    var url = Configs.serviceUrl + "medicines";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(medicine)
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        if (result.message == "exists") alert("Medicine Already Exists");
        else this.props.navigation.navigate("Medicines");
      })
      .catch(err => console.log(err));
  };

  datepick = async value => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });
    //console.log(value);
    if (action != DatePickerAndroid.dismissedAction) {
      let date = new Date(year, month, day);
      if (value == "expiryDate")
        this.setState({ expiryDate: date.toLocaleDateString() });
      else this.setState({ purchaseDate: date.toLocaleDateString() });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Header title="Add Medicine" /> */}
        <View style={styles.body}>
          <TextInput
            style={styles.input}
            placeholder="Medicine Name"
            onChangeText={text => this.setState({ medicineName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Manufacturer"
            onChangeText={text => this.setState({ manufacturer: text })}
          />
          <Picker
            style={styles.picker}
            selectedValue={this.state.medicineType}
            onValueChange={(value, index) =>
              this.setState({ medicineType: value })
            }
            mode="dropdown"
          >
            {this.state.types.map((type, i) => {
              return <Picker.Item key={i} label={type} value={type} />;
            })}
          </Picker>
          {/*<TextInput
              style={styles.input}
              placeholder="Supplier"
              onChangeText={text => this.setState({ supplier: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              onChangeText={text => this.setState({ price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              onChangeText={text => this.setState({ quantity: text })}
            />
            <TouchableOpacity onPress={() => this.datepick("expiryDate")}>
              <TextInput
                style={styles.input}
                placeholder="Expiry Date"
                value={this.state.expiryDate}
                // onFocus={() => this.datepick("expiryDate")}
                editable={false}
                underlineColorAndroid="#000"
              />
            </TouchableOpacity>
             <TouchableOpacity onPress={() => this.datepick("purchaseDate")}>
              <TextInput
                style={styles.input}
                placeholder="Purchase Date"
                //onChangeText={text => this.setState({ purchaseDate: text })}
                editable={false}
                value={this.state.purchaseDate}
                underlineColorAndroid="#000"
              />
            </TouchableOpacity> */}
          <TouchableNativeFeedback
            onPress={this.submit}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

export default Add;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  input: {
    //paddingTop: 25,
    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16
    //justifyContent: "center"
  },
  picker: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 40
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    opacity: 0.5,
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 15,
    borderRadius: 5
  },
  buttonText: {
    margin: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  body: {
    flex: 5,
    //  justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    width: "100%"
  }
});