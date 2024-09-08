interface TicketDashboardProps {
  handleAddTicket?: () => void,
  ticketDirection: "INCOMING" | "OUTGOING"
}

const TicketInfoTab = ({ handleAddTicket, ticketDirection }: TicketDashboardProps): JSX.Element => {
  return (
    <div className={`container d-flex flex-column ps-4 vh-100`}>
      {/* Only show add ticket button for ticket manage page */}
      {ticketDirection === "OUTGOING" && (
        <div className="m-4 btn btn-primary mx-2" onClick={handleAddTicket}>+ Add ticket</div>
      )}
      
      <div className="mb-4 mt-5 fs-5 fw-bold d-flex justify-content-center">Statuses</div>
      <a className="text-dark" href="">Open</a>
      <a className="text-dark" href="">In progress</a>
      <a className="text-dark" href="">Resolved</a>
      <a className="text-dark" href="">On hold</a>
      <a className="text-dark" href="">Cancelled</a>
    </div>
  )
}

export default TicketInfoTab