import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../context/userContext.component";

const Home = () => {
  const { isLogged } = useContext(UsersContext);
  const navigate = useNavigate();
  return (
    <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
      <div className="text-center text-white">
        <h1 className="mb-4">Welcome to the Appoitment System!</h1>

        {/* <p className="mb-4">Clic aquí para agendar un turno</p> */}

        <div className="d-flex gap-3 justify-content-center">
          <button
            className={isLogged ? "btn btn-outline-light " : "d-none"}
            onClick={() => navigate("/registerAppointment/")}
          >
            Schedule an appointment
          </button>

          <button
            className={isLogged ? "d-none" : "btn btn-outline-light"}
            onClick={() => navigate("/login/")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
