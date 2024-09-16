import { Outlet } from "react-router-dom";
import { appointments } from "./constants/appointments";

export default function App() {
  return <>App</>;
}

export function Layout() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Outlet />
    </div>
  );
}

export function Home() {
  console.log(appointments);
  return (
    <div>
      <h1>Dashboard Home</h1>
    </div>
  );
}

export function AppointmentsLayout() {
  return (
    <div>
      <h1>Appointments Layout</h1>
      <Outlet />
    </div>
  );
}
export function AppointmentsHome() {
  return (
    <div>
      <h1>Appointments Home</h1>
      {appointments?.map((a, i) => (
        <p key={i}>
          {a?.date}-{a?.time}, {a?.doctorName} {a?.patientName}, {a?.reason}
        </p>
      ))}
    </div>
  );
}

export function AppointmentLayout() {
  return (
    <div>
      <h1>Appointment Layout</h1>
      <Outlet />
    </div>
  );
}
export function AppointmentHome() {
  const appointment = appointments[1];
  const data = `${appointment?.date} ${appointment?.time}, ${appointment?.doctorName} ${appointment?.patientName}, ${appointment?.reason}`;
  return (
    <div>
      <h1>Appointment Home</h1>
      {data}
    </div>
  );
}

export function PrescriptionsLayout() {
  return (
    <div>
      <h1>Prescriptions Layout</h1>
      <Outlet />
    </div>
  );
}
export function PrescriptionsHome() {
  return (
    <div>
      <h1 className="text-xs">Prescriptions Home</h1>
      <h1 className="text-sm">Prescriptions Home</h1>
      <h1 className="text-base">Prescriptions Home</h1>
      <h1 className="text-lg">Prescriptions Home</h1>
      <h1 className="text-xl">Prescriptions Home</h1>
      <h1 className="text-2xl">Prescriptions Home</h1>
      {appointments[1].prescriptions?.map((p, i) => (
        <p key={i}>
          {p?.medication}, {p?.dosage}, {p?.frequency}, {p?.notes}
        </p>
      ))}
    </div>
  );
}

export function PrescriptionLayout() {
  return (
    <div>
      <h1>Prescription Layout</h1>
      <Outlet />
    </div>
  );
}
export function PrescriptionHome() {
  const prescription = appointments[1].prescriptions[1];
  const data = `${prescription?.medication} : ${prescription?.dosage}, ${prescription?.frequency}, ${prescription?.notes}`;
  return (
    <div>
      <h1>Prescription Home</h1>
      {data}
    </div>
  );
}
