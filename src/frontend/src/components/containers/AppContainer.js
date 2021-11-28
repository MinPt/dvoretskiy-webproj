import { connect } from "react-redux";
import App from "../../App";

const mapStateToProps = (state) => {
  return {
    products: state.currentUser,
  };
};

export const AppContainer = connect(mapStateToProps)(App);
