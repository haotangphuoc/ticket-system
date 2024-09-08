import { createContext, useState } from "react";
import { ReactNode } from "react";
import { UserGetByIdFields } from "../interfaces/userInterface";

interface ContextType {
  user: UserGetByIdFields | null,
  setUser: React.Dispatch<React.SetStateAction<UserGetByIdFields | null>>,
  alert: string,
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<ContextType>(
  {
    user: null, 
    setUser: () => {},
    alert: '',
    setAlert: () => {},
  }
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserGetByIdFields | null>(null);
  const [alert, setAlert] = useState<string>('');

  return(
    <Context.Provider value={
      {
        user: user, 
        setUser: setUser, 
        alert: alert, 
        setAlert: setAlert}
    }>
      {children}
    </Context.Provider>
  )
}