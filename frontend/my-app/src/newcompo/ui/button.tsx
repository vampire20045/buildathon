import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
};
