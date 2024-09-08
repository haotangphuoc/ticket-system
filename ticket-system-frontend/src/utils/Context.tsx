import { createContext, useState } from "react";
import { ReactNode } from "react";

interface ContextType {
  refetchFlag: boolean,
  setRefetchFlag: React.Dispatch<React.SetStateAction<boolean>>,
  alert: string,
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<ContextType>(
  {
    refetchFlag: false, 
    setRefetchFlag: () => {},
    alert: '',
    setAlert: () => {},
  }
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [ refetchFlag, setRefetchFlag ] = useState(false);
  const [ alert, setAlert ] = useState<string>('');

  return(
    <Context.Provider value={{ refetchFlag, setRefetchFlag, alert, setAlert}}>
      {children}
    </Context.Provider>
  )
}