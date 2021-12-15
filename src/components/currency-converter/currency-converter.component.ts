import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CurrencyConverterService} from "./services/currency-converter.service";
import {BehaviorSubject, debounceTime, Observable, Subject, take, takeUntil} from "rxjs";
import {Currency, CurrencyPair, CurrencyToMany} from "./models/currency.models";
import {select, Store} from "@ngrx/store";
import {
  getCurrenciesAction,
  getCurrenciesToManyAction,
  getCurrencyPairAction
} from "./store/actions/currencies.actions";
import {selectCurrencies} from "./store/selectors/currencies.selector";
import {selectCurrencyToMany} from "./store/selectors/currenciesToMany.selector";
import {MatOptionSelectionChange} from "@angular/material/core/option/option";
import {selectCurrencyPair} from "./store/selectors/currencyPairs.selector";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent implements OnInit {

  searchMode = false; // вкл/вкл поиск
  currencies$: Observable<Currency[]>; // список валют в dropdown
  currencyPair$: Observable<CurrencyPair>; // "валютная пара" отображаем после результатов поиска, если что-нибудь нашли
  currencyToMany$: Observable<CurrencyToMany>; // базовая валюта и список цен остальных валют по отношению к ней
  searchValue$ = new BehaviorSubject<string>(''); // содержит текст поиска
  destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {}

  onSelectCurrency(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      const code = event.source.value;
      this.store.dispatch(getCurrenciesToManyAction({code}));
    }
  }

  ngOnInit(): void {
    this.currencyPair$ = this.store.pipe(select(selectCurrencyPair));
    this.currencies$ = this.store.pipe(select(selectCurrencies));
    this.currencyToMany$ = this.store.pipe(select(selectCurrencyToMany));

    this.store.dispatch(getCurrenciesAction());

    this.searchValue$.pipe(debounceTime(350), takeUntil(this.destroy$)).subscribe((search: string) => {
      this.store.dispatch(getCurrencyPairAction({search}));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
