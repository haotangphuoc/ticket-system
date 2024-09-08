import { useContext } from "react";
import { Context } from "./Context";

export const useTicketsRefetchFlag = () => {
  const { ticketsRefetchFlag } = useContext(Context);
  return ticketsRefetchFlag;
}

export const useSetTicketsRefetchFlag = ()=> {
  const { setTicketsRefetchFlag } = useContext(Context);
  
  return setTicketsRefetchFlag;
}

export const useAlert = () => {
  const { alert } = useContext(Context);
  return alert;
}

export const useSetAlert = () => {
  const { setAlert } = useContext(Context);
  return setAlert;
}

