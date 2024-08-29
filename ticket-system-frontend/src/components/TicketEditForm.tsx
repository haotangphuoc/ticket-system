interface TicketEditFormProps {
  handleEditTicket: () => void;
}

const TicketEditForm = ({handleEditTicket} : TicketEditFormProps): JSX.Element => {
  return(
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Edit Ticket</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-bold">
              Ticket Status:
            </label>
            <select className="form-select" id="status">
              <option value="OPEN">Open</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="ON HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label fw-bold">
              Comments:
            </label>
            <textarea className="form-control" id="comments" rows={4}></textarea>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Save Changes
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