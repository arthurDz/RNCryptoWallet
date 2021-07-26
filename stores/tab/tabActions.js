export const SET_TRADE_MODAL_VISIBILITY = "SET_TRADE_MODAL_VISIBILITY";

export const setTradeModalVisibility = (isVisible) => (dispatch) => {
  dispatch({ type: SET_TRADE_MODAL_VISIBILITY, payload: { isVisible } });
};

// Another way to create actions by creating different dispatch function
// export const setTradeModalVisibilitySuccess = (isVisible) => ({
//   type: SET_TRADE_MODAL_VISIBILITY,
//   payload: isVisible,
// });

// export function setTradeModalVisibility(isVisible) {
//   return (dispatch) => {
//     dispatch(setTradeModalVisibilitySuccess(isVisible));
//   };
// }
