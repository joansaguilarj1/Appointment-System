import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../context/userContext.component";
import { useContext } from "react";

const Navbar = () => {
  const { isLogged, logOutUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Appointment System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className={!isLogged ? "d-none" : "nav-item"}>
                <Link className="nav-link" to="/appointments">
                  My Appointments
                </Link>
              </li>
              <li className={isLogged ? "d-none" : "nav-item"}>
                <Link className="nav-link" to="/registerUser">
                  Register
                </Link>
              </li>
              <li className={isLogged ? "d-none" : "nav-item"}>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <span
              className={isLogged ? "text-light navbar-text fw-bold" : "d-none"}
            >
              {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : ""}
            </span>
            <button
              type="button"
              className={!isLogged ? "d-none" : "btn btn-link"}
              data-bs-toggle="modal"
              data-bs-target="#logOutModal"
            >
              Log out
            </button>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="logOutModal"
              tabIndex="-1"
              aria-labelledby="logOutModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="logOutModalLabel">
                      Log out
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to log out?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleLogOut}
                    >
                      Yes, Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
