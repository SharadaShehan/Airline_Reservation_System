import React from "react";
import { AuthFormGlobalState } from "../../Layout/AuthFormGlobalState";
import "./authForms.css";

function AdminPortal() {
  const { setAuthForm } = AuthFormGlobalState();

  return (
    <div className="loginFormWrapper">
      <form className="authForm">
        <span className="header">Admin Portal</span>
        <div className="formField">
          <button
            className="portal-button"
            onClick={() => setAuthForm("admin-login")}
          >
            Log In As An Admin
          </button>
        </div>
        <div className="formField">
          <button
            className="portal-button"
            onClick={() => setAuthForm("deo-login")}
          >
            Log In As A DEO
          </button>
        </div>
        <div className="portal-button-container">
          <button
            className="portal-back-btn"
            onClick={() => setAuthForm("user-login")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPortal;
