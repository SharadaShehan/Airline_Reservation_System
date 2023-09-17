import React from "react";
// import Joi from "joi-browser";
// import Form from "../common/form";
import { UserGlobalState } from '../Layout/UserGlobalState';


export default function RegisterForm () {
  const { setCurrentUserData } = UserGlobalState();

  const submitfunc = (e) => {
    console.log("Submitted");
    e.preventDefault();
    setCurrentUserData({
      'username': 'SamC',
      'firstName': 'Sam',
      'lastName': 'Convoy',
      'isAdmin': 0,
      'isDataEntryOperator': 0,
      'bookingsCount': 15,
      'category': 'Frequent'
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        id="form"
        onSubmit={submitfunc}
        style={{
          width: "50%",
          margin: "auto",
          padding: "20px",
        }}
      >
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}







// class RegisterForm extends Form {
//   state = {
//     data: { username: "", password: "", name: "" },
//     errors: {},
//   };

//   schema = {
//     username: Joi.string().email().required().label("Username"),
//     password: Joi.string().min(5).required().label("Password"),
//     name: Joi.string().required().label("Name"),
//   };

//   doSubmit = () => {
//     const { setCurrentUserData } = UserGlobalState();
//     setCurrentUserData({
//       'username': 'SamC',
//       'firstName': 'Sam',
//       'lastName': 'Convoy',
//       'isAdmin': 0,
//       'isDataEntryOperator': 0,
//       'bookingsCount': 15,
//       'category': 'Frequent'
//     });
//     console.log("Registered");
//   };

//   render() {
//     return (
//       <div>
//         <h1>Register</h1>
//         <form
//           onSubmit={this.handleSubmit}
//           style={{
//             width: "50%",
//             margin: "auto",
//             padding: "20px",
//           }}
//         >
//           {this.renderInput("username", "Username", false)}
//           {this.renderInput("password", "Password", false, "password")}
//           {this.renderInput("name", "Name", false)}
//           {this.renderButton("Register")}
//         </form>
//       </div>
//     );
//   }
// }

// export default RegisterForm;
