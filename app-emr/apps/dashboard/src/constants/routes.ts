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

  people: {
    root: "people",
  },

  appointments: {
    root: "appointments",

    prescriptions: {
      root: "prescriptions",
    },
  },
};
