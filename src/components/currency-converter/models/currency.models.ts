export class Currency {
  id: number | null;
  code: string;
  name?: string;
  price?: number | null;

  constructor(item?: Currency) {
    this.id = item?.id || null;
    this.code = item?.code.toLocaleLowerCase() || '';
    this.name = item?.name || '';
    this.price = item?.price || null;
  }
}

export class CurrencyToMany {
  id: number | null;
  code: string;
  currencies: Currency[];

  constructor(item?: CurrencyToMany) {
    this.id = item?.id || null;
    this.code = item?.code.toLocaleLowerCase() || '';
    this.currencies = (item?.currencies || []).map(r => new Currency(r));
  }
}

export class CurrencyPair {
  id: number | null;
  fromCode: string;
  toCode: string;
  fromPrice: number | null;
  toPrice: number | null;

  constructor(item?: CurrencyPair) {
    this.id = item?.id || null;
    this.fromCode = item?.fromCode.toLocaleLowerCase() || '';
    this.toCode = item?.toCode.toLocaleLowerCase() || '';
    this.fromPrice = item?.fromPrice || null;
    this.toPrice = item?.toPrice || null;
  }
}
