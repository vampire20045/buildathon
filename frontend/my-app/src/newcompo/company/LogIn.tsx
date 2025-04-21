import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "../subcomponent/msgbox";
import { Heading } from "../subcomponent/Heading";
import { Anchor } from "../subcomponent/anchorcompo";
import { InputAndLabel } from "../subcomponent/labelAndInput";
import { Button } from "../subcomponent/button";
import { Subheading } from "../subcomponent/SubHeading";

interface PostInput {
  email: string;
  password: string;
}

export const LogIn = () => {
  const BACK_END_URL = import.meta.env.BACK_END_URL;
  const navigate = useNavigate();

  const [postInput, setPostInput] = useState<PostInput>({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [ismsg, setIsMsg] = useState(false);

  const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function (...args: Parameters<T>) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const ReqSingin = async () => {
    try {
      const response = await axios.post(`${BACK_END_URL}/api/v1/user/Login`, postInput);
      const { userToken } = response.data;

      if (!userToken) {
        setMsg(response.data.msg);
        setIsMsg(true);
        setTimeout(() => {
          setIsMsg(false);
        }, 1000);
      } else {
        localStorage.setItem("token", userToken);
        navigate("/BlogsFeed");
      }
    } catch (error) {
      console.log(error);
      setIsMsg(true);
      setMsg("Try again!");
    }
  };

  const debounceReqSignin = useCallback(
    debounce(ReqSingin, 300),
    [postInput.email, postInput.password]
  );

  const handleSubmit = () => {
    debounceReqSignin();
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0" />

      {ismsg && <Msgbox msg={msg} />}

      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Login To Company's Account" align="center" className="text-white" />
        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Don't have an Account?" align="center" />
          <Anchor heading="Signup" link="/company/SignUp" />
        </div>

        <InputAndLabel
          heading="HR Email"
          placeholder="Enter your email"
          onChange={(e) =>
            setPostInput((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <InputAndLabel
          heading="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setPostInput((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <div className="w-full mt-4 flex justify-center">
          <Button heading="Sign In" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
