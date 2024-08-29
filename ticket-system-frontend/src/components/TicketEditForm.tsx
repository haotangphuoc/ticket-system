interface TicketEditFormProps {
  handleEditTicket: () => void;
}

const TicketEditForm = ({handleEditTicket} : TicketEditFormProps): JSX.Element => {
  return(
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Add New User</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Save change
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleEditTicket}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketEditForm;