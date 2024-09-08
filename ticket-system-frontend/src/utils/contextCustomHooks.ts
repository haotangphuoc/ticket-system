import { useContext } from "react";
import { Context } from "./Context";

export const useUser = () => {
  const { user } = useContext(Context);
  return user;
}

export const useSetUser = ()=> {
  const { setUser } = useContext(Context);
  
  return setUser;
}

export const useAlert = () => {
  const { alert } = useContext(Context);
  return alert;
}

export const useSetAlert = () => {
  const { setAlert } = useContext(Context);
  return setAlert;
}

