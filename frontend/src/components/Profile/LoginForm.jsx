import React from "react";
// import Joi from "joi-browser";
// import Form from "../common/form";
import { UserGlobalState } from '../Layout/UserGlobalState';
import { BookingStepGlobalState } from '../Layout/BookingStepGlobalState';

export default function LoginForm () {
  const { setCurrentUserData } = UserGlobalState();
  const { setBookingStep } = BookingStepGlobalState();

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
    setBookingStep('seatReserve');
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


// onSubmit={submitfunc}

// class LoginForm extends Form {
  

//   state = {
//     data: { username: "", password: "" },
//     errors: {},
//   };

//   schema = {
//     username: Joi.string().required().label("Username"),
//     password: Joi.string().required().label("Password"),
//   };

//   doSubmit = () => {
//     // Call the server
//     console.log("Submitted");
//   };

//   render() {
    
//     return (
//       <div>
//         <h1>Login</h1>
//         <form
//           onSubmit={this.handleSubmit();}
//           style={{
//             width: "50%",
//             margin: "auto",
//             padding: "20px",
//           }}
//         >
//           {this.renderInput("username", "Username", false)}
//           {this.renderInput("password", "Password", false, "password")}
//           {this.renderButton("Login")}
//         </form>
//       </div>
//     );
//   }
// }

// export default LoginForm;

