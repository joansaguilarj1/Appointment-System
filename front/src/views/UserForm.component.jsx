import { useFormik } from "formik";
import { userRegisterValidation } from "../helpers/validates";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../context/userContext.component";
import { Modal } from "bootstrap";

const UserForm = () => {
  const { registerUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: userRegisterValidation,
    onSubmit: (values) => {
      registerUser(values)
        .then((response) => {
          if (response.status === 201) 
            openRegisterModal();
            navigate("/login");
        })
        .catch((errors) => {
          alert(errors.response.data.msg);
        });
    },
  });

    const openRegisterModal = () => {
    const modalElement = document.getElementById("registerSuccessModal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  return (
    <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
      <div
        className="text-white bg-dark p-4 rounded"
        style={{ width: "100%", maxWidth: "520px" }}
      >
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className={
                formik.errors.name
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Enter your full name"
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.name}</div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className={
                formik.errors.email
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Enter your email"
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.email}</div>
          </div>

          {/* Birth Date */}
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              name="birthdate"
              type="date"
              className={
                formik.errors.birthdate
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.birthdate}</div>
          </div>

          {/* DNI */}
          <div className="mb-3">
            <label className="form-label">DNI Number</label>
            <input
              name="nDni"
              type="text"
              className={
                formik.errors.nDni
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Enter your DNI"
              onChange={formik.handleChange}
            />
            <div
              className="invalid-feedback"
              dangerouslySetInnerHTML={{
                __html: formik.errors.nDni,
              }}
            ></div>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className={
                formik.errors.username
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Choose a username"
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.username}</div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={
                formik.errors.password
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Create a password"
              onChange={formik.handleChange}
            />
            <div
              className="invalid-feedback"
              dangerouslySetInnerHTML={{
                __html: formik.errors.password,
              }}
            ></div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={Object.keys(formik.errors).length > 0}
            className="btn btn-light w-100 mb-3"
          >
            Register
          </button>
          <div className="text-center">
            <span className="text-white">
              Do you already have an account?{" "}
              <Link
                className="text-decoration-none text-light fw-semibold"
                to="/login"
              >
                Log in
              </Link>
            </span>
          </div>
        </form>

        <div
          className="modal fade"
          id="registerSuccessModal"
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
              <div className="modal-body">Register success</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
