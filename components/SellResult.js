import React from "react";
import Header from "./header";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Text,
  Body
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

class SellResult extends React.Component {
  state = {};
  navigate = () => {
    this.props.navigation.navigate("Medicines");
  };
  render() {
    let priceList = this.props.navigation.state.params;
    return (
      <Container>
        {/* <Header title="Sell Result" /> */}
        <Content>
          <List>
            <ListItem>
              <Left>
                <Body>
                  <Text>Medicines</Text>
                </Body>
              </Left>
              <Right>
                <Text>Price</Text>
              </Right>
            </ListItem>
            {priceList.map((p, i) => {
              return (
                <ListItem key={i}>
                  <Left>
                    <Body>
                      <Text>{p.medicineName}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text>
                      <FontAwesome name="rupee" size={15} />
                      {p.price}
                    </Text>
                  </Right>
                </ListItem>
              );
            })}
          </List>
          <Button
            rounded
            success
            block
            onPress={this.navigate}
            style={{ margin: 30 }}
          >
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SellResult;
