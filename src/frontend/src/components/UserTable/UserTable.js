import { Component } from "react";
import { Table } from "react-bootstrap";
import UserTableItem from "./UserTableItem";

class UserTable extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { users } = this.props.users;
    return (
      <Table>
        <thead>
          <tr className="">
            <th className="col-1">#</th>
            <th className="col-3">Name</th>
            <th className="col-3">Email</th>
            <th className="col-2"></th>
            <th className="col-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserTableItem user={user} index={index} key={index} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default UserTable;
