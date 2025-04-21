import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "./subcomponent/msgbox";
import { Heading } from "./subcomponent/Heading";
import { Anchor } from "./subcomponent/anchorcompo";
import { Subheading } from "./subcomponent/SubHeading";
import { InputAndLabel } from "./subcomponent/labelAndInput";
import { Button } from "./subcomponent/button";

interface postInput {
  username: string;
  name: string;
  email: string;
  password: string;
}

export const Singup = () => {
  const navigate = useNavigate();
  const BACK_END_URL = import.meta.env.BACK_END_URL;

  const [postInput, setpostInput] = useState<postInput>({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [ismsg, setismsg] = useState(false);

  const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function (...args: Parameters<T>) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const ReqSingup = async () => {
    try {
      const Response = await axios.post(
        `${BACK_END_URL}/api/v1/user/signup`,
        postInput
      );

      const { token } = Response.data;
      if (!token) {
        setMsg(Response.data.msg);
        setismsg(true);
        setTimeout(() => {
          setismsg(false);
        }, 2000);
      } else {
        localStorage.setItem("token", token);
        if (localStorage.getItem("token")) {
          navigate("/BlogsFeed");
        }
      }
    } catch (error) {
      console.log(error);
      setismsg(true);
      setMsg("Try again!");
    }
  };

  const debounceReqSignup = useCallback(
    debounce(ReqSingup, 300),
    [postInput.email, postInput.password, postInput.username]
  );

  const handleSubmit = () => {
    debounceReqSignup();
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0"></div>
      
      {ismsg && <Msgbox msg={msg} />}

      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Create An Account" align="center" className="text-white" />
        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Already have an Account?" align="center" />
          <Anchor heading="Login" link="/Signin" />
        </div>

        <InputAndLabel
          heading="Username"
          placeholder="Enter your username"
          onChange={(e) =>
            setpostInput((c) => ({
              ...c,
              username: e.target.value,
            }))
          }
        />
        <InputAndLabel
          heading="Name"
          placeholder="Enter your name"
          onChange={(e) =>
            setpostInput((c) => ({
              ...c,
              name: e.target.value,
            }))
          }
        />
        <InputAndLabel
          heading="Email"
          placeholder="Enter your email"
          onChange={(e) =>
            setpostInput((c) => ({
              ...c,
              email: e.target.value,
            }))
          }
        />
        <InputAndLabel
          heading="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setpostInput((c) => ({
              ...c,
              password: e.target.value,
            }))
          }
        />
        <div className="w-full mt-4 flex justify-center">
          <Button onClick={handleSubmit} heading="Sign Up" />
        </div>
      </div>
    </div>
  );
};
