import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Left,
  Body,
  Icon,
  Title,
  Content,
  Button,
  DatePicker,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  View
} from "native-base";
import Header from "../components/header";
import {
  KeyboardAvoidingView,
  DatePickerAndroid,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import Expo from "expo";

class Buy extends Component {
  state = {
    loading: true,
    data: [],
    cardVisible: false,
    medicineName: "",
    date: ""
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }
  open = () => {
    this.props.navigation.openDrawer();
  };
  datePicker = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date()
    });
    //console.log(value);
    if (action != DatePickerAndroid.dismissedAction) {
      let date = new Date(year, month, day);
      this.setState({ date: date.toLocaleDateString() });
    }
  };
  filterData = query => {
    this.setState({ medicineName: query });
    if (query.length >= 1) {
      let url = "http://192.168.0.35:3000/medicines/" + query;
      console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(res => {
          this.setState({ data: res, cardVisible: true });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ cardVisible: false });
    }
  };
  displayResult = () => {
    if (this.state.cardVisible) {
      return (
        <ScrollView style={styles.autocomplete}>
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      medicineName: item.medicineName,
                      cardVisible: false
                    })
                  }
                >
                  <Text>{item.medicineName}</Text>
                </TouchableOpacity>
              </ListItem>
            )}
          >
            <ListItem>
              <Text />
            </ListItem>
          </List>
        </ScrollView>
      );
    }
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    //const data = this.filterData(this.state.query);
    return (
      <Container>
        <Header title="Buy Medicine" />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Medicine Name</Label>
                <Input
                  onChangeText={text => this.filterData(text)}
                  value={this.state.medicineName}
                />
              </Item>
              {this.displayResult()}
              <Item floatingLabel>
                <Label>MRP</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Buying Price</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Quantity</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Piece per Pack</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Purchase Date</Label>
                <TouchableOpacity
                  onPress={this.datePicker}
                  style={{
                    paddingLeft: 160,
                    paddingRight: 150,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#ccc",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flex: 1
                  }}
                >
                  <Text style={{ position: "relative" }}>
                    {this.state.date}
                  </Text>
                </TouchableOpacity>
              </Item>
            </Form>
            <Button primary block rounded style={{ margin: 30 }}>
              <Text>Submit</Text>
            </Button>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default Buy;

const styles = StyleSheet.create({
  autocomplete: {
    zIndex: 1,
    maxHeight: 200,
    // width: 500,
    position: "absolute",
    // padding: 12,
    marginTop: 65,
    marginLeft: 15,
    //maxWidth: 200,
    backgroundColor: "#f9f9f9",
    overflow: "scroll"
  }
});
