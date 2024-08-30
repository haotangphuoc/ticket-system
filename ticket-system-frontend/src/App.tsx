import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import HomePage from './components/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './utils/Context';

function App() {
  return (
    <ContextProvider>
      < Router>
        <div className='app'>
          <HomePage/>
        </div>
      </Router>
    </ContextProvider>
  )
}

export default App
