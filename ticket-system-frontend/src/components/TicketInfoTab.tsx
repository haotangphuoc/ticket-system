const TicketInfoTab = (): JSX.Element => {
  return (
    <div className="container d-flex flex-column justify-content-center vh-100">
      <div className="mb-4 fs-5 fw-bold">All ticket</div>
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