import { Redirect, Route } from "react-router-dom";
import isLogged from "../utilities/isLogged";

const SecuredRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isLogged() ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default SecuredRoute;
