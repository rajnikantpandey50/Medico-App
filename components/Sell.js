import React from "react";
import Header from "../components/header";
import {
  Container,
  View,
  Item,
  Input,
  ListItem,
  Text,
  Label,
  Form,
  Content,
  List,
  Radio,
  Left,
  Right,
  DatePicker,
  Button,
  Icon,
  Body,
  H1
} from "native-base";
import AutoSuggest from "./AutoSuggest";
import Configs from "../constants/Configs";
import { ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//import header from "./header";
class Sell extends React.Component {
  state = {
    loading: true,
    medicines: [],
    piece: false,
    quantity: 0,
    medicineName: "",
    cardVisible: false,
    data: [],
    expiryDate: [],
    modalVisible: false,
    submit: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ loading: false });
  }

  sellMedicines = () => {
    let url = Configs.ServiceUrl + "medicine/sell";
    console.log(url);
    console.log(JSON.stringify(this.state.medicines));
    fetch(url, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ medicines: this.state.medicines })
    })
      .then(response => response.json())
      .then(res => {
        //console.log(res.price);
        this.props.navigation.navigate("Result", res.price);
      });
  };

  filterData = query => {
    this.setState({ medicineName: query });
    if (query.length >= 1) {
      let url = Configs.ServiceUrl + "medicines/" + query;
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

  onSelect = (medicineName, visible) => {
    this.setState({ medicineName: medicineName, cardVisible: visible });
  };

  displayResult = () => {
    if (this.state.cardVisible) {
      return (
        // <ScrollView style={styles.autocomplete}>
        <List
          //   onTouchStart={ev => {
          //     this.setState({ content: { flex: 1 } });
          //   }}
          //   onMomentumScrollEnd={e => {
          //     this.setState({ content: {} });
          //   }}
          //   onScrollEndDrag={e => {
          //     this.setState({ content: {} });
          //   }}
          style={styles.autocomplete}
          dataArray={this.state.data}
          renderRow={item => (
            <ListItem>
              <TouchableOpacity
                style={{
                  paddingLeft: 20,
                  paddingRight: 150,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
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
    if (this.state.piece) {
      indents.push(
        <ListItem key={"p"}>
          <Left>
            <Text>1.</Text>

            <Body>
              <DatePicker onDateChange={this.setExpDate} />
            </Body>
          </Left>
        </ListItem>
      );
    } else {
      for (let i = 0; i < this.state.quantity; i++) {
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
    }
    return indents;
  };

  addToList = () => {
    let medicine = {
      medicineName: this.state.medicineName,
      quantity: this.state.quantity,
      expDate: this.state.expiryDate,
      piece: this.state.piece
    };

    let medicines = this.state.medicines;
    medicines.push(medicine);
    this.setState({
      medicines: medicines,
      // piece: false,
      quantity: 0,
      medicineName: "",
      cardVisible: false,
      data: [],
      expiryDate: [],
      modalVisible: false,
      submit: true
    });
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        {/* <Header title="Sell Medicines" /> */}
        {!this.state.submit && (
          <Content style={{ flex: 1 }}>
            <Form>
              <Item floatingLabel>
                <Label>Medicine Name</Label>
                <Input
                  onChangeText={text => this.filterData(text)}
                  value={this.state.medicineName}
                />
              </Item>
              {this.displayResult()}
              <Item
                underline={false}
                style={{
                  borderColor: "#fff",
                  paddingTop: 10,
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Radio
                    style={{ flex: 1 }}
                    selected={!this.state.piece}
                    onPress={() => this.setState({ piece: false })}
                  />
                  <Text style={{ flex: 5 }}>Pack</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Radio
                    style={{ flex: 1 }}
                    selected={this.state.piece}
                    onPress={() => this.setState({ piece: true })}
                  />
                  <Text style={{ flex: 5 }}>Piece</Text>
                </View>
              </Item>
              <Item floatingLabel>
                <Label>Quantity</Label>
                <Input
                  onChangeText={text => this.setState({ quantity: text })}
                />
              </Item>
            </Form>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
              <View style={{ marginTop: 22, flex: 1, flexDirection: "column" }}>
                <H1 style={{ margin: 10 }}>Expiry Date</H1>
                <List>{this.datePickers()}</List>
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

            <Button
              primary
              block
              rounded
              style={{ margin: 30, marginTop: 100 }}
              onPress={() => this.setModalVisible(true)}
            >
              <Text>Submit</Text>
            </Button>
          </Content>
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
                      <Text style={{ flex: 1 }}>{medicine.quantity}</Text>
                      {medicine.piece && <Text style={{ flex: 2 }}>Piece</Text>}
                      {!medicine.piece && <Text style={{ flex: 2 }}>Pack</Text>}
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
                success
                rounded
                style={{ flex: 1 }}
                onPress={this.sellMedicines}
              >
                <Text>Sell</Text>
              </Button>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

export default Sell;

const styles = StyleSheet.create({
  autocomplete: {
    zIndex: 1000,
    maxHeight: 180,
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
