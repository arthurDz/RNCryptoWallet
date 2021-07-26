import * as marketActions from "./marketActions";

const initState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initState, action) => {
  switch (action.type) {
    case marketActions.GET_HOLDINGS_START:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
        loading: false,
      };
    case marketActions.GET_HOLDINGS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case marketActions.GET_COIN_MARKET_START:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
        loading: false,
      };
    case marketActions.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default marketReducer;
