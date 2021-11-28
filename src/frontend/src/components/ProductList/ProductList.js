import { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ProductListItem from "./ProductListItem";

class ProductList extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { products } = this.props;

    return (
      <Container className="my-5">
        <Row className="justify-content-around">
          {products.map((item, index) => (
            <ProductListItem key={index} product={item} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default ProductList;
