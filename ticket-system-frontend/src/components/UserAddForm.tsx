interface UserAddFormProps {
  handleAddUser: () => void;
}

const UserAddForm = ({ handleAddUser }: UserAddFormProps): JSX.Element => {
  return (
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Add New User</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email: 
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-bold">
              Role:
            </label>
            <select className="form-select" id="role">
              <option value="CLIENT">Client</option>
              <option value="ADMINISTRATOR">Administrator</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
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
