import { useState } from "react";
import { Heading } from "./subcomponent/Heading";
import { Anchor } from "./subcomponent/anchorcompo";
import { Subheading } from "./subcomponent/SubHeading";
import { InputAndLabel } from "./subcomponent/labelAndInput";
import { Button } from "./subcomponent/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "./subcomponent/msgbox";

export const Singup = () => {
  const BACK_END_URL = import.meta.env.VITE_BACK_END_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const showMessage = (message: string) => {
    setMsg(message);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  const handleSignup = async () => {
    if (!username || !name || !email || !password) {
      showMessage("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${BACK_END_URL}/company/registercompany`, {
        username,
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/Interview");
      } else {
        showMessage(res.data.msg || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      showMessage("Something went wrong!");
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0"></div>

      {showMsg && <Msgbox msg={msg} />}

      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Create An Account" align="center" className="text-white" />

        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Already have an Account?" align="center" />
          <Anchor heading="Login" link="/Signin" />
        </div>

        <InputAndLabel
          heading="Username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputAndLabel
          heading="Name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <InputAndLabel
          heading="Email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputAndLabel
          heading="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full mt-4 flex justify-center">
          <Button heading="Sign Up" onClick={handleSignup} />
        </div>
      </div>
    </div>
  );
};
