
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Singup } from './newcompo/signup'
import { Singin } from './newcompo/signin'
import { Homepage } from './newcompo/homepage'
import { InterviewPage } from './newcompo/interview'
import {LogIn} from './newcompo/company/LogIn'
import {SignUp} from './newcompo/company/SignUp'

function App() {
  return (
    <BrowserRouter>
  
       
    <Routes>
    <Route path="/" element={<Homepage/>}></Route>
    <Route path="/Interview" element={<InterviewPage/>}></Route>
      <Route path="/Singup" element={<Singup/>}></Route>
      <Route path="/Signin" element={<Singin/>}></Route>
      <Route path="/company/Signup" element={<SignUp/>}></Route>
      <Route path="/company/Login" element={<LogIn/>}></Route>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
