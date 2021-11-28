import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { removeUser } from "../../store/userSlice";

const UserTableItem = ({ user, index }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{index}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="text-center">
        <Button>Edit user</Button>
      </td>
      <td className="text-center">
        <Button
          onClick={() => {
            dispatch(removeUser(user._id));
          }}
          variant="danger"
        >
          Delete user
        </Button>
      </td>
    </tr>
  );
};

export default UserTableItem;
