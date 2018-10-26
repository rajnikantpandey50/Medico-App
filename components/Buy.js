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
  View,
  H1,
  Right
} from "native-base";
import Header from "../components/header";
import {
  KeyboardAvoidingView,
  DatePickerAndroid,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Modal
} from "react-native";

import Expo from "expo";
import Configs from "../constants/Configs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

class Buy extends Component {
  state = {
    loading: true,
    submit: false,
    content: {},
    data: [],
    cardVisible: false,
    medicineName: "",
    supplier: "",
    mrp: 0,
    price: 0,
    quantity: 0,
    ppp: 0,
    date: "",
    expiryDate: [],
    modalVisible: false,
    medicines: []
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
      let url = Configs.localUrl + "medicines/" + query;
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
        // <ScrollView style={styles.autocomplete}>
        <List
          onTouchStart={ev => {
            this.setState({ content: { flex: 1 } });
          }}
          onMomentumScrollEnd={e => {
            this.setState({ content: {} });
          }}
          onScrollEndDrag={e => {
            this.setState({ content: {} });
          }}
          style={styles.autocomplete}
          dataArray={this.state.data}
          renderRow={item => (
            <ListItem>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    medicineName: item.medicineName,
                    cardVisible: false,
                    content: {}
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
        // </ScrollView>
      );
    }
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setExpDate = newDate => {
    let expDate = this.state.expiryDate;
    expDate.push(newDate);
    this.setState({ expiryDate: expDate });
  };

  datePickers = () => {
    var indents = [];
    for (var i = 0; i < this.state.quantity; i++) {
      indents.push(
        <ListItem key={i}>
          <Left>
            <Text>{i + 1}.</Text>

            <Body style={{ flex: 1 }}>
              <DatePicker onDateChange={this.setExpDate} />
            </Body>
          </Left>
        </ListItem>
      );
    }
    return indents;
  };

  addToList = () => {
    let medicines = this.state.medicines;
    let medicine = {
      medicineName: this.state.medicineName,
      supplier: this.state.supplier,
      mrp: this.state.mrp,
      price: this.state.price,
      quantity: this.state.quantity,
      ppp: this.state.ppp,
      purchaseDate: this.state.date,
      expiryDate: this.state.expiryDate
    };
    medicines.push(medicine);
    this.setState({
      medicines: medicines,
      submit: true,
      content: {},
      data: [],
      cardVisible: false,
      medicineName: "",
      // supplier: "",
      mrp: 0,
      price: 0,
      quantity: 0,
      ppp: 0,
      //date: "",
      expiryDate: [],
      modalVisible: false
    });
  };

  buyMedicine = () => {
    // const value = {
    //   medicineName: this.state.medicineName,
    //   supplier: this.state.supplier,
    //   mrp: this.state.mrp,
    //   price: this.state.price,
    //   quantity: this.state.quantity,
    //   ppp: this.state.ppp,
    //   purchaseDate: this.state.date,
    //   expiryDate: this.state.expiryDate
    // };
    const url = Configs.localUrl + "medicine/buy";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ medicines: this.state.medicines })
    }).then(res => {
      console.log(res);
      this.props.navigation.navigate("Medicines");
    });
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    //const data = this.filterData(this.state.query);
    return (
      <Container>
        <Header title="Buy Medicine" />
        {!this.state.submit && (
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Content contentContainerStyle={this.state.content}>
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
                  <Label>Supplier</Label>
                  <Input
                    onChangeText={text => this.setState({ supplier: text })}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>MRP</Label>
                  <Input onChangeText={text => this.setState({ mrp: text })} />
                </Item>
                <Item floatingLabel>
                  <Label>Buying Price</Label>
                  <Input
                    onChangeText={text => this.setState({ price: text })}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Quantity</Label>
                  <Input
                    onChangeText={text => this.setState({ quantity: text })}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Piece per Pack</Label>
                  <Input onChangeText={text => this.setState({ ppp: text })} />
                </Item>
                <Item stackedLabel>
                  <Label>Purchase Date</Label>
                  <TouchableOpacity
                    onPress={this.datePicker}
                    style={{
                      paddingLeft: 0,
                      paddingRight: 250,
                      paddingTop: 10,
                      paddingBottom: 10,
                      // backgroundColor: "#ccc",
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

                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    alert("Modal has been closed.");
                  }}
                >
                  <View
                    style={{ marginTop: 22, flex: 1, flexDirection: "column" }}
                  >
                    <H1 style={{ margin: 10 }}>Expiry Date</H1>
                    {this.datePickers()}
                    <View style={{ margin: 30, flexDirection: "row" }}>
                      <Button
                        primary
                        rounded
                        style={{ flex: 1, marginRight: 10 }}
                        onPress={this.addToList}
                      >
                        <Text>Submit</Text>
                      </Button>
                      <Button
                        danger
                        rounded
                        style={{ flex: 1 }}
                        onPress={() => this.setModalVisible(false)}
                      >
                        <Text>Cancel</Text>
                      </Button>
                    </View>
                  </View>
                </Modal>
              </Form>
              <Button
                primary
                block
                rounded
                style={{ margin: 30 }}
                onPress={() => this.setModalVisible(true)}
              >
                <Text>Submit</Text>
              </Button>
            </Content>
          </KeyboardAvoidingView>
        )}
        {this.state.submit && (
          <Content>
            <List>
              {this.state.medicines.map((medicine, index) => {
                return (
                  <ListItem key={index}>
                    <Left>
                      <Text>{medicine.medicineName}</Text>
                    </Left>

                    <Body style={{ flexDirection: "row" }}>
                      <Text style={{ flex: 1 }}>{medicine.quantity} Pack</Text>
                    </Body>
                    <Right style={{ flexDirection: "row" }}>
                      <Button transparent>
                        <FontAwesome name="pencil" size={25} />
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
            <View style={{ margin: 30, flexDirection: "row" }}>
              <Button
                primary
                rounded
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => this.setState({ submit: false })}
              >
                <Text>Add More</Text>
              </Button>
              <Button
                primary
                rounded
                style={{ flex: 1 }}
                onPress={this.buyMedicine}
              >
                <Text>Buy</Text>
              </Button>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

export default Buy;

const styles = StyleSheet.create({
  autocomplete: {
    zIndex: 1,
    maxHeight: 200,
    minWidth: 300,
    position: "absolute",
    // padding: 12,
    marginTop: 65,
    marginLeft: 15,
    //maxWidth: 200,
    backgroundColor: "#f9f9f9",
    overflow: "scroll"
  }
});
