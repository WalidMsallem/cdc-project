const intialState = [];

const messagesReducers = (state = intialState, action) => {
  if (action.type === "GET_MESSAGES") {
    return action.payload;
  }
  return state;
};
export default messagesReducers;
