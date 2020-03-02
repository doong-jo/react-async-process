import { AxiosResponse } from "axios";
import { useReducer, useEffect, Dispatch } from "react";

type ResponseData<T> =
	| (T & { code?: string })
	| (AxiosResponse<any> & { code?: string });

type Handlers<T> = (responseData: ResponseData<T>) => Handler;

interface Handler {
	[key: number]: { [key: string]: () => void };
}

interface HandleProps<T> {
	status: number;
	responseData: ResponseData<T>;
}

interface FetchProps<T> {
	type: "READY" | "REQUEST" | "SUCCESS" | "FAILURE";
	handlers?: Handlers<T>;
	responseData?: T;
	err?: AxiosResponse<any>;
	status?: number;
	body?: any[];
}

interface Reducer<T> {
	(result: FetchProps<T>, action: FetchProps<T>): FetchProps<T>;
}

export const READY = "READY";
export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

function handlerExecutor<T>(
	{ status, responseData }: HandleProps<T>,
	handler: Handlers<T>
): void {
	const handlerMap = handler(responseData);
	const responseCode = responseData.code;
	// const responseCode = "S1001";
	if (handlerMap[status][responseCode]) {
		handlerMap[status][responseCode]();
		return;
	}

	handlerMap[status].default();
}

function reducer<T>(
	result: FetchProps<T>,
	action: FetchProps<T>
): FetchProps<T> {
	const { type, responseData, status, err, handlers } = action;

	switch (type) {
		case REQUEST:
			return { type };
		case SUCCESS:
			handlerExecutor<T>({ status, responseData }, handlers);
			return { type, responseData, status };
		case FAILURE:
			handlerExecutor<T>({ status, responseData: err }, handlers);
			return { type, err, status };
		default:
			return { type };
	}
}

async function fetchData<T>(
	apiRequest: (...args: any[]) => Promise<AxiosResponse<T>>,
	dispatch: Dispatch<FetchProps<T>>,
	body?: any[],
	handlers?: any
): Promise<any> {
	try {
		const { status, data } = body
			? await apiRequest(...body)
			: await apiRequest();
		if (status < 300) {
			dispatch({ type: SUCCESS, responseData: data, status, handlers });
		}
	} catch (err) {
		dispatch({ type: FAILURE, err: err.response, handlers });
	}
}

export default function useAxios<T>(
	apiRequest: (...args: any[]) => Promise<AxiosResponse<T>>,
	handlers: Handlers<T>
): Dispatch<FetchProps<T>> {
	const initialState: FetchProps<T> = {
		type: READY,
		handlers
	};
	const [result, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
	useEffect(() => {
		if (result.type === REQUEST) {
			fetchData<T>(apiRequest, dispatch, result.body, handlers);
		}
	}, [result, apiRequest, handlers]);

	return dispatch;
}
