import { connect } from "react-redux";
import { getProducts } from "../../store/productSlice";
import ProductList from "../ProductList/ProductList";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(getProducts()),
  };
};

export const ProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
