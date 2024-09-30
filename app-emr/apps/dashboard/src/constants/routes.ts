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

  facilities: {
    root: "facilities",
  },

  appointments: {
    root: "appointments",

    prescriptions: {
      root: "prescriptions",
    },
  },
};
