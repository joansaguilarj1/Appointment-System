import { useEffect } from "react";
import AppointmentRow from "../components/AppointmentRow.component";
import { Link } from "react-router-dom";
import { AppointmentContext } from "../context/appointmentContext.component";
import { useContext } from "react";
import { Modal } from "bootstrap";

const Appointments = () => {
  const { getUserAppointments, appointments, cancelAppointment } =
    useContext(AppointmentContext);

  const handleCancelAppointment = () => {
    cancelAppointment();
  };

  useEffect(() => {
    getUserAppointments()
      .then(() => {})
      .catch((err) => console.log(err));
  }, []);

  const openCancelModal = () => {
    const modalElement = document.getElementById("cancelModal");
    const modal = new Modal(modalElement);
    modal.show();
  };
  return (
    <div className="vh-100 bg-secondary text-white p-5">
      <div className="container">
        <h2 className="mb-4 text-center">My Appointments</h2>
        <div className="d-flex justify-content-end">
          <Link
            className="nav-link text-decoration-underline"
            to="/registerAppointment"
          >
            {" "}
            Schedule a New Appointment
          </Link>
        </div>
        <div className="table-responsive ">
          <table className="table table-borderless align-middle text-white table table-dark table-striped table-hover">
            <thead className="table-dark border-bottom border-light">
              <tr>
                <th>Date</th>
                <th>Hour</th>
                <th>Status</th>
                <th>Subject</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <h2>There are no appointments scheduled</h2>
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    id={appointment.id}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                    subject={appointment.subject}
                    onOpenCancelModal={openCancelModal}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="cancelModal"
        tabIndex="-1"
        aria-labelledby="cancelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="cancelModalLabel">
                Cancel an appointment
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to cancel the appointment?
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
                onClick={handleCancelAppointment}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
