import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCreateItem from "./ProductCreateItem";
import ProductTableItem from "./ProductTableItem";

class ProductTable extends Component {
  state = {
    isCreatingProduct: false,
  };

  componentDidMount() {
    this.props.onLoad();
  }

  handleProductCreation = () => {
    this.setState({ isCreatingProduct: !this.state.isCreatingProduct });
  };

  render() {
    const { products } = this.props;
    const { isCreatingProduct } = this.state;
    return (
      <Table>
        <thead>
          <tr className="">
            <th className="col-1">#</th>
            <th className="col-1">Name</th>
            <th className="col-4">Description</th>
            <th className="col-1">Price</th>
            <th className="col-2"></th>
            <th className="col-2 text-center">
              {this.props.currentUser ? (
                <Link to="/products/create" className="router-link mx-1">
                  <Button variant="success">Create product</Button>
                </Link>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductTableItem product={product} index={index} key={index} />
          ))}
          {isCreatingProduct ? (
            <ProductCreateItem
              index={products.length}
              toggleCreation={this.handleProductCreation}
            />
          ) : null}
        </tbody>
      </Table>
    );
  }
}

export default ProductTable;
