/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";

export const AppointmentContext = createContext({
  userId: "",
  appointments: [],
  currentAppointment: "",
  registerAppointment: () => {},
  getUserAppointments: () => {},
  cancelAppointment: () => {},
});

export const AppoinmentProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState("");

  const registerAppointment = async (values) => {
    setUserId(JSON.parse(localStorage.getItem("user")).id)
    values.userId = userId;
    const response = await axios.post("http://localhost:3000/appointments/schedule", values);
    return response;
  };

  const getUserAppointments = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    setAppointments(response.data.user.appointments)
    return response;
  }

  const cancelAppointment = async () => {
    const response = await axios.put(`http://localhost:3000/appointments/cancel/${currentAppointment}`);
    const newAppointment = appointments.map((appointment) => {
      if (appointment.id === currentAppointment) {
        appointment.status = "cancelled";
        return appointment;
      } else {
        return appointment;
      }
    });
    setAppointments(newAppointment);
    return response;
  };

  const setCurrentAppointmentId = (id) => {
    setCurrentAppointment(id);
  }

  const value = {
    userId,
    appointments,
    registerAppointment,
    getUserAppointments,
    cancelAppointment,
    setCurrentAppointmentId
  };
  return (
    <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
  );
};
