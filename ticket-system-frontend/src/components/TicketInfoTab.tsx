interface TicketDashboardProps {
  handleAddTicket?: () => void,
  isIncomingTickets: boolean
}

const TicketInfoTab = ({ handleAddTicket, isIncomingTickets }: TicketDashboardProps): JSX.Element => {
  return (
    <div className={`container d-flex flex-column ps-4 ${isIncomingTickets && "justify-content-center"} vh-100`}>
      {/* Only show add ticket button for ticket manage page */}
      {!isIncomingTickets && (
        <div className="m-4 btn btn-outline-primary mx-2" onClick={handleAddTicket}>+ Add ticket</div>
      )}
      {/* Only show ticket to handle option for ticket inbox page */}
      
      
      <div className="mb-4 mt-5 fs-5 fw-bold">Statuses</div>
      <a className="text-dark" href="">Open</a>
      <a className="text-dark" href="">In progress</a>
      <a className="text-dark" href="">Resolved</a>
      <a className="text-dark" href="">On hold</a>
      <a className="text-dark" href="">Cancelled</a>
    </div>
  )
}

export default TicketInfoTab