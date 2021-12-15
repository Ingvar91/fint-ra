import {createReducer, on} from "@ngrx/store";
import {CurrencyPair} from "../../models/currency.models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {
  errorCurrencyPairAction,
  getCurrencyPairAction,
  setCurrencyPairAction,
  upsertCurrencyPairAction
} from "../actions/currencies.actions";
import {CurrencyPairsState} from "../types/actionTypes";

export const adapter: EntityAdapter<CurrencyPair> = createEntityAdapter<CurrencyPair>();

const initialState: CurrencyPairsState = adapter.getInitialState({
  isLoading: false,
  isError: false,
  currencyPairs: [],
  current: null
});

const _currencyPairsReducer = createReducer(
  initialState,
  on(getCurrencyPairAction, (state): CurrencyPairsState => ({
    ...state,
    isLoading: true,
    isError: false,
    current: null,
  })),
  on(setCurrencyPairAction, (state, { currencyPair }): CurrencyPairsState => {
    return ({
      ...state,
      isLoading: false,
      isError: false,
      current: currencyPair,
    })
  }),
  on(upsertCurrencyPairAction, (state, { currencyPair }): CurrencyPairsState => {
    return ({
      ...adapter.upsertOne(currencyPair, state),
      isLoading: false,
      isError: false,
      current: currencyPair,
    });
  }),
  on(errorCurrencyPairAction,
    (state): CurrencyPairsState => ({
      ...state,
      isError: true,
      isLoading: false,
      current: null,
    })),
);

export function currencyPairsReducer(state: any, action: any) {
  return _currencyPairsReducer(state, action);
}


