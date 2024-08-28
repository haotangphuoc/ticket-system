const TicketInfoTab = (): JSX.Element => {
  return (
    <div className="container d-flex flex-column justify-content-center vh-100">
      <div className="my-4 fs-5 fw-bold">All ticket</div>
      <div>
        Ticket to handle
      </div>
      <div>
        My open ticket
      </div>
      <br />
      <br />
      <br />
      <div className="my-4 fs-5 fw-bold">Statuses</div>
      <div>
        Open
      </div>
      <div>
        In progress
      </div>
      <div>
        Resolved
      </div>
      <div>
        On hold
      </div>
      <div>
        Cancelled
      </div>
    </div>
  )
}

export default TicketInfoTab