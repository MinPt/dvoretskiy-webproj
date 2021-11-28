import { Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { currentUserSlice } from "../../store/currentUserSlice";
import { productCartSlice } from "../../store/productCartSlice";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <header className="header p-2">
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start">
            <Link to="/home" className="router-link">
              <Button variant="outline-light mx-2">Home</Button>
            </Link>
            <Link to="/products" className="router-link">
              <Button variant="outline-light mx-2">Products</Button>
            </Link>

            {currentUser ? (
              <Link to="/cart" className="router-link">
                <Button variant="outline-light mx-2">Cart</Button>
              </Link>
            ) : null}
            {currentUser?.isAdmin ? (
              <>
                <Link to="/admin/products" className="router-link">
                  <Button variant="outline-light mx-2">Products table</Button>
                </Link>
                <Link to="/admin/users" className="router-link">
                  <Button variant="outline-light mx-2">Users</Button>
                </Link>
              </>
            ) : null}
          </Col>
          <Col
            xs={4}
            className="d-flex justify-content-end align-content-center"
          >
            {currentUser ? (
              <>
                <p className="d-flex align-content-center link-light p-2 m-0">
                  Hello, {currentUser.name}
                </p>
                <Button
                  onClick={() => {
                    dispatch(currentUserSlice.actions.logout());
                    dispatch(productCartSlice.actions.clearCart());
                  }}
                  variant="outline-light mx-2"
                >
                  Logout
                </Button>
              </>
            ) : null}

            {!currentUser ? (
              <>
                <Link to="/login" className="router-link mx-1">
                  <Button variant="outline-light">Login</Button>
                </Link>
                <Link to="/register" className="router-link">
                  <Button variant="outline-light">Register</Button>
                </Link>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
