import React from "react";
import LoginForm from "./login-form";

export const Login: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-full bg-white rounded-xl border-primary border">
        <LoginForm />
      </div>
    </div>
  );
};
