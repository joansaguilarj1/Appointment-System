import { useFormik } from "formik";
import { userLoginValidation } from "../helpers/validates";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../context/userContext.component";
import { Modal } from "bootstrap";

const Login = () => {
  const { logInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: userLoginValidation,
    onSubmit: (values) => {
      logInUser(values)
        .then((response) => {
          if (response.status === 200) {
            openLoginModal();
            navigate("/");
          }
        })
        .catch(() => {
          openFailLogInModal();
        });
    },
  });

  const openLoginModal = () => {
    const modalElement = document.getElementById("logInModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const openFailLogInModal = () => {
    const modalElement = document.getElementById("failLogInModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  return (
    <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
      <div
        className="bg-dark text-center text-white p-4 rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4">Login</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <div className="mb-3 text-start">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Ingresa tu usuario"
              className={
                formik.errors.username
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.username}</div>
          </div>

          {/* Password */}
          <div className="mb-4 text-start">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={
                formik.errors.password
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Ingresa tu contraseña"
              onChange={formik.handleChange}
            />
            <div
              className="invalid-feedback"
              dangerouslySetInnerHTML={{
                __html: formik.errors.password,
              }}
            ></div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={Object.keys(formik.errors).length > 0}
            className="btn btn-primary btn-light w-100 mb-3"
          >
            Login
          </button>
          
          <div
            className="modal fade"
            id="logInModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Welcome!</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="failLogInModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Incorrect credentials</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Crear cuenta */}
          <div className="text-center">
            <span className="text-white">
              Don't have an account?{" "}
              <Link
                className="text-decoration-none text-light fw-semibold"
                to="/registerUser"
              >
                Create an account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
