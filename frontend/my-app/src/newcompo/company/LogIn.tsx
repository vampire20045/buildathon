import { useState } from "react";
import { Heading } from "../subcomponent/Heading";
import { Anchor } from "../subcomponent/anchorcompo";
import { Subheading } from "../subcomponent/SubHeading";
import { InputAndLabel } from "../subcomponent/labelAndInput";
import { Button } from "../subcomponent/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const LogIn = () => {
  const [mail, setmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!mail || !password) {
      console.log("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        mail,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // Change this path if needed
      } else {
        console.log("Login failed:", res.data.msg || "Unknown error");
      }
    } catch (err) {
      console.log("Error during login:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Login To Account" align="center" className="text-white" />

        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Don't have an Account?" align="center" />
          <Anchor heading="Signup" link="/Singup" />
        </div>

        <InputAndLabel
          heading="mail"
          placeholder="Enter your mail"
          onChange={(e) => setmail(e.target.value)}
        />
        <InputAndLabel
          heading="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full mt-4 flex justify-center">
          <Button heading="Sign In" onClick={handleSignin} />
        </div>
      </div>
    </div>
  );
};
