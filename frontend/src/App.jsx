import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
