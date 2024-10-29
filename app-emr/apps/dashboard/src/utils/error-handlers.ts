import { HTTPError } from "ky";

export function handleErrorResponse(error: any) {
  if (error instanceof String) console.log(error);
  if (error instanceof HTTPError) {
    console.log(error.response);
  }
}
