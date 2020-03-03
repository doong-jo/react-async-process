import React, { useReducer, createContext, Dispatch } from 'react';
import { MainState, MainAction, MainReducer } from './types';
import { DefaultProduct } from '../../apis/product/types';
import { DefaultReservation } from '../../apis/reservation/types';
import mainReducer from './reducer';

const initialState = {
  product: DefaultProduct,
  reservation: DefaultReservation
};

const initialAction = () => {
  /* initial */
};

export const MainStateContext = createContext<MainState>(initialState);
export const MainActionContext = createContext<Dispatch<MainAction>>(
  initialAction
);

export default function MainContext({
  children
}: {
  children: React.ReactElement;
}) {
  const [mainState, mainDispatcher] = useReducer<MainReducer>(
    mainReducer,
    initialState
  );

  return (
    <MainStateContext.Provider value={mainState}>
      <MainActionContext.Provider value={mainDispatcher}>
        {children}
      </MainActionContext.Provider>
    </MainStateContext.Provider>
  );
}
