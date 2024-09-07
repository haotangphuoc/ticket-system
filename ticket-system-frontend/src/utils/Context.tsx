import { createContext, useState } from "react";
import { ReactNode } from "react";
import { UserGetByIdParams } from "../interfaces/userInterface";

interface ContextType {
  user: UserGetByIdParams | null,
  setUser: React.Dispatch<React.SetStateAction<UserGetByIdParams | null>>
}

export const Context = createContext<ContextType>(
  {
    user: null, 
    setUser: () => {}
  }
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserGetByIdParams | null>(null);

  return(
    <Context.Provider value={{user: user, setUser: setUser}}>
      {children}
    </Context.Provider>
  )
}