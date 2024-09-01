import React, { useState } from 'react';
import ticketService from '../services/ticketService'; 

interface TicketAddFormProps {
  handleAddTicket: () => void;
}

const TicketAddForm = ({ handleAddTicket }: TicketAddFormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
    deadline: '' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const ticketData = {
      title: formData.title,
      description: formData.description,
      receiver: formData.email,
      endDate: formData.deadline
    };
    
    try {
      const createdTicket = await ticketService.createTicket(ticketData);
      console.log('Ticket created successfully:', createdTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
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
            <label htmlFor="email" className="form-label fw-bold">Assign To: </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter administrator email"
              value={formData.email}
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
            <label htmlFor="deadline" className="form-label fw-bold">Deadline: </label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              value={formData.deadline}
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