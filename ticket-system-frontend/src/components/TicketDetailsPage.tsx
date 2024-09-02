import { Ticket } from '../../../interfaces/ticketInterface'
import { useState } from 'react';
import TicketEditForm from './TicketEditForm';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../utils/customHooks';

interface TicketDetailsPageProps {
  ticket: Ticket | null | undefined
}

interface TicketDetailsProps {
  ticket: Ticket 
}

const TicketDetailsPage = ({ ticket }: TicketDetailsPageProps): JSX.Element => {
  return(
    <div>
      {ticket 
        ? <TicketDetails ticket={ticket}/> 
        : <h1>UNABLE TO FIND TICKET</h1>}
    </div>
  );
}

const TicketDetails = ({ ticket }: TicketDetailsProps): JSX.Element => {
  const userRole = useUserRole();

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditTicket = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      {showForm && <TicketEditForm handleEditTicket={handleEditTicket}/>}

      <div className={`container m-4 ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="my-4">
          {(userRole === "ADMINISTRATOR") && <button className="btn btn-primary me-2" onClick={handleEditTicket}>Edit Ticket</button>}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGoBack}
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
          <p className="text-secondary mb-1">Requested by: <b>{ticket.senderId}</b></p>
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
              <p><b>{ticket.receiverId} changed status to  {activity.status}</b></p>
              <p className="text-secondary mb-1"><b>Comment:</b> {activity.comments}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketDetailsPage;