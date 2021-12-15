import {createAction, props} from '@ngrx/store';
import { CurrencyActionTypes} from "../types/actionTypes";
import {Currency, CurrencyPair, CurrencyToMany} from "../../models/currency.models";

// CURRENCIES
export const getCurrenciesAction = createAction(CurrencyActionTypes.GET_CURRENCIES)
export const errorCurrenciesAction = createAction(
  CurrencyActionTypes.ERROR_CURRENCIES
)
export const upsertCurrencies = createAction(
  CurrencyActionTypes.UPSERT_CURRENCIES,
  props<{ currencies: Currency[] }>());

// CURRENCIES TO MANY
export const getCurrenciesToManyAction = createAction(
  CurrencyActionTypes.GET_CURRENCIES_TO_MANY,
  props<{ code: string }>()
);
export const errorCurrenciesToManyAction = createAction(
  CurrencyActionTypes.ERROR_CURRENCIES_TO_MANY
)
export const setCurrenciesToManyAction = createAction(
  CurrencyActionTypes.SET_CURRENCIES_TO_MANY,
  props<{ currencyToMany: CurrencyToMany }>()
)
export const upsertCurrenciesToManyAction = createAction(
  CurrencyActionTypes.UPSERT_CURRENCIES_TO_MANY,
  props<{ currencyToMany: CurrencyToMany }>());

// CURRENCY PAIR
export const getCurrencyPairAction = createAction(
  CurrencyActionTypes.GET_CURRENCY_PAIR,
  props<{ search: string }>()
)
export const errorCurrencyPairAction = createAction(
  CurrencyActionTypes.ERROR_CURRENCY_PAIR
)
export const setCurrencyPairAction = createAction(
  CurrencyActionTypes.SET_CURRENCY_PAIR,
  props<{ currencyPair: CurrencyPair }>()
)
export const upsertCurrencyPairAction = createAction(
  CurrencyActionTypes.UPSERT_CURRENCY_PAIR,
  props<{ currencyPair: CurrencyPair }>());
