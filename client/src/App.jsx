import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login'
import Register from'../pages/Register'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = 'register' element = {<Register/>}/>
        <Route path='/dashboard/:user' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
