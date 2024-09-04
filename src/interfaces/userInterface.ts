export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface User {
  id: string,
  name: string,
  password: string,
  email: string,
  organizationId: string,
  role: UserRole,
  outgoingTicketIds: string[], // Only for administrator
  incomingTicketIds?: string[]
}

// Parameters pass to back-end when an Administrator create a new User
export interface UserPOSTParams {
  name: string,
  email: string,
  role: UserRole
}

// Parameters pass to back-end when a new Administrator is created with a new organization
export interface UserRegisterParams {
  name: string,
  password: string,
  email: string
}
