import React from "react";
import { List, ListItem, Text, Item, Label, Input } from "native-base";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";

class AutoSuggest extends React.Component {
  state = {};
  displayResult = () => {
    if (this.props.suggestionVisible) {
      return (
        // <ScrollView style={styles.autocomplete}>
        <List
          style={styles.autocomplete}
          dataArray={this.props.suggestions}
          renderRow={item => (
            <ListItem>
              <TouchableOpacity
                style={{ padding: 20 }}
                onPress={() => this.props.onPress(item.medicineName, false)}
              >
                <Text>{item.medicineName}</Text>
              </TouchableOpacity>
            </ListItem>
          )}
        />
        // </ScrollView>
      );
    }
  };
  render() {
    return (
      <View>
        <Item floatingLabel>
          <Label>{this.props.label}</Label>
          <Input
            onChangeText={text => this.props.completeMethod(text)}
            value={this.props.value}
          />
        </Item>
        {this.displayResult()}
      </View>
    );
  }
}

export default AutoSuggest;

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
