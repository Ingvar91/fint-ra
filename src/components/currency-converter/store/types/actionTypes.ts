import {EntityState} from "@ngrx/entity";
import {Currency, CurrencyPair, CurrencyToMany} from "../../models/currency.models";

export interface CurrenciesState extends EntityState<Currency> {
  isLoading: boolean
  isError: boolean
  currencies: Currency[]
}

export interface CurrenciesToManyState extends EntityState<CurrencyToMany> {
  isLoading: boolean
  isError: boolean
  currencyToMany: CurrencyToMany[]
  current: CurrencyToMany | null
}

export interface CurrencyPairsState extends EntityState<CurrencyPair> {
  isLoading: boolean
  isError: boolean
  currencyPairs: CurrencyPair[]
  current: CurrencyPair | null
}

export enum CurrencyActionTypes {
  // CURRENCIES
  UPSERT_CURRENCIES = '[Currencies] Upsert Currencies',
  GET_CURRENCIES = '[Currencies] Get Currencies',
  ERROR_CURRENCIES = '[Currencies] Error Currencies',
  // CURRENCIES TO MANY
  GET_CURRENCIES_TO_MANY = '[Currencies] Get Currencies To Many',
  ERROR_CURRENCIES_TO_MANY = '[Currencies] Error Currencies To Many',
  SET_CURRENCIES_TO_MANY = '[Currencies] Set Currencies To Many',
  UPSERT_CURRENCIES_TO_MANY = '[Currencies] Upsert Currencies To Many',
  // CURRENCY PAIR
  GET_CURRENCY_PAIR = '[Currencies] Get Currency Pair',
  ERROR_CURRENCY_PAIR = '[Currencies] Error Currency Pair',
  SET_CURRENCY_PAIR = '[Currencies] Set Currencies Pair',
  UPSERT_CURRENCY_PAIR = '[Currencies] Upsert Currencies Pair',
}


