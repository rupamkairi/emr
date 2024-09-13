import { createBrowserRouter } from "react-router-dom";
import {
  AppointmentsHome,
  AppointmentsLayout,
  PrescriptionsHome,
  PrescriptionsLayout,
} from "./App";
import { routes } from "./constants/routes";
import AppointmentLayout from "./layouts/Appointment";
import DashboardLayout from "./layouts/Dashboard";
import PrescriptionLayout from "./layouts/Prescription";
import AppointmentPage from "./pages/Appointment";
import DashboardPage from "./pages/Dashboard";
import PrescriptionPage from "./pages/Prescription";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: routes.appointments.root,
        element: <AppointmentsLayout />,
        children: [
          { index: true, element: <AppointmentsHome /> },
          {
            path: routes.byId,
            element: <AppointmentLayout />,
            children: [
              { index: true, element: <AppointmentPage /> },
              {
                path: routes.appointments.prescriptions.root,
                element: <PrescriptionsLayout />,
                children: [
                  { index: true, element: <PrescriptionsHome /> },
                  {
                    path: routes.byId,
                    element: <PrescriptionLayout />,
                    children: [{ index: true, element: <PrescriptionPage /> }],
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
