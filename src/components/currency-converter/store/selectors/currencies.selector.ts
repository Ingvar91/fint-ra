import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Currency} from "../../models/currency.models";
import {CurrenciesState} from "../types/actionTypes";

const currencies = createFeatureSelector<CurrenciesState>('currencies')

export const selectCurrencies = createSelector(
  currencies,
  (state: CurrenciesState) => <Currency[]>Object.values(state?.entities)
);

export const selectCurrenciesLoading = createSelector(
  currencies,
  (state: CurrenciesState) => state.isLoading
);

