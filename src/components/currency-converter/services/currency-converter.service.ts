import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class CurrencyConverterService {

  constructor(
    public http: HttpClient,
  ) {}

  getAllCurrencies(): Observable<{[key: string]: string}> {
    return this.http.get<{[key: string]: string}>(
      `${environment.baseUrl}currencies.json`
    );
  }

  getCurrenciesToMany(code: string): Observable<{[key: string]: {[key: string]: number}}> {
    return this.http.get<{[key: string]: {[key: string]: number}}>(
      `${environment.baseUrl}currencies/${code.toLocaleLowerCase()}.json`
    );
  }

  getCurrencyPair(fromCurrencyCode: string, toCurrencyCode: string): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(
      `${environment.baseUrl}currencies/${fromCurrencyCode.toLocaleLowerCase()}/${toCurrencyCode.toLocaleLowerCase()}.json`
    );
  }


}
