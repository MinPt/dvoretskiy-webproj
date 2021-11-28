import { Form, InputGroup } from "react-bootstrap";

const Input = ({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{name}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          value={value}
          name="name"
          type={type}
          placeholder={placeholder ? placeholder : `Enter ${name}`}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default Input;
