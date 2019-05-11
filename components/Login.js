import React from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  View,
  Toast,
  Root,
  H1
} from "native-base";
import { StyleSheet } from "react-native";
//import { AsyncStorage } from "react-native";
import Expo from "expo";
import * as firebase from "firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: true,
    errorMessage: "",
    error: false
  };
  loginUser = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        // AsyncStorage.setItem("userToken", user);
        console.log(user);
        this.props.navigation.navigate("Main");
      })
      .catch(err =>
        Toast.show({
          text: err.message,
          buttonText: "OK",
          type: "danger",
          duration: 3000,
          position: "center"
        })
      );
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ loading: false });
  }
  navigateToSignup = () => {
    this.props.navigation.navigate("Signup");
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <Container
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            paddingTop: 100,
            flexDirection: "row",
            backgroundColor: "#DD80FF",
            opacity: 0.8
          }}
        >
          <Content
            contentContainerStyle={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <H1>Login</H1>
            <Form>
              <Item rounded style={styles.textbox}>
                <Input
                  placeholder="Email Id"
                  textContentType="emailAddress"
                  placeholderTextColor="#000"
                  onChangeText={text => this.setState({ email: text })}
                />
              </Item>
              <Item rounded style={styles.textbox}>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#000"
                  secureTextEntry
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>
            </Form>
            <Button
              success
              rounded
              block
              style={{ margin: 30 }}
              onPress={this.loginUser}
            >
              <Text>Log In</Text>
            </Button>
            <View style={{ margin: 10, flexDirection: "row" }}>
              <Button transparent>
                <Text>Forgot Password</Text>
              </Button>
              <Button transparent onPress={this.navigateToSignup}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Root>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  textbox: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#fff",
    alignContent: "center"
  }
});
