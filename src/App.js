import {BrowserRouter as Router, Routes, Route} from "react-router-dom";  //importing react router files
import Navbar from './components/navbar';
import About from './components/about';
import Home from './components/home';
import NoteState from './context/notes/notesstate';  //importing notestate from context
import Alert from './components/alert';
import Login from './components/login';
import SignUp from './components/signUp';
import { useState } from 'react';

const App = () => {
  //Alert part
  const [alert, setAlert]= useState(null);
  const showAlert= (message, type)=>{
      setAlert({ message: message, type: type });
      setTimeout(() => {
          setAlert(null);  //disabling alert after 3 sec
      }, 3000);
  }

  return (
    <>
      <NoteState>  {/*wrapping app in notestate so that state got available to all the components & subcomponents*/}
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="/about" element={<About showAlert={showAlert}/>}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}/>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
