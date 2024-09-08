export interface OrganizationGetFields {
  id: string,
  name: string,
  userIds: { id: string, name: string, email: string}
}

export interface OrganizationUserGetFields {
  id: string, 
  name: string,
  email: string,
  role: string
}