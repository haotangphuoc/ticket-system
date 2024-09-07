import { useContext } from "react";
import { UserGetByIdParams } from "../interfaces/userInterface";
import { Context } from "./Context";

export const useUser = (): UserGetByIdParams | null => {
  const { user } = useContext(Context);
  return user;
}

export const useSetUser = () => {
  const { setUser } = useContext(Context);
  
  return setUser;
}

