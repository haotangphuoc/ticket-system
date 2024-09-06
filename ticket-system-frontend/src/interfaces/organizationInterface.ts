export interface OrganizationGetParams {
  id: string,
  name: string,
  userIds: { id: string, name: string, email: string}
}

export interface OrganizationUserGetParams {
  id: string, 
  name: string,
  email: string,
  role: string
}