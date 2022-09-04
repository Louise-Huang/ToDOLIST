import { Routes, Route } from "react-router-dom"
import './assets/all.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import TodoList from './components/TodoList'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/todo" element={<TodoList />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
