import React, { useState } from 'react';

import { getProducts } from '../../apis/product';
import { getReservations } from '../../apis/reservation';
import { S1001, ER1001 } from '../../apis/product/code';
import { Product } from '../../apis/product/types';
import { Reservation } from '../../apis/reservation/types';
import useAxios, { REQUEST } from '../../hooks/useAxios';

function Main() {
  const [responseCode, setResponseCode] = useState('no response');

  const handlerGetProducts = (responseData: Product[]) => ({
    200: {
      default: () => {
        showPopup(responseData);
      },
      // if custom response code exists
      [S1001]: () => {
        showPopup(responseData);
      }
    },
    500: {
      default: () => {
        showPopup(responseData);
      }
    }
  });

  const handlerGetReservations = (responseData: Reservation[]) => ({
    200: {
      default: () => {
        setResponseCode(
          `Reservation API response : S1001 ${JSON.stringify(responseData)}`
        );
      }
    },
    500: {
      default: () => {
        setResponseCode(`Reservation API response : ER1001 ${responseData}`);
      },
      // if custom response code exists
      [ER1001]: () => {
        setResponseCode(`Reservation API response : ER1001 ${responseData}`);
      }
    }
  });

  const requestProduct = useAxios(getProducts, handlerGetProducts);
  const requestReservation = useAxios(getReservations, handlerGetReservations);

  function handleButtonOnClick() {
    requestProduct({ type: REQUEST });
  }

  function showPopup(responseData: Product[]) {
    const confirmResult = confirm(
      `Product API Response: ${JSON.stringify(responseData)}`
    );
    if (confirmResult) {
      requestReservation({ type: REQUEST });
    }
  }

  return (
    <div>
      {responseCode}
      <div>
        <button onClick={handleButtonOnClick}>start</button>
      </div>
    </div>
  );
}

export default Main;
