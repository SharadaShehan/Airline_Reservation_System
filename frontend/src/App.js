import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import DEOProfile from "./pages/deoProfile";
import BookFlights from "./pages/BookFlights";
import BookedTickets from "./pages/BookedTickets";

import NotFound from "./pages/NotFound";
import { AboutUsPage } from "./pages/AboutUs";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/DEOprofile" element={<Profile />}></Route>
          <Route path="/book-flights" element={<BookFlights />}></Route>
          <Route path="/booked-tickets" element={<BookedTickets />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
