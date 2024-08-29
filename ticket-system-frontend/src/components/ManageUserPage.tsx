import AddUserForm from "./AddUserForm";
import ClientDashboard from "./ClientDashboard";
import { useState } from "react";


const ManageUserPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = () => {
    setShowForm(!showForm);
  };

  return(
    <div className={`p-4 position-relative`}>
      <div className={showForm ? "client-dashboard-overlay" : ""}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="fs-3 m-4">
            Users 
          </div>
          <div className="btn btn-outline-primary" onClick={handleAddUser}>
            + Add new user
          </div>
        </div>
        <ClientDashboard/>
      </div>
      {showForm && <AddUserForm handleAddUser={handleAddUser}/>}
    </div>
  );
}

export default ManageUserPage;