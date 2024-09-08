import { useState } from "react";
import userService from "../../services/userService";
import { UserPostParams } from "../../interfaces/userInterface";
import { useRefetchFlag, useSetAlert, useSetRefetchFlag } from "../../utils/contextCustomHooks";
import { AxiosError } from "axios";

interface UserAddFormProps {
  handleAddUser: () => void;
}


const UserAddForm = ({ handleAddUser }: UserAddFormProps): JSX.Element => {
  const [formData, setFormData] = useState<Omit<UserPostParams, 'organizationId'>>({
    name: '',
    email: '',
    role: 'CLIENT'
  })
  const currentUserOrganizationId = window.localStorage.getItem('currentUserOrganizationId');
  const setAlert = useSetAlert();
  const refetchFlag = useRefetchFlag();
  const setRefetchFlag = useSetRefetchFlag();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>): void => {
    const {id, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if(!currentUserOrganizationId) {
        throw new Error("Internal server error");
      }
      const postData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        organizationId: currentUserOrganizationId
      }
      const res = await userService.createUser(postData);
      console.log(res);
      setRefetchFlag(!refetchFlag);
    }
    catch(error) {
      if(error instanceof AxiosError) {
        setAlert(error.response?.data.message || "An unknown error occured!");
      }
      else {
        setAlert("An unknown error occured!");
      }
    }
    handleAddUser();
  }

  return (
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold">Username: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email: </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-bold">Role:</label>
            <select className="form-select" id="role" onChange={handleChange} value={formData.role}>
              <option value="CLIENT">Client</option>
              <option value="ADMINISTRATOR">Administrator</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleAddUser}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddForm;
