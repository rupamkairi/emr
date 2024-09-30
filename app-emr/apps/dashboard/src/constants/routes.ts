export const routes = {
  byId: ":id",

  auth: {
    root: "/auth",
    login: "login",
    logout: "logout",
  },

  dashboard: {
    root: "/",
  },

  appointments: {
    root: "appointments",

    prescriptions: {
      root: "prescriptions",
    },
  },
};
