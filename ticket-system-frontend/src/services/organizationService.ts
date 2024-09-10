import axios from "axios";
import { OrganizationUserGetFields } from "../interfaces/organizationInterface";

const BASE_URL = '/api/organizations'

// Fetch incoming tickets for a user (administrators)
const getOrganizationUsers = async (organizationId: string): Promise<OrganizationUserGetFields[]> => {
  const response = await axios.get(`${BASE_URL}/${organizationId}/users`);
  return response.data;
};


export default { getOrganizationUsers };