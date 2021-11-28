import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeProduct } from "../../store/productSlice";

const ProductTableItem = ({ product, index }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{index}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}$</td>
      <td className="text-center">
        <Link to={`/products/update/${product._id}`} className="router-link">
          <Button variant="primary mx-2">Edit product</Button>
        </Link>
      </td>
      <td className="text-center">
        <Button
          onClick={() => {
            dispatch(removeProduct(product._id));
          }}
          variant="danger"
        >
          Delete product
        </Button>
      </td>
    </tr>
  );
};

export default ProductTableItem;
