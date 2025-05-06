import React from "react";
import PasswordInput from "../common/PasswordInput";

const Login = () => {
  return (
    <div className="w-full h-screen bg-login bg-repeat justify-center items-center flex flex-col ">
      <div className="m-8 flex p-8 gap-4 flex-col justify-between items-center border rounded-2xl w-96 h-96 bg-[#03fcf0]">
        <h2 className="font-medium text-2xl">Login</h2>
        <span className="flex flex-col gap-4 w-full ">
          <input className="p-4 rounded-2xl" placeholder="user name" />
       <PasswordInput/>
        </span>
        <button className="p-4 w-full rounded-2xl border-white border-2 hover:bg-[#03f4fc] ">
          Sing In
        </button>
      </div>
    </div>
  );
};

export default Login;
