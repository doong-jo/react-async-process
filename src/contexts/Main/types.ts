import { AxiosResponse } from "axios";

export interface MainState<T, K> {
	apiOne: {
		responseData: T;
		error: AxiosResponse<any>;
	};
	apiTwo: {
		responseData: K;
		error: AxiosResponse<any>;
	};
}

export interface MainAction<T, K> {
	type: string;
	value: MainState<T, K>;
}
