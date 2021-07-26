import axios from "axios";

export const GET_HOLDINGS_START = "GET_HOLDINGS_START";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";

export const GET_COIN_MARKET_START = "GET_COIN_MARKET_START";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

// Holdings / My Holdings

export const getHoldings =
  (
    holdings = [],
    currency = "usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 10,
    page = 1
  ) =>
  (dispatch) => {
    dispatch({ type: GET_HOLDINGS_START });
    let ids = holdings
      .map((item) => {
        return item.id;
      })
      .join(",");
    let holdingsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;
    return axios({
      url: holdingsUrl,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          let myHoldings = res.data.map((item) => {
            // Retrieve our current holding
            let coin = holdings.find((a) => a.id === item.id);

            // Price from 7 days ago
            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);
            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map(
                  (price) => price * coin.qty
                ),
              },
            };
          });
          dispatch({ type: GET_HOLDINGS_SUCCESS, payload: { myHoldings } });
        } else {
          dispatch({
            type: GET_HOLDINGS_FAILURE,
            paylaod: { error: res.data },
          });
        }
      })
      .catch((error) => {
        dispatch({ type: GET_HOLDINGS_FAILURE, paylaod: { error } });
      });
  };

// Coin Market

export const getCoinMarket =
  (
    currency = "usd",
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 10,
    page = 1
  ) =>
  (dispatch) => {
    dispatch({ type: GET_COIN_MARKET_START });
    let marketUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    return axios({
      url: marketUrl,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_COIN_MARKET_SUCCESS,
            payload: { coins: res.data },
          });
        } else {
          dispatch({
            type: GET_COIN_MARKET_FAILURE,
            payload: { error: res.data },
          });
        }
      })
      .catch((error) =>
        dispatch({ type: GET_COIN_MARKET_FAILURE, payload: { error } })
      );
  };
