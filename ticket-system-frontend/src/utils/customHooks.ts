import { useContext } from "react";
import { UserRole } from "../../../src/interfaces/userInterface";
import { Context } from "./Context";
import { Ticket } from "../../../src/interfaces/ticketInterface";

export const useUserRole = (): UserRole => {
  const { userRole } = useContext(Context);
  // if (!userRole) throw new Error("userRole is not defined");
  return userRole as UserRole;
}

export const useTickets = (): Ticket[] => {
  const { tickets } = useContext(Context);
  // if (!tickets) throw new Error("tickets is not defined");
  return tickets;
}

