import { useState } from "react";
import { TicketActivityPostParams } from "../../interfaces/ticketInterface";
import { useRefetchFlag, useSetAlert, useSetRefetchFlag } from "../../utils/contextCustomHooks";
import ticketService from "../../services/ticketService";
import { AxiosError } from "axios";

interface TicketEditFormProps {
  handleEditTicket: () => void,
  ticketId: string | undefined
}

const TicketEditForm = ({ handleEditTicket, ticketId} : TicketEditFormProps): JSX.Element => {
  const [formData, setFormData] = useState<TicketActivityPostParams>({
    status: 'OPEN',
    comment: ''
  })
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
      if(!ticketId) {
        throw new Error("Internal server error");
      }
      const res = await ticketService.createTicketActivity(ticketId, formData);
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
    handleEditTicket();
  }


  return(
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Edit Ticket</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-bold">
              Ticket Status:
            </label>
            <select className="form-select" id="status" value={formData.status} onChange={handleChange}>
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
            <textarea className="form-control" id="comment" rows={4} value={formData.comment} onChange={handleChange}></textarea>
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