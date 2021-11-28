import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { productCartSlice } from "../../store/productCartSlice";

const CartItem = ({ product, index }) => {
  const { name, count, _id } = product;
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{index}</td>
      <td>{name}</td>
      <td>{count}</td>
      <td className="text-center">
        <Button
          onClick={() => {
            dispatch(productCartSlice.actions.remove(_id));
          }}
          variant="danger"
        >
          Remove
        </Button>
      </td>
      <td className="text-center">
        <Button
          onClick={() => {
            dispatch(productCartSlice.actions.removeAll(_id));
          }}
          variant="danger"
        >
          Remove all
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
