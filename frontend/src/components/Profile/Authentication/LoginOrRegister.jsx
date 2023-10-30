import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";
import AdminLoginForm from "./AdminLoginForm";
import AdminRegisterForm from "./AdminRegisterForm";
import DEOLoginForm from "./DEOLoginForm";
import DEORegisterForm from "./DEORegisterForm";
import AdminPortal from "./AdminPortal";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";
import "./authForms.css";
import "./loginOrRegister.css";

export default function LoginOrRegister() {
  const { authForm } = AuthFormGlobalState();

  return (
    <div className="formWrapper">
      <div className="wrapper">
        {(authForm === "user-register" || authForm === "user-login") ? (
          <img
            className="background-image"
            alt="Rectangle"
            loading="lazy"
            src={require("../../../images/user3.jpg")}
          />
        ): (
          <img
            className="background-image"
            alt="Rectangle"
            loading="lazy"
            src={require("../../../images/StaffLogin.png")}
          />
        )}
        <div className="user-login-or-register-container"
          style={{
            height: (authForm === "user-register" || authForm === "user-login") ? "41vw" : "34vw"
          }}
          >
          {renderPage()}
        </div>
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
