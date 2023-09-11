import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type Error = FetchBaseQueryError | SerializedError;

export function getErrorMessage(error: Error) {
  if ("message" in error) {
    return (error as SerializedError).message;
  }

  if ("data" in error) {
    const fetchQueryError = error as FetchBaseQueryError;

    if (fetchQueryError.status === 404) {
      return "Not found";
    }

    if (fetchQueryError.status) {
      const errorMessage =
        "error" in fetchQueryError
          ? fetchQueryError.error
          : JSON.stringify(fetchQueryError.data);

      return errorMessage;
    }
  }

  return "";
}
