import type { Facility, Profile, User } from "./base";

export type ResponseBody = {
  message: string;
  error: string;
  data: any;
  [key: string]: any;
};

export type Me = User & {
  ownersOf: Facility[];
};

export type People = User & {
  profile?: Profile;
};
