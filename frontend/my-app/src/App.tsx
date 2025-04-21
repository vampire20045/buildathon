<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Singup } from "./newcompo/signup";
import { Singin } from "./newcompo/signin";
import { Homepage } from "./newcompo/homepage";
=======

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Singup } from './newcompo/signup'
import { Singin } from './newcompo/signin'
import { Homepage } from './newcompo/homepage'
import { InterviewPage } from './newcompo/interview'
>>>>>>> 897570a11318963f0631c9b5f037f1b0ab4e8161

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="/Singup" element={<Singup />}></Route>
        <Route path="/Signin" element={<Singin />}></Route>
      </Routes>
=======
    <Routes>
    <Route path="/" element={<Homepage/>}></Route>
    <Route path="/Interview" element={<InterviewPage/>}></Route>
      <Route path="/Singup" element={<Singup/>}></Route>
      <Route path="/Signin" element={<Singin/>}></Route>
     
    </Routes>
>>>>>>> 897570a11318963f0631c9b5f037f1b0ab4e8161
    </BrowserRouter>
  );
}

export default App;
