import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? <Login toggleAuth={() => setIsLogin(false)} /> : <Signup toggleAuth={() => setIsLogin(true)} />}
    </>
  );
};

export default Auth;