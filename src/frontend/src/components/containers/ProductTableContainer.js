import { connect } from "react-redux";
import ProductTable from "../ProductsTable/ProductTable";
import { getProducts } from "../../store/productSlice";

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(getProducts()),
  };
};

export const ProductTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTable);
