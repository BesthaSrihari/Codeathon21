import './App.css';
import Login from './Camponents/Login';
import Signup from './Camponents/Signup';
import {Routes,Route} from "react-router-dom"
import Dashboard from './Camponents/Dashboard';

function App() {
  return (
    <div className="App">
      
      <Dashboard/>
      {/* <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes> */}
      
    </div>
  );
}

export default App;
