//store.js

import { createStore } from "redux";

const FLAG_ON = "FLAG_ON";
const FLAG_OFF = "FLAG_OFF";

const flagOn = () => {
  return {
    type: FLAG_ON,
  };
}

const flagOff = () => {
  return {
    type: FLAG_OFF,
  };
}

const reducer = (state = true, action) => {
  switch (action.type) {
    case FLAG_ON: /* File Upload 성공 */
      return true;
    case FLAG_OFF: /* File Upload 전 */
      return false;
    default:
      return state;
  }
};

/* subscribe */
const store = createStore(reducer);

export const actionCreators = {
  flagOn,
  flagOff
}

export default store;