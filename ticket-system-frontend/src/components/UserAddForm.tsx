import { useState } from "react";
import userService from "../services/userService";
import { UserRole } from "../../../src/interfaces/userInterface";

interface UserAddFormProps {
  handleAddUser: () => void;
}

interface FormDataTypes {
  name: string,
  email: string,
  role: UserRole
}

const UserAddForm = ({ handleAddUser }: UserAddFormProps): JSX.Element => {
  const [formData, setFormData] = useState<FormDataTypes>({
    name: '',
    email: '',
    role: 'CLIENT'
  })

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
      const res = await userService.createUser(formData);
      console.log(res);
    }
    catch(error) {
      console.log(error);
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
