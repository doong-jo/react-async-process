import { AxiosResponse } from 'axios';

import { mainAxios } from '../../lib/axios';
import { Reservation } from './types';

// proudct의 각 API 명세
// 아래는 mock api임
/*
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=UTF-8
{ "hello": "world" }
*/
export const getReservations = (): Promise<AxiosResponse<Reservation[]>> =>
  mainAxios.get('/v2/5185415ba171ea3a00704eed');
