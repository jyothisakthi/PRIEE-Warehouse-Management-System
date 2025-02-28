import React, { useState } from "react";
import "./loginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          {!isLogin && (
            <div className="input-group">
              <label>Username</label>
              <input className="input-field" type="text" placeholder="Enter your username" />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input className="input-field" type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="input-field" type="password" placeholder="Enter your password" />
          </div>
          <button className="button">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;