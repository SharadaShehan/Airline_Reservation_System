import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./authForms.css"


export default function LoginOrRegister () {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="formWrapper">
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
    )
};