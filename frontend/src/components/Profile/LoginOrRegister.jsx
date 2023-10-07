import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./authForms.css";
import "./loginOrRegister.css";


export default function LoginOrRegister () {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="formWrapper">
          <div className="wrapper">
            <img 
                className="background-image" 
                alt="Rectangle" 
                src={require("../../images/UserLogin.jpg")} />
            <div className="user-login-or-register-container">
              {isLogin ?
                (<>
                    <LoginForm/> 
                    <div className="swap">
                      Don't have an account?&nbsp;
                      <button className="swapBtn" onClick={() => setIsLogin(false)}>Register</button>
                    </div>
                </>)
                : 
                (<>
                    <RegisterForm/>
                    <div className="swap">
                      Do you already have an account?&nbsp;
                      <button className="swapBtn" onClick={() => setIsLogin(true)}>Login</button>
                    </div>
                </>)
              }
            </div>
          </div>
        </div>
    )
};

