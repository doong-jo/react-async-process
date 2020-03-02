// import { createContext, Dispatch, SetStateAction } from "react";
// import { MainState, MainAction } from "./types";
// import { Product } from "../../apis/product/types";
// import { Reservation } from "../../apis/reservation/types";

// const initialState = {
// 	apiOne: {
// 		responseData: { name: "" },
// 		error: {}
// 	},
// 	apiTwo: {
// 		responseData: { name: "" },
// 		error: {}
// 	}
// };

// const initialAction = {
// 	setApiOneResponse: () => {},
// 	setApiTwoResponse: () => {}
// };

// export const MainStateContext = createContext<MainState<Product, Reservation>>(
// 	initialState
// );

// export const MainActionContext = createContext<{
// 	setApiOneResponse: Dispatch<SetStateAction<MainState<Product, Reservation>>>;
// 	setApiTwoResponse: Dispatch<SetStateAction<MainState<Product, Reservation>>>;
// }>(initialAction);
