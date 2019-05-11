import React from "react";
import {
  Container,
  Content,
  View,
  Form,
  Item,
  Label,
  Input
} from "native-base";
class Edit extends React.Component {
  state = {
    medicineName: "",
    manufacturerName: "",
    medicineType: "",
    supplier: "",
    mrp: 0
  };
  componentDidMount() {
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

    this.setState({
      medicineName: medicineName,
      manufacturerName: manufacturerName,
      medicineType: medicineType,
      supplier: supplier,
      mrp: mrp
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>MedicineName</Label>
              <Input
                value={this.state.medicineName}
                onChangeText={text => this.setState({ medicineName: text })}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Edit;
