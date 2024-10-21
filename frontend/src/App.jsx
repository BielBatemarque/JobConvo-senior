import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/content/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
