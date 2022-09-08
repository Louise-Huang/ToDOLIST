import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './Context'
import './assets/all.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import TodoList from './components/TodoList'
import NotFound from './components/NotFound'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <div className="App">
      <AuthContext.Provider value={{token, setToken}}>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/todo" element={<TodoList />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
