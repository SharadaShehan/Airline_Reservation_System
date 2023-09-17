import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


export default function LoginOrRegister () {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
          {isLogin ?
            <>
                <LoginForm/> 
                <button onClick={() => setIsLogin(false)}>Register</button>
            </>
            : 
            <>
                <RegisterForm/>
                <button onClick={() => setIsLogin(true)}>Login</button>
            </>
          }
        </>
    )
};