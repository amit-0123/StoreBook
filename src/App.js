import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MyState from './context/notes/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


// The App.js file defines a React component called App. This component returns JSX that represents the structure and content of your application's UI.

// The App component is the main component of your application and is rendered inside the root container.

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
    <MyState>

      <Router>

        <Navbar />
        
        <Alerts alert = {alert}/>

        <div className="container">

         <Routes>
          <Route exact path="/home" element={<Home showAlert={showAlert}/>} /> 
          <Route exact path="/about" element={<About />}/> 
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/> 
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />}/> 
        </Routes>
        </div>

      </Router>

      </MyState>
    </>
  );
}

export default App;

{/* as of react-router-dom version 6, the Switch component has been replaced by the Routes component.   */ }

{/* If you are using an older version of react-router-dom, you can use Switch as shown below. If you are using version 6 or later, you should use Routes instead. */ }



{/* <h1>This is iNotebook</h1> */ }