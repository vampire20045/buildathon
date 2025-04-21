import { ChangeEvent } from "react";

interface InputAndLabelProps {
  heading: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const InputAndLabel = (props: InputAndLabelProps) => {
  return (
    <div className="p-2">
      <div className="text-lg text-white font-medium mb-2">
        {props.heading}
      </div>
      <div className="p-1">
        <input
          type={props.type || "text"}
          className="min-h-8 w-full p-3 rounded-md text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
