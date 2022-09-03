import { Routes, Route } from "react-router-dom";
import './assets/all.css';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
