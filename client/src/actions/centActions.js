import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PERSONS,
  PERSONS_LOADING,
  DELETE_PERSONS
} from "./types";

// Add Post
export const addPerson = (projectData, action) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/collaborater/create", projectData)

    .then(res => dispatch(getPersons()))
    .then(res => action())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// update post

export const updatePerson = (id, projectData, action) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/collaborater/update/${id}`, projectData)
    .then(res => action())
    .then(res => dispatch(getPersons()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//* end **/
// Get Posts
export const getPersons = () => dispatch => {
  dispatch(setPersonsLoading());
  axios
    .get("/api/collaborater/all")
    .then(res =>
      dispatch({
        type: GET_PERSONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PERSONS,
        payload: []
      })
    );
};

// Delete Post
export const deletePersons = id => dispatch => {
  for (let i = 0; i < id.length; i++) {
    axios
      .delete(`/api/collaborater/${id[i]}`)
      .then(res =>
        dispatch({
          type: DELETE_PERSONS,
          payload: id
        }).then(dispatch(getPersons()))
      )

      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: "error"
        })
      );
  }
  //
};

// Set loading state
export const setPersonsLoading = () => {
  return {
    type: PERSONS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
