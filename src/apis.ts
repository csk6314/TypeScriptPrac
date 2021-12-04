export const fetchCoins = async () => {
    return await fetch("https://api.coinpaprika.com/v1/coins").then(async (res) => {
        return await res.json()
    });
}
export const fetchCoinInfo = async (coinID:string) => {
    const info = await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`).then(async (res) => {
        return await res.json()
    });
    const price = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`).then(async (res) => {
        return await res.json()
    });
    return {info,price};
}