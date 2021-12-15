import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {CurrencyConverterService} from "../../services/currency-converter.service";
import {CurrencyActionTypes} from "../types/actionTypes";
import {of} from "rxjs";
import {
  errorCurrenciesAction,
  errorCurrenciesToManyAction,
  errorCurrencyPairAction,
  setCurrenciesToManyAction,
  setCurrencyPairAction,
  upsertCurrencies,
  upsertCurrenciesToManyAction,
  upsertCurrencyPairAction
} from "../actions/currencies.actions";
import {Currency, CurrencyPair, CurrencyToMany} from "../../models/currency.models";
import {selectCurrenciesToMany} from "../selectors/currenciesToMany.selector";
import {selectCurrencies} from "../selectors/currencies.selector";
import {selectCurrencyPairs} from "../selectors/currencyPairs.selector";

@Injectable()
export class CurrenciesEffects {

  constructor (
    private actions$: Actions,
    private currencyConverterService: CurrencyConverterService,
    private store: Store,
  ) {}

  currencies$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActionTypes.GET_CURRENCIES),
    switchMap ((data) =>
      {
        return this.currencyConverterService.getAllCurrencies().pipe(
          map((items) => {
            const currencies: Currency[] = [];
            let index = 0;
            for (const item in items) {
              index++;
              currencies.push(new Currency({
                id: index,
                code: item,
                name: items[item]
              }));
            }
            return upsertCurrencies({currencies})
          }),
          catchError(() => of(errorCurrenciesAction())))
      }
    ))
  );

  currenciesToMany$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActionTypes.GET_CURRENCIES_TO_MANY),
    concatLatestFrom(() => this.store.select(selectCurrenciesToMany)),
    switchMap (([{code}, currenciesToMany = []]) =>
      {
        const currencyToMany = currenciesToMany.find(f => f.code === code);
        if (currencyToMany) {
          // Если в хранилище уже есть базовая валюта, то устанавливаем как текущую
          return of(setCurrenciesToManyAction({currencyToMany}));
        }
        return this.currencyConverterService.getCurrenciesToMany(code).pipe(
          map((items) => {
            let index = 0;
            const currencies: Currency[] = [];
            for (const item in items[code]) {
              index++;
              currencies.push(new Currency({
                id: index,
                code: item,
                price: items[code][item]
              }));
            }
            const currencyToMany = new CurrencyToMany();
            currencyToMany.id = currenciesToMany.length + 1;
            currencyToMany.code = code;
            currencyToMany.currencies = currencies;
            return upsertCurrenciesToManyAction({currencyToMany})
          }),
          catchError(() => of(errorCurrenciesToManyAction())))
      }
    ))
  );

  currencyPair$ = createEffect(() => this.actions$.pipe(
    ofType(CurrencyActionTypes.GET_CURRENCY_PAIR),
    concatLatestFrom(() =>
      [
        this.store.select(selectCurrencies),
        this.store.select(selectCurrencyPairs)
      ]
    ),
    switchMap (([{search = ''}, currencies, currencyPairs]) =>
      {
        search = search.toLocaleLowerCase();
        const price = Number(search.match(/\d+/));
        // пытаемся найти коды валют из строки поиска
        const currencyPair = currencies.filter((currency) => search.indexOf(currency.code.toLocaleLowerCase()) !== -1)
        // если есть цена и у нас две найденых валюты
        if (price && currencyPair.length === 2) {
          // сортируем массив что бы понять какая валюта стояла первой в строке поиска
          currencyPair.sort((a, b) => {
            return search.indexOf(a.code) < search.indexOf(b.code) ? -1 : 1;
          });
          const [fromCurrency, toCurrency] = currencyPair;

          const currencyPairExist = currencyPairs.find(f => f.fromCode === fromCurrency.code && f.toCode === toCurrency.code && f.fromPrice === price);
          if (currencyPairExist) {
            // Если в хранилище уже есть такая "валютная пара", то устанавливаем как текущую
            return of(setCurrencyPairAction({currencyPair: currencyPairExist}));
          }
          return this.currencyConverterService.getCurrencyPair(fromCurrency.code, toCurrency.code).pipe(
            map((item) => {
              const currencyPair = new CurrencyPair({
                id: currencyPairs.length + 1,
                fromCode: fromCurrency.code,
                toCode: toCurrency.code,
                fromPrice: price,
                toPrice: Number((price * Number(item[toCurrency.code])).toFixed(2))
              });
              return upsertCurrencyPairAction({currencyPair})
            }),
            catchError(() => of(errorCurrencyPairAction())))
        }
        return of(errorCurrencyPairAction());
      }
    ))
  );

}
