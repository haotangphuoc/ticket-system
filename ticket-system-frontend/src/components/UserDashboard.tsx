import { useEffect, useState } from "react";
import userService from '../services/userService'
import { User } from "../../../interfaces/userInterface";

const UserDashboard = (): JSX.Element => {
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
  )
}

export default UserDashboard