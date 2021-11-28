import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const products = useSelector((state) => state.productCart);
  const totalSum = useSelector((state) => {
    return state.productCart.reduce((subtotal, item) => {
      return (subtotal += item.count * item.price);
    }, 0);
  });
  return (
    <Container className="text-center my-5 ">
      <Row className=" justify-content-center">
        <Col className="col-6">
          {products.length > 0 ? (
            <Table>
              <thead>
                <tr className="">
                  <th className="col-1">#</th>
                  <th className="col-1">Name</th>
                  <th className="col-1">Count</th>
                  <th className="col-3"></th>
                  <th className="col-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <CartItem key={index} index={index} product={item} />
                ))}
              </tbody>
            </Table>
          ) : (
            <h1>Cart is Empty</h1>
          )}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center my-5">
        <h2>Total sum is: {totalSum}$</h2>
        <Button className="w-25" disabled={totalSum < 1}>
          <h3>Buy</h3>
        </Button>
      </Row>
    </Container>
  );
};

export default Cart;
