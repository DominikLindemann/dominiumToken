export interface ICoinmarketCurrency {
    id: string;
    symbol: string;
    name: string;
    localization: ICoinmarketCurrecyAssociativeArray<string>;
    image: ICoinmarketCurrecyAssociativeArray<string>;
    coingecko_score: number;
    market_data: ICoinmarketCurrencyMarketData;
    community_data: ICoinmarketCurrecyAssociativeArray<number>;
    developer_data: ICoinmarketCurrecyAssociativeArray<number>;
    public_interest_stats: ICoinmarketCurrecyAssociativeArray<number>
    last_updated: Date;
    market_cap_rank: number;
  }
  
  export interface ICoinmarketCurrencyMarketData {
    current_price: ICoinmarketCurrecyAssociativeArray<number>;
    market_cap: ICoinmarketCurrecyAssociativeArray<number>;
    total_volume: ICoinmarketCurrecyAssociativeArray<number>;
    high_24h: ICoinmarketCurrecyAssociativeArray<number>;
    low_24h: ICoinmarketCurrecyAssociativeArray<number>;
    price_change_24h: number;
    price_change_percentage_24h: string;
    price_change_percentage_7d: string;
    price_change_percentage_14d: string;
    price_change_percentage_30d: string;
    price_change_percentage_60d: string;
    price_change_percentage_200d: string;
    price_change_percentage_1y: string;
    market_cap_change_24h: string;
    market_cap_change_percentage_24h: string;
    circulating_supply: string;
  }
  
  export interface ICoinmarketCurrecyAssociativeArray<T> {
    [key: string]: T;
  }
  