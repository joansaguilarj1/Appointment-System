import Navbar from "./components/Navbar.component";
import Home from "./views/Home.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./views/Login.component";
import Appointments from "./views/Appointments.component";
import AppointmentForm from "./views/AppointmentForm.component";
import UserForm from "./views/UserForm.component";
import { useEffect, useContext } from "react";
import { UsersContext } from "./context/userContext.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { isLogged } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isLogged &&
      (location.pathname !== "/login" || location.pathname !== "/registerUser")
    ) {
      navigate("/");
    }
    if (
      isLogged &&
      (location.pathname !== "/appointments" ||
        location.pathname !== "/registerAppointment")
    ) {
      navigate("/appointments");
    }
  }, []);
  return (
    <>
      <header>
        <Navbar />
      </header>
      {
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/registerUser" element={<UserForm />} />
            <Route path="/registerAppointment" element={<AppointmentForm />} />
          </Routes>
        </main>
      }
    </>
  );
}

export default App;
