import axios from "axios";
import { useCallback, useState } from "react";
import { Msgbox } from "./subcomponent/msgbox";
import { Heading } from "./subcomponent/Heading";
import { InputAndLabel } from "./subcomponent/labelAndInput";
import { Button } from "./subcomponent/button";
import { Subheading } from "./subcomponent/SubHeading";
import { JobNavbar } from "./subcomponent/jobnavbar";

interface PostInput {
  position: string;
  discription: string;
}

export const JobPosting = () => {
  const BACK_END_URL = import.meta.env.BACK_END_URL;

  const [postInput, setPostInput] = useState<PostInput>({
    position: "",
    discription: "",
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
      }
    } catch (error) {
      console.log(error);
      setIsMsg(true);
      setMsg("Try again!");
    }
  };

  const debounceReqSignin = useCallback(
    debounce(ReqSingin, 300),
    [postInput.position, postInput.discription]
  );

  const handleSubmit = () => {
    debounceReqSignin();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col relative">
      {/* Navbar */}
      <div className="w-full z-20 fixed top-0 ">
        <JobNavbar />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-purple-800 animate-glowing-beam bg-[length:200%_100%] z-0" />

      {ismsg && <Msgbox msg={msg} />}

      {/* Job Posting Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md border border-white/50 rounded-2xl shadow-xl">
        <Heading heading="Add job you have vacancy for" align="center" className="text-white" />
        <div className="flex items-center justify-center mb-4 gap-2">
          <Subheading heading="Mention position and description" align="center" />
        </div>

        <InputAndLabel
          heading="Position"
          placeholder="Enter Position you are hiring for."
          onChange={(e) =>
            setPostInput((prev) => ({
              ...prev,
              position: e.target.value,
            }))
          }
        />

        <InputAndLabel
          heading="Job Description"
          placeholder="Enter your JD"
          onChange={(e) =>
            setPostInput((prev) => ({
              ...prev,
              discription: e.target.value,
            }))
          }
        />

        <div className="w-full mt-4 flex justify-center">
          <Button heading="Post Job" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
