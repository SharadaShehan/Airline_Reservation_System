import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";
import "./authForms.css";
import "./loginOrRegister.css";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";


export default function LoginOrRegister () {
    const { authForm } = AuthFormGlobalState();

    return (
        <div className="formWrapper">
          <div className="wrapper">
            <img 
                className="background-image" 
                alt="Rectangle" 
                src={require("../../../images/UserLogin.jpg")} />
            <div className="user-login-or-register-container">
              {renderPage()}
            </div>
          </div>
        </div>
    )

  function renderPage() {
    if (authForm === "user-login") {
      return <UserLoginForm/>;
    } else if (authForm === "user-register") {
      return <UserRegisterForm/>;
    } else if (authForm === "deo-login") {
      return <div>DEO Login</div>;
    } else if (authForm === "deo-register") {
      return <div>DEO Register</div>;
    } else if (authForm === "admin-login") {
      return <div>Admin Login</div>;
    } else if (authForm === "admin-register") {
      return <div>Admin Register</div>;
    } else {
      return <div>Invalid AuthForm</div>;
    }
  }

};
