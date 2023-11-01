import React from "react";
import { UserMenuGlobalState } from "../../Layout/UserMenuGlobalState";
import "../Authentication/authForms.css";

function RegisterPortal() {
  const { setUserMenuItem } = UserMenuGlobalState();

  return (
    <div className="loginFormWrapper">
      <form className="authForm-admin">
        <span className="header">Register Portal</span>
        <div className="formField">
          <button
            className="portal-button"
            onClick={() => setUserMenuItem("admin-register")}
          >
            Register Admin
          </button>
        </div>
        <div className="formField">
          <button
            className="portal-button"
            onClick={() => setUserMenuItem("deo-register")}
          >
            Register Data Entry Operator
          </button>
        </div>
        <div className="portal-button-container">
          <button
            className="portal-back-btn"
            onClick={() => setUserMenuItem("admin-login")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPortal;
