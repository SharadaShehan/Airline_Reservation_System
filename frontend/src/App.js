import "./App.css";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BookFlights from "./pages/BookFlights";
import BookedTickets from "./pages/BookedTickets";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

import { Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Layout>
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/book-flights" element={<BookFlights/>}></Route>
          <Route path="/booked-tickets" element={<BookedTickets/>}></Route>
          <Route path="/about-us" element={<AboutUs/>}></Route>
          <Route path="/not-found" element={<NotFound/>}></Route>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
        </Layout>
    </div>
    
  );
}

export default App;
