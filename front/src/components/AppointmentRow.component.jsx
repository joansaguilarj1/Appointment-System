import { AppointmentContext } from "../context/appointmentContext.component";
import { useContext } from "react";

const AppointmentRow = ({ date, time, status, subject, id, onOpenCancelModal }) => {

  const { setCurrentAppointmentId } = useContext(AppointmentContext);
  
  const handleCancelButtton = () =>{
    setCurrentAppointmentId(id);
    onOpenCancelModal();
  }
  return (
    <tr>
      <td>{date}</td>
      <td>{time}</td>
      <td>
        <span
          className={
            status === "active" ? "badge bg-success" : "badge bg-danger"
          }
        >
          {status}
        </span>
      </td>
      <td>{subject}</td>
      <td className="text-center">
        <button
          className="btn btn-outline-light btn-sm"
          disabled={  status === "active" ? false : true}
          onClick={handleCancelButtton}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default AppointmentRow;
