import axios from "axios";

export const getMessages = () => dispatch => {
  axios
    .get("/api/contact/all")
    .then(res =>
      dispatch({
        type: "GET_MESSAGES",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: "can t get data"
      })
    );
};

export const postMessage = (data, action) => dispatch => {
  axios
    .post("/api/contact/create", data)
    .then(res => action())
    .then(res => dispatch(clearErrors()))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};
