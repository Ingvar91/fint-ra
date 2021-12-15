import {createReducer, on} from "@ngrx/store";
import {Currency} from "../../models/currency.models";
import {createEntityAdapter, EntityAdapter} from "@ngrx/entity";
import {CurrenciesState} from "../types/actionTypes";
import {getCurrenciesAction, errorCurrenciesAction, upsertCurrencies} from "../actions/currencies.actions";

export const adapter: EntityAdapter<Currency> = createEntityAdapter<Currency>();

const initialState: CurrenciesState = adapter.getInitialState({
  isLoading: false,
  isError: false,
  currencies: []
});

const _currenciesReducer = createReducer(
  initialState,
  on(getCurrenciesAction, (state): CurrenciesState => ({
      ...state,
      isLoading: true,
      isError: false,
    })
  ),
  on(upsertCurrencies, (state, { currencies }): CurrenciesState => {
    return ({
      ...adapter.upsertMany(currencies, state),
      isLoading: false,
      isError: false,
    });
  }),
  on(
    errorCurrenciesAction,
    (state): CurrenciesState => ({
      ...state,
      isError: true,
      isLoading: false
    })
  ),
);

export function currenciesReducer(state: any, action: any) {
  return _currenciesReducer(state, action);
}


