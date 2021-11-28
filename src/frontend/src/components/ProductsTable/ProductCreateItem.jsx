import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/productSlice";

const ProductCreateItem = ({ toggleCreation, index }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{index}</td>
      <td>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
        />
      </td>
      <td>
        <Form.Control
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="description"
        />
      </td>
      <td>
        <Form.Control
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          placeholder="price"
        />
      </td>
      <td>
        <Button
          onClick={() => {
            const product = {
              name,
              description,
              price,
            };
            dispatch(createProduct(product));
            toggleCreation();
          }}
        >
          Save product
        </Button>
      </td>
      <td>
        <Button onClick={() => toggleCreation()} variant="danger">
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default ProductCreateItem;
