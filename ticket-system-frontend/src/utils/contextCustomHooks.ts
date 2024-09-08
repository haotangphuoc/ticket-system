import { useContext } from "react";
import { Context } from "./Context";

export const useRefetchFlag = () => {
  const { refetchFlag } = useContext(Context);
  return refetchFlag;
}

export const useSetRefetchFlag = ()=> {
  const { setRefetchFlag } = useContext(Context);
  
  return setRefetchFlag;
}

export const useAlert = () => {
  const { alert } = useContext(Context);
  return alert;
}

export const useSetAlert = () => {
  const { setAlert } = useContext(Context);
  return setAlert;
}

