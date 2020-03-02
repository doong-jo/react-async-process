import { AxiosResponse } from 'axios';
import { useReducer, useEffect, Dispatch } from 'react';

type ResponseData<T> = T & { code?: string };

type Handlers<T> = (responseData: ResponseData<T>) => Handler;

type Body = string[] | number[];

interface Handler {
  [key: number]: { [key: string]: () => void };
}

interface HandleProps<T> {
  status: number;
  responseData?: ResponseData<T>;
}

interface FetchProps<T> {
  type: 'READY' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  status?: number;
  responseData?: T;
  handlers?: Handlers<T>;
  body?: Body;
}

interface Reducer<T> {
  (result: FetchProps<T>, action: FetchProps<T>): Pick<
    FetchProps<T>,
    'type' | 'handlers' | 'body'
  >;
}

export const READY = 'READY';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

function handlerExecutor<T>(
  { status, responseData }: HandleProps<T>,
  handler: Handlers<T>
): void {
  if (responseData) {
    const handlerMap = handler(responseData);
    const responseCode = responseData.code;
    // const responseCode = "S1001";
    if (responseCode && handlerMap[status][responseCode]) {
      handlerMap[status][responseCode]();
      return;
    }

    handlerMap[status].default();
  }
}

function reducer<T>(result: FetchProps<T>, action: FetchProps<T>) {
  const { type, responseData, status, handlers } = action;

  if (handlers && status) {
    switch (type) {
      case REQUEST:
        handlerExecutor<T>({ status, responseData }, handlers);
        break;

      case SUCCESS:
      case FAILURE:
        handlerExecutor<T>({ status, responseData }, handlers);
        break;

      default:
        break;
    }
  }

  return { type };
}

async function fetchData<T>(
  apiRequest: (...args: Body) => Promise<AxiosResponse<T>>,
  dispatch: Dispatch<FetchProps<T>>,
  handlers: Handlers<T>,
  body?: Body
) {
  try {
    const { status, data } = body
      ? await apiRequest(...body)
      : await apiRequest();
    if (status < 300) {
      dispatch({ type: SUCCESS, responseData: data, status, handlers });
    }
  } catch (err) {
    dispatch({
      type: FAILURE,
      responseData: err.response.data,
      status: err.response.status,
      handlers
    });
  }
}

export default function useAxios<T>(
  apiRequest: (...args: Body) => Promise<AxiosResponse<T>>,
  handlers: Handlers<T>
): Dispatch<FetchProps<T>> {
  const initialState: FetchProps<T> = {
    type: READY,
    status: 0
  };
  const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
  useEffect(() => {
    if (result.type === REQUEST) {
      fetchData<T>(apiRequest, dispatch, handlers, result.body || []);
    }
    // tslint:disable-next-line: align
  }, [apiRequest, result, handlers]);

  return dispatch;
}
