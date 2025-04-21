import { useState } from "react";
import { Heading } from "../subcomponent/Heading";
import { Anchor } from "../subcomponent/anchorcompo";
import { Subheading } from "../subcomponent/SubHeading";
import { InputAndLabel } from "../subcomponent/labelAndInput";
import { Button } from "../subcomponent/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !mail || !phone || !password) {
      console.log("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/company/registercompany", {
        name,
        mail,
        phone,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // or any route you want
      } else {
        console.log("Signup failed:", res.data.msg || "Unknown error");
      }
    } catch (err) {
      console.log("Error during signup:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Create An Account" align="center" className="text-white" />

        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Already have an Account?" align="center" />
          <Anchor heading="Login" link="/Signin" />
        </div>

        <InputAndLabel
          heading="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <InputAndLabel
          heading="email"
          placeholder="Enter your name"
          onChange={(e) => setmail(e.target.value)}
        />
        <InputAndLabel
          heading="phone"
          placeholder="Enter your phone number"
          onChange={(e) => setPhone(e.target.value)}
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
