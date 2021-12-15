import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CurrencyPair} from "../../models/currency.models";
import {CurrencyPairsState} from "../types/actionTypes";

const currencyPair = createFeatureSelector<CurrencyPairsState>('currencyPairs')

export const selectCurrencyPair = createSelector(
  currencyPair,
  (state: CurrencyPairsState) => <CurrencyPair>state?.current
);

export const selectCurrencyPairs = createSelector(
  currencyPair,
  (state: CurrencyPairsState) => <CurrencyPair[]>Object.values(state?.entities || [])
);


