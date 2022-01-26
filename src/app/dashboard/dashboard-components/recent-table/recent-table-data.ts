// export interface LatestData {
//     id: number;
//     Name: string;
//     Status: string;
//     Date: Date;
//     Price: number
// }
export interface LatestData {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {};
    sortedRatesValues: string[];
}

export const LatestDatas: LatestData[] = [
    {
        "success": true,
        "timestamp": 164301467,
        "base": "EUR",
        "date": "2022-01-25",
        "rates": {
            "PLN": 4.528975,
            "USD": 1.15,
        },
        "sortedRatesValues": []
    },
    {
        "success": true,
        "timestamp": 1643014444,
        "base": "EUR",
        "date": "2022-01-24",
        "rates": {
            "PLN": 4.528975,
            "GBP": 1.15,
        },
        "sortedRatesValues": []
    }
]