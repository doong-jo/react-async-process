import { Product } from '../../apis/product/types';
import { Reservation } from '../../apis/reservation/types';

export interface MainState {
  product: Product;
  reservation: Reservation;
}

export interface MainAction {
  type: string;
  draftValue: Product | Reservation;
}

export interface MainReducer {
  (state: MainState, action: MainAction): MainState;
}
