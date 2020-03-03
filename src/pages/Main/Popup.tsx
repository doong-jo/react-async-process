import React, { useContext, useRef, useEffect, useState } from 'react';
import useAxios, { REQUEST } from '../../hooks/useAxios';
import { getReservations } from '../../apis/reservation';
import { Reservation } from '../../apis/reservation/types';
import { ER1001 } from '../../apis/reservation/code';
import { MainStateContext, MainActionContext } from '../../contexts/Main';
import { SET_RESERVATION } from '../../contexts/Main/action';

function Popup() {
  const mainState = useContext(MainStateContext);
  const mainAction = useContext(MainActionContext);
  const [reservation, setReservation] = useState({ hello: '' });
  const product = useRef({ hello: '' });

  const handlerGetReservations = (responseData: Reservation) => ({
    200: {
      default: () => {
        setReservation(responseData);
      }
    },
    500: {
      default: () => {
        setReservation(responseData);
      },
      // if custom response code exists
      [ER1001]: () => {
        setReservation(responseData);
      }
    }
  });
  const requestReservation = useAxios<Reservation>(
    getReservations,
    handlerGetReservations
  );

  function showPopup() {
    if (mainState.product.hello !== product.current.hello) {
      product.current.hello = mainState.product.hello;
      const confirmResult = confirm(
        `Product API Response: ${JSON.stringify(mainState.product)}`
      );
      if (confirmResult) {
        requestReservation({ type: REQUEST });
      }
    }
  }

  useEffect(showPopup, [mainState]);
  useEffect(() => {
    mainAction({ type: SET_RESERVATION, draftValue: reservation });
    // tslint:disable-next-line: align
  }, [reservation]);

  return <></>;
}

export default Popup;
