import { useEffect, useState } from 'react';
import TicketEditForm from './TicketEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import ticketService from '../../services/ticketService';
import { AxiosError } from 'axios';
import { TicketGetByIdFields } from '../../interfaces/ticketInterface';
import { useRefetchFlag, useSetAlert } from '../../utils/contextCustomHooks';

const TicketDetailsPage = (): JSX.Element => {
  const today = new Date();
  const { ticketDirection, id } = useParams();
  const [ticket, setTicket] = useState<TicketGetByIdFields | undefined>();
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const setAlert = useSetAlert();
  const refetchFlag = useRefetchFlag();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditTicket = () => {
    setShowForm(!showForm);
  };

  const convertDayFormat = (date:string): string => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  }
  const isOverdue = (endDate: string): boolean => {
    const endDateObj = new Date(endDate);
    return endDateObj > today;
  }
  const endDateContainerTextColor = (endDate: string): string => {
    return isOverdue(endDate) ? 'text-success': 'text-danger'
  }

  useEffect(() => {

    // Fetch ticket from id params
    const fetchTicket = async () => {
      try {
        if (!id) {
          throw new Error('Internal server error!')
        }
        const res = await ticketService.getTicketById(id);
        console.log(res);
        setTicket(res);
      } catch(error) {
        if(error instanceof AxiosError) {
          setAlert(error.response?.data.message || "An unknown error occured!");
        }
        else {
          setAlert("An unknown error occured!");
        }
      }
    }

    fetchTicket();
  }, [setAlert, id, refetchFlag])

  
  return (
    <div>
      {ticket && (
        <div>
          {showForm && <TicketEditForm handleEditTicket={handleEditTicket} ticketId={id}/>}
          
          <div className={`container m-4 ${showForm ? "client-dashboard-overlay" : ""}`}>
            <div className="my-4">
              {ticketDirection === "INCOMING" && 
              (
                <button className="btn btn-primary me-2" onClick={handleEditTicket}>
                  Edit Ticket
                </button>
              )}
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
              <p className="text-secondary mb-1">
                Requested by: <b>{ticket.sender.email}</b>
              </p>
              <p className="text-secondary mb-1">
                Requested on: <b>{convertDayFormat(ticket.startDate)}</b>
              </p>
              <p className='text-seondary'>
                Deadline: <b className={endDateContainerTextColor(ticket.endDate)}>{convertDayFormat(ticket.endDate)}</b>
              </p>
            </div>
            <div className="mt-4" style={{ minHeight: "150px" }}>
              <p className="text-secondary">
                <b>Description: </b>{ticket.description}
              </p>
            </div>
            <div className="border-top">
              <p className="pt-3">Status:</p>
              {ticket.activities.map((activity) => (
                <div className="border-top py-4 ps-5" key={activity.id}>
                  <p>
                    <b>Ticket status is changed to: {activity.status}</b>
                  </p>
                  <p className="text-secondary mb-1">
                    <b>Comment:</b> {activity.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}

export default TicketDetailsPage;


