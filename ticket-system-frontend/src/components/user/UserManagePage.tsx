import UserAddForm from "./UserAddForm";
import UserDashboard from "./UserDashboard";
import { useState } from "react";


const UserManagePage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = () => {
    setShowForm(!showForm);
  };

  return(
    <div className={`p-4 position-relative`}>
      {showForm && <UserAddForm handleAddUser={handleAddUser}/>}

      <div className={showForm ? "client-dashboard-overlay" : ""}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="fs-3 m-4">
            Users 
          </div>
          <div className="btn btn-outline-primary" onClick={handleAddUser}>
            + Add new user
          </div>
        </div>
        <UserDashboard/>
      </div>
    </div>
  );
}

export default UserManagePage;