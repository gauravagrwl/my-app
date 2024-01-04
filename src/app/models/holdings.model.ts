export interface Holdings {
  id: number;

  instrumentSymbol: string;
  instrumentName: string;
  instrumentType: 'stock' | 'crypto';
  instrumentExchange: string;

  quantity: number;
  purchaseDate: string;
  purchaseRate: number;
}
