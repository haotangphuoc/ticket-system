export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface User {
  id: string,
  name: string,
  password: string,
  email: string,
  organizationId: string,
  ticketIds: string[],
  role: UserRole
}

export interface UserPOSTParams {
  name: string,
  email: string,
  role: UserRole
}
