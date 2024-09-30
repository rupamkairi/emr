export const api = "http://localhost:10000";
export const apis = {
  authLogin: `${api}/auth/login`,
  authMe: `${api}/auth/me`,

  facilities: `${api}/facilities`,
  facilityById: (facilityId: string) => `${api}/facilities/${facilityId}`,
  facility: {
    subFacilities: (facilityId: string) =>
      `${api}/facilities/${facilityId}/sub-facilities`,
  },
};
