import React, { useState } from 'react';
import ticketService from '../../services/ticketService'; 
import { useSetAlert } from '../../utils/contextCustomHooks';
import { AxiosError } from 'axios';

interface TicketAddFormProps {
  handleAddTicket: () => void;
}

const TicketAddForm = ({ handleAddTicket }: TicketAddFormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    title: '',
    receiverEmail: '',
    description: '',
    endDate: '' 
  });
  const setAlert = useSetAlert();
  const currentUserId = window.localStorage.getItem("currentUserId");
  const token = window.localStorage.getItem("ticket4MeToken");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if(!currentUserId || !token) {
        setAlert("Internal server error!");
        throw new Error('Internal server error!');
      }

      const ticketData = {
        title: formData.title,
        description: formData.description,
        senderId: currentUserId,
        receiverEmail: formData.receiverEmail,
        startDate: new Date().toISOString(),
        endDate: formData.endDate
      };

      console.log(ticketData);

      const createdTicket = await ticketService.createTicket(ticketData);
      console.log('Ticket created successfully:', createdTicket);
    } catch (err) {
      if(err instanceof AxiosError) {
        setAlert(err.response?.data.message || "An unknown error occured!");
      }
      else {
        setAlert("An unknown error occured!");
      }
      
    }

    // Change state
    handleAddTicket();
  };

  return (
    <div className="add-form-container">
      <div className="add-form p-4">
        <h3 className="text-center">Add New Ticket</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter ticket title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="receiverEmail" className="form-label fw-bold">Assign To: </label>
            <input
              type="email"
              className="form-control"
              id="receiverEmail"
              placeholder="Enter administrator email:"
              value={formData.receiverEmail}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">Description: </label>
            <textarea
              className="form-control"
              id="description"
              rows={4}
              placeholder="Enter ticket description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label fw-bold">Deadline: </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Create Ticket</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleAddTicket}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketAddForm;