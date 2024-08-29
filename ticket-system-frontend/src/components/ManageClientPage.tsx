import { useEffect, useState } from "react";
import userService from '../services/userService'
import { User } from "../../../interfaces/userInterface";

const ManageClientPage = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getAllUsers();
      if (result instanceof Error) {
        console.log("Error");
      }
      else {
        setUsers(result)
      }
    }

    fetchUsers()
  }, [])

  return(
    <div className="p-4">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="fs-3 m-4">
          Users 
        </div>
        <div className="btn btn-outline-primary">
          + Add new user
        </div>
      </div>

      <div >
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => 
              <tr>
                <td >{user.name}</td>
                <td className="text-secondary">{user.email}</td>
                <td className="text-lowercase text-secondary">{user.role}</td>
                <td className="text-primary"><i className="fas fa-edit"></i></td>
              </tr>
            )
          }

        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ManageClientPage;