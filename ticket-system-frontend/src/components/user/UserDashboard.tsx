import { useEffect, useState } from "react";
import organizationService from "../../services/organizationService";
import { useRefetchFlag, useSetAlert } from "../../utils/contextCustomHooks";
import { AxiosError } from "axios";
import { OrganizationUserGetFields } from "../../interfaces/organizationInterface";

const UserDashboard = (): JSX.Element => {
  const [users, setUsers] = useState<OrganizationUserGetFields[]>([]);
  const currentUserOrganizationId = window.localStorage.getItem('currentUserOrganizationId');
  const setAlert = useSetAlert();
  const refetchFlag = useRefetchFlag()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if(!currentUserOrganizationId) {
          throw new Error("Internal server error!")
        }
        const res = await organizationService.getOrganizationUsers(currentUserOrganizationId);
        setUsers(res);
      } catch(error) {
        if(error instanceof AxiosError) {
          setAlert(error.response?.data.message || "An unknown error occured!");
        }
        else {
          setAlert("An unknown error occured!");
        }
      }
    }

    fetchUsers();
  }, [currentUserOrganizationId, setAlert, refetchFlag])

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
              <tr key={user.id}>
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