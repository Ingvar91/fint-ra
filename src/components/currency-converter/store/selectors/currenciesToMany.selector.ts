import {createFeatureSelector, createSelector} from "@ngrx/store";
import { CurrencyToMany} from "../../models/currency.models";
import { CurrenciesToManyState} from "../types/actionTypes";

const currenciesToMany = createFeatureSelector<CurrenciesToManyState>('currenciesToMany')

export const selectCurrenciesToMany = createSelector(
  currenciesToMany,
  (state: CurrenciesToManyState) => <CurrencyToMany[]>Object.values(state?.entities || [])
);

export const selectCurrencyToMany = createSelector(
  currenciesToMany,
  (state: CurrenciesToManyState) => <CurrencyToMany>state?.current
);

export const selectCurrenciesLoading = createSelector(
  currenciesToMany,
  (state: CurrenciesToManyState) => state.isLoading
);

