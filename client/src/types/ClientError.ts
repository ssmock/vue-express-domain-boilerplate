import * as Axios from "axios";

export type ClientError = {
  httpStatusCode: number | null;
  code: string;
  message: string;
  baseError: Error;
}

export const ClientErrors = {
  async fromUnknownError(error: any): Promise<ClientError> {
    console.log(error)

    if (error.isAxiosError) {
      const axiosError = error as Axios.AxiosError

      if (axiosError.response) {
        const message = await error.response.text(); // TODO: Do something smarter with the response

        return {
          httpStatusCode: error.response.status,
          code: "UNKNOWN", // TODO: Get a domain error code if available
          message,
          baseError: error
        }
      }
      else if (axiosError.request) {
        return {
          httpStatusCode: null,
          code: "NO_RESPONSE", // TODO: Get a domain error code if available
          message: axiosError.message,
          baseError: error
        }
      }
      else {
        return {
          httpStatusCode: null,
          code: "UNKNOWN", // TODO: Get a domain error code if available
          message: axiosError.message,
          baseError: error
        }
      }
    }
    
    return {
      httpStatusCode: null,
      code: error.code || "UNKNOWN", // TODO: Use a domain error code
      message: error.message || "Unknown error",
      baseError: error as Error
    };
  }
}
