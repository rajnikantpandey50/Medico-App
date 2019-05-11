import React from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text
} from "native-base";
import Expo from "expo";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";

class Signup extends React.Component {
  state = { name: "", email: "", password: "", loading: true };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ loading: false });
  }

  signUpUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //AsyncStorage.setItem("userToken", user);
        this.props.navigation.navigate("Main");
      })
      .catch(error => console.log(error));
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={text => this.setState({ name: text })} />
            </Item>
            <Item floatingLabel>
              <Label>Email Id</Label>
              <Input onChangeText={text => this.setState({ email: text })} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </Form>
          <Button success rounded block onPress={this.signUpUser}>
            <Text>Sign Up</Text>
          </Button>
          <Button
            transparent
            block
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Log In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Signup;
