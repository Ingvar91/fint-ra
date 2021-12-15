import {createReducer, on} from "@ngrx/store";
import {CurrencyToMany} from "../../models/currency.models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {CurrenciesToManyState} from "../types/actionTypes";
import {
  errorCurrenciesToManyAction,
  getCurrenciesToManyAction,
  setCurrenciesToManyAction,
  upsertCurrenciesToManyAction
} from "../actions/currencies.actions";

export const adapter: EntityAdapter<CurrencyToMany> = createEntityAdapter<CurrencyToMany>();

const initialState: CurrenciesToManyState = adapter.getInitialState({
  isLoading: false,
  isError: false,
  currencyToMany: [],
  current: null
});

const _currenciesToManyReducer = createReducer(
  initialState,
  on(getCurrenciesToManyAction, (state): CurrenciesToManyState => ({
    ...state,
    isLoading: true,
    isError: false,
    current: null
  })),
  on(setCurrenciesToManyAction, (state, { currencyToMany }): CurrenciesToManyState => ({
    ...state,
    isLoading: false,
    isError: false,
    current: currencyToMany
  })),
  on(upsertCurrenciesToManyAction, (state, { currencyToMany }): CurrenciesToManyState => {
    return ({
      ...adapter.upsertOne(currencyToMany, state),
      isLoading: false,
      isError: false,
      current: currencyToMany
    });
  }),
  on(
    errorCurrenciesToManyAction,
    (state): CurrenciesToManyState => ({
      ...state,
      isError: true,
      isLoading: false,
      current: null
    })
  ),
);

export function currenciesToManyReducer(state: any, action: any) {
  return _currenciesToManyReducer(state, action);
}


