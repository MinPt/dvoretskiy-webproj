import { connect } from "react-redux";
import UserTable from "../UserTable/UserTable";
import { getUsers } from "../../store/userSlice";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(getUsers()),
  };
};

export const UserTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);
