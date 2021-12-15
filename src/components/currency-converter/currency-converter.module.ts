import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyConverterComponent} from './currency-converter.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {CurrencyConverterService} from "./services/currency-converter.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {CurrenciesEffects} from "./store/effects/currencies.effects";
import {currenciesReducer} from "./store/reducers/currencies.reducer";
import {MatSelectModule} from "@angular/material/select";
import {currenciesToManyReducer} from "./store/reducers/currenciesToMany.reducer";
import {currencyPairsReducer} from "./store/reducers/currenciesPairs.reducer";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    CurrencyConverterComponent
  ],
  exports: [
    CurrencyConverterComponent
  ],
  providers: [
    CurrencyConverterService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    EffectsModule.forFeature([CurrenciesEffects]),
    StoreModule.forFeature('currencies', currenciesReducer),
    StoreModule.forFeature('currenciesToMany', currenciesToManyReducer),
    StoreModule.forFeature('currencyPairs', currencyPairsReducer),
    MatSelectModule,
    MatSlideToggleModule,
  ]
})
export class CurrencyConverterModule { }
