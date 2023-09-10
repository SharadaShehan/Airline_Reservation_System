import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Main from "./pages/main";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/not-found";
import Flights from "./pages/flights";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path={"/home"} component={Main}></Route>
        <Route path={"/about"} component={About}></Route>
        <Route path={"/contact"} component={Contacts}></Route>
        <Route path={"/login"} component={Login}></Route>
        <Route path={"/register"} component={Register}></Route>
        <Route path={"/flights"} component={Flights}></Route>
        <Route path={"/not-found"} component={NotFound}></Route>
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
