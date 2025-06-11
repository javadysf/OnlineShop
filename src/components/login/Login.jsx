import React from "react";
import PasswordInput from "../common/PasswordInput";

const Login = () => {
  return (
    <div className="w-full h-screen bg-white dark:bg-gray-900 justify-center items-center flex flex-col">
      <div className="m-8 flex p-8 gap-4 flex-col justify-between items-center border border-gray-200 dark:border-gray-700 rounded-2xl w-96 h-96 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
        <h2 className="font-medium text-2xl text-gray-900 dark:text-white">ورود به حساب کاربری</h2>
        <span className="flex flex-col gap-4 w-full">
          <input 
            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="نام کاربری" 
          />
          <PasswordInput />
        </span>
        <button className="p-4 w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
          ورود
        </button>
      </div>
    </div>
  );
};

export default Login;
