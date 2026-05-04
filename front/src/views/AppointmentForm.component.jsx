import { useFormik } from "formik";
import { appointmentValidates } from "../helpers/validates";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppointmentContext } from "../context/appointmentContext.component";
import { Modal } from "bootstrap";

const AppointmentForm = () => {
  const { registerAppointment } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      subject: "",
      date: "",
      time: "",
    },
    validate: appointmentValidates,
    onSubmit: (values) => {
      registerAppointment(values)
        .then((response) => {
          if (response.status === 201) openRegisterModal();
          navigate("/appointments");
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
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Register New Appointment</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Issue */}
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              className={
                formik.errors.subject
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              placeholder="Enter the appointment subject"
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.subject}</div>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className={
                formik.errors.date
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.date}</div>
          </div>

          {/* Hour */}
          <div className="mb-4">
            <label className="form-label">Hour</label>
            <input
              type="time"
              name="time"
              className={
                formik.errors.time
                  ? "form-control bg-transparent text-white border-light is-invalid"
                  : "form-control bg-transparent text-white border-light"
              }
              onChange={formik.handleChange}
            />
            <div className="invalid-feedback">{formik.errors.time}</div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-light w-100"
            disabled={Object.keys(formik.errors).length > 0}
          >
            Schedule Appointment
          </button>
        </form>
      </div>

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
            <div className="modal-body">Register appointment success</div>
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
  );
};

export default AppointmentForm;
