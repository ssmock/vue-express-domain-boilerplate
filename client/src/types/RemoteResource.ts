import { ClientError, ClientErrors } from "./ClientError"

export type RemoteResource<T> = {
  data: T | null;
  error: ClientError | null;
  pending: boolean;
  updatedAt: Date | null;
}

const getTimestamp = () => new Date();

export const RemoteResources = {
  fresh<T>(): RemoteResource<T> {
    return {
      data: null,
      error: null,
      pending: false,
      updatedAt: null
    }
  },

  startRequest<T>(target: RemoteResource<T>): RemoteResource<T> {
    return {
      ...target,
      pending: true
    }
  },

  withData<T>(target: RemoteResource<T>, data: T): RemoteResource<T> {
    return {
      ...target,
      pending: false,
      error: null,
      updatedAt: getTimestamp(),
      data
    }
  },

  withClientError<T>(target: RemoteResource<T>, error: ClientError) {
    return {
      ...target,
      pending: false,
      data: null,
      updatedAt: getTimestamp(),
      error
    }
  },

  async withUnknownError<T>(target: RemoteResource<T>, error: any) {
    const clientError = await ClientErrors.fromUnknownError(error);

    return {
      ...target,
      pending: false,
      data: null,
      updatedAt: getTimestamp(),
      error: clientError
    }
  }
}
