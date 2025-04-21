import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Singup } from "./newcompo/signup";
import { Singin } from "./newcompo/signin";
import { Homepage } from "./newcompo/homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>

        <Route path="/Singup" element={<Singup />}></Route>
        <Route path="/Signin" element={<Singin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
