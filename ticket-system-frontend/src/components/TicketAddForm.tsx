interface TicketAddFormProps {
  handleAddTicket: () => void;
}

const TicketAddForm = ({ handleAddTicket }: TicketAddFormProps): JSX.Element => {
  return (
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Add New Ticket</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title:
            </label>
            <input type="text" className="form-control" id="title" placeholder="Enter ticket title" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Assign To: 
            </label>
            <input type="email" className="form-control" id="email" placeholder="Enter administrator email" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description:
            </label>
            <textarea className="form-control" id="description" rows={4} placeholder="Enter ticket description"></textarea>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Create Ticket
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleAddTicket}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketAddForm;