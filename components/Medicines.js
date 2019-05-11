import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Header from "./header";
import Medicine from "./medicine";
import Configs from "../constants/Configs";
import { NavigationEvents } from "react-navigation";

export default class Medicines extends React.Component {
  state = {
    medicines: [],
    isLoading: true
  };
  constructor() {
    super();
  }
  componentDidMount() {
    //console.log("componentDidMount");
    this.getAllMedicines();
  }

  getAllMedicines = () => {
    console.log("getAll");
    var url = Configs.serviceUrl + "medicines";
    return fetch(url)
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        this.setState({ medicines: res, isLoading: false });
      })
      .catch(err => console.log(err));
  };
  showDetails = med => {
    this.props.navigation.navigate("Details", med);
  };
  showResult = () => {
    if (this.state.medicines.length > 0) {
      return (
        <View>
          {this.state.medicines.map((med, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  this.showDetails(med);
                }}
              >
                <Medicine key={i} medicine={med} />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text>No Records Found</Text>
        </View>
      );
    }
  };
  componentWillUnmount() {}

  render() {
    if (this.state.isLoading)
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    return (
      <View style={styles.body}>
        <NavigationEvents onWillFocus={this.getAllMedicines} />
        <ScrollView>{this.showResult()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  header: {
    flex: 1,
    backgroundColor: "#DD80FF",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
  },
  body: {
    flex: 6,
    //  justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    width: "100%"
  }
});
