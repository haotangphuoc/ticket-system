import { createContext, useState } from "react";
import { ReactNode } from "react";

interface ContextType {
  ticketsRefetchFlag: boolean,
  setTicketsRefetchFlag: React.Dispatch<React.SetStateAction<boolean>>,
  alert: string,
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<ContextType>(
  {
    ticketsRefetchFlag: false, 
    setTicketsRefetchFlag: () => {},
    alert: '',
    setAlert: () => {},
  }
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [ticketsRefetchFlag, setTicketsRefetchFlag] = useState(false);
  const [alert, setAlert] = useState<string>('');

  return(
    <Context.Provider value={{ ticketsRefetchFlag, setTicketsRefetchFlag, alert, setAlert}}>
      {children}
    </Context.Provider>
  )
}