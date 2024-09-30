import { createBrowserRouter } from "react-router-dom";
import { routes } from "./constants/routes";
import AppointmentLayout from "./layouts/Appointment";
import DashboardLayout from "./layouts/Dashboard";
import PrescriptionLayout from "./layouts/Prescription";
import AppointmentPage from "./pages/Appointment";
import DashboardPage from "./pages/Dashboard";
import PrescriptionPage from "./pages/Prescription";
import AppointmentsLayout from "./layouts/Appointments";
import AppointmentsPage from "./pages/Appointments";
import PrescriptionsLayout from "./layouts/Prescriptions";
import PrescriptionsPage from "./pages/Prescriptions";
import AuthLayout from "./layouts/auth/Auth";
import LoginPage from "./pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: routes.auth.root,
    element: <AuthLayout />,
    children: [{ path: routes.auth.login, element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: routes.appointments.root,
        element: <AppointmentsLayout />,
        children: [
          { index: true, element: <AppointmentsPage /> },
          {
            path: routes.byId,
            element: <AppointmentLayout />,
            children: [
              { index: true, element: <AppointmentPage /> },
              {
                path: routes.appointments.prescriptions.root,
                element: <PrescriptionsLayout />,
                children: [
                  { index: true, element: <PrescriptionsPage /> },
                  {
                    path: routes.byId,
                    element: <PrescriptionLayout />,
                    children: [
                      {
                        index: true,
                        element: <PrescriptionPage />,
                        // errorElement: "💥",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
