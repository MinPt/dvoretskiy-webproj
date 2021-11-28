import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productCartSlice } from "../../store/productCartSlice";
import { SERVER_IMAGES } from "../../utilities/constants";

const ProductListItem = ({ product }) => {
  const { price, description, name, thumbnail } = product;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <Card className="col-3 m-2">
      <Card.Img
        variant="top"
        alt="Product thumbnail"
        src={SERVER_IMAGES + thumbnail}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between ">
          {currentUser ? (
            <Button
              variant="primary"
              onClick={() => {
                dispatch(productCartSlice.actions.add(product));
              }}
            >
              Add to cart
            </Button>
          ) : null}

          <p className="m-0 p-2">Price: {price}$</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductListItem;
