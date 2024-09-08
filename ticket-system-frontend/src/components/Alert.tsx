import { useAlert, useSetAlert } from '../utils/contextCustomHooks';
import '../css/Alert.css';
import { useEffect } from 'react';


const Alert = (): JSX.Element | null => {
  const alert = useAlert();
  const setAlert = useSetAlert();

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert('');
      }, 4000); 
      return () => clearTimeout(timeoutId);
    }
  }, [alert, setAlert]);
  
  return (
    <div className={`alert ${alert ? "d-block" : "d-none"}`}>
      <div className='d-flex justify-content-end'>
      <button className="alert-close-button m-0 p-0" onClick={() => setAlert('')}>×</button>
      </div>
      <p>{alert}</p>
    </div>
  );
};

export default Alert;
