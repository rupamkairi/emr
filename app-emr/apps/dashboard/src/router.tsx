import { createBrowserRouter } from "react-router-dom";
import {
  AppointmentHome,
  AppointmentLayout,
  AppointmentsHome,
  AppointmentsLayout,
  Home,
  Layout,
  PrescriptionHome,
  PrescriptionLayout,
  PrescriptionsHome,
  PrescriptionsLayout,
} from "./App";
import { routes } from "./constants/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: routes.appointments.root,
        element: <AppointmentsLayout />,
        children: [
          { index: true, element: <AppointmentsHome /> },
          {
            path: routes.byId,
            element: <AppointmentLayout />,
            children: [
              { index: true, element: <AppointmentHome /> },
              {
                path: routes.appointments.prescriptions.root,
                element: <PrescriptionsLayout />,
                children: [
                  { index: true, element: <PrescriptionsHome /> },
                  {
                    path: routes.byId,
                    element: <PrescriptionLayout />,
                    children: [{ index: true, element: <PrescriptionHome /> }],
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
