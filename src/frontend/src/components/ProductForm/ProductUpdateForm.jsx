import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { withRouter } from "react-router-dom";

const schema = yup.object({
  name: yup.string("Enter name").min(4).max(25).required("Name required"),
  price: yup.number().min(1).required("Price is required"),
  description: yup.string("Enter Description").max(256),
});

const ProductUpdateForm = (props) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const updatingProduct = useSelector((state) =>
    state.products.find((product) => product._id === props.match.params.id)
  );
  return (
    <Formik
      initialValues={{ ...updatingProduct }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        const product = new FormData();
        product.append("name", values.name);
        product.append("price", values.price);
        product.append("description", values.description);
        product.append("thumbnail", updatingProduct.thumbnail);
        if (image) product.append("image", image, image.name);
        const updatedProduct = { product, id: updatingProduct._id };
        dispatch(updateProduct(updatedProduct));
        setSubmitting(false);
        props.history.push("/admin/products");
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Container className="my-5 ">
          <Row className="justify-content-center">
            <Col className="col-6 border p-3">
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    name="price"
                    type="number"
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                    type="text"
                    placeholder="Enter description"
                    isInvalid={!!errors.description}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="file">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    onBlur={handleBlur}
                    name="file"
                    type="file"
                  />
                </Form.Group>
                <Button disabled={isSubmitting} onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

export default withRouter(ProductUpdateForm);
