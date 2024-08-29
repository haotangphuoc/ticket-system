interface TicketDashboardProps {
  handleAddTicket: () => void
}

const TicketInfoTab = ({ handleAddTicket }: TicketDashboardProps): JSX.Element => {
  return (
    <div className="container d-flex flex-column vh-100">
      <div className="m-4 btn btn-outline-primary mx-2" onClick={handleAddTicket}>+ Add ticket</div>
      <div className="my-4 fs-5 fw-bold">All ticket</div>
      <a className="text-dark" href="">Ticket to handle </a>
      <a className="text-dark" href="">My open ticket</a>
      
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