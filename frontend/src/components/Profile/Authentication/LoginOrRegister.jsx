import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";
import AdminLoginForm from "./AdminLoginForm";
import AdminRegisterForm from "./AdminRegisterForm";
import DEOLoginForm from "./DEOLoginForm";
import DEORegisterForm from "./DEORegisterForm";
import AdminPortal from "./AdminPortal";
import "./authForms.css";
import "./loginOrRegister.css";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";

export default function LoginOrRegister() {
  const { authForm } = AuthFormGlobalState();

  return (
    <div className="formWrapper">
      <div className="wrapper">
        <img
          className="background-image"
          alt="Rectangle"
          src={require("../../../images/UserLogin.jpg")}
        />
        <div className="user-login-or-register-container">{renderPage()}</div>
      </div>
    </div>
  );

  function renderPage() {
    if (authForm === "user-login") {
      return <UserLoginForm />;
    } else if (authForm === "user-register") {
      return <UserRegisterForm />;
    } else if (authForm === "deo-login") {
      return <DEOLoginForm />;
    } else if (authForm === "deo-register") {
      return <DEORegisterForm />;
    } else if (authForm === "admin-login") {
      return <AdminLoginForm />;
    } else if (authForm === "admin-register") {
      return <AdminRegisterForm />;
    } else if (authForm === "admin-portal") {
      return <AdminPortal />;
    } else {
      return <div>Invalid AuthForm</div>;
    }
  }
}
