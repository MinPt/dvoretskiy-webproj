import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Container, InputGroup, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../store/currentUserSlice";

const schema = yup.object({
  email: yup
    .string("Enter email")
    .email("Email must be valid")
    .max(255)
    .required("Email is required"),
  password: yup
    .string("Enter password")
    .min(5)
    .max(255)
    .required("Password is required"),
});

const Login = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(authUser(values));
      props.history.push("/products");
    },
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-4">
          <Form
            noValidate
            className="border px-5 py-4 my-5"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  value={formik.values.email}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  value={formik.values.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
