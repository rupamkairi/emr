import { createBrowserRouter } from "react-router-dom";
import { routes } from "./constants/routes";
import AppointmentLayout from "./layouts/Appointment";
import AppointmentsLayout from "./layouts/Appointments";
import AuthLayout from "./layouts/auth/Auth";
import DashboardLayout from "./layouts/Dashboard";
import FacilitiesLayout from "./layouts/Facilities";
import FacilityLayout from "./layouts/Facility";
import PeopleLayout from "./layouts/People";
import PersonLayout from "./layouts/Person";
import PrescriptionLayout from "./layouts/Prescription";
import PrescriptionsLayout from "./layouts/Prescriptions";
import AppointmentPage from "./pages/Appointment";
import AppointmentsPage from "./pages/Appointments";
import LoginPage from "./pages/auth/Login";
import DashboardPage from "./pages/Dashboard";
import FacilitiesPage from "./pages/Facilities";
import FacilityPage from "./pages/Facility";
import PeoplePage from "./pages/People";
import PersonPage from "./pages/Person";
import PrescriptionPage from "./pages/Prescription";
import PrescriptionsPage from "./pages/Prescriptions";

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
        path: routes.facilities.root,
        element: <FacilitiesLayout />,
        children: [
          { index: true, element: <FacilitiesPage /> },
          {
            path: routes.byId,
            element: <FacilityLayout />,
            children: [{ index: true, element: <FacilityPage /> }],
          },
        ],
      },
      {
        path: routes.people.root,
        element: <PeopleLayout />,
        children: [
          { index: true, element: <PeoplePage /> },
          {
            path: routes.byId,
            element: <PersonLayout />,
            children: [{ index: true, element: <PersonPage /> }],
          },
        ],
      },
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
