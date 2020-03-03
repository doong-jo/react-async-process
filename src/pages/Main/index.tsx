import React, { useState, useEffect, useContext } from 'react';

import Button from './Button';
import { MainStateContext } from '../../contexts/Main';
import Popup from './Popup';

function Main() {
  const mainState = useContext(MainStateContext);
  const [responseCode, setResponseCode] = useState('no response');

  function updateReservation() {
    if (mainState.reservation.hello !== '') {
      setResponseCode(
        `Reservation API response : S1001 ${JSON.stringify(
          mainState.reservation
        )}`
      );
    }
  }

  useEffect(updateReservation, [mainState]);

  return (
    <div>
      {responseCode}
      <div>
        <Button>start</Button>
        <Popup />
      </div>
    </div>
  );
}

export default Main;
