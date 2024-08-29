import { Ticket } from '../../../interfaces/ticketInterface'
import { useState } from 'react';
import TicketEditForm from './TicketEditForm';

const TicketDetailsPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleEditTicket = () => {
    setShowForm(!showForm);
  };

  const ticket: Ticket = {
    id: "12345",
    title: "Issue with Login Functionality",
    description: "User is unable to log into the system using their credentials.",
    sender: "John Doe",
    receiver: "Support Team",
    status: "IN PROGRESS",
    startDate: "2024-08-28T10:00:00Z",  // ISO string format for dates
    endDate: "2024-08-29T16:00:00Z",
    activities: [
      {
        id: "act-001",
        status: "OPEN",
        comments: "Ticket created and assigned to the support team."
      },
      {
        id: "act-002",
        status: "IN PROGRESS",
        comments: "Working on the issue. Checking login API."
      }
    ]
  };
  
  return(
    <div>
      {showForm && <TicketEditForm handleEditTicket={handleEditTicket}/>}

      <div className={`container m-4 ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="my-4">
          <button  className="btn btn-primary" onClick={handleEditTicket}>Edit Ticket</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
          >
            Back
          </button>
        </div>
        <div className="border-bottom">
          <div className="d-flex flex-row fs-1">
            <i className="fa-solid fa-ticket text-primary"></i>
            <div className="ms-4 fw-bold">
              {ticket.title}
            </div>
          </div>
          <br />
          <p className="text-secondary mb-1">Requested by: <b>{ticket.sender}</b></p>
          <p className="text-secondary mb-1">On day: <b>{ticket.startDate}</b></p>
          <p className="text-secondary">Deadline: <b>{ticket.endDate}</b></p>
        </div>
        <div className="mt-4" style={{"minHeight": "150px"}}>
          <p className="text-secondary"><b>Description: </b>{ticket.description}</p>
        </div>
        <div className='border-top'>
          <p className='pt-3'>Status:</p>
          {(ticket.activities).map(activity  => 
            <div className='border-top py-4 ps-5' key={activity.id}>
              <p><b>{ticket.receiver} changed status to  {activity.status}</b></p>
              <p className="text-secondary mb-1"><b>Comment:</b> {activity.comments}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;