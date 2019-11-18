import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_PROJECTS,
  PROJECT_LOADING,
  DELETE_PROJECT
} from "./types";

// Add Post
export const addProject = (projectData, action) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/project/create", projectData)

    .then(res => dispatch(getProjects()))
    .then(res => action())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// update post

export const updateProject = (id, projectData) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/project/update/${id}`, projectData)
    .then(res => dispatch(getProjects()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//* end **/
// Get Posts
export const getProjects = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/project/all")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: []
      })
    );
};

// Delete Post
export const deleteProjects = id => dispatch => {
  for (let i = 0; i < id.length; i++) {
    axios
      .delete(`/api/project/${id[i]}`)
      .then(res =>
        dispatch({
          type: DELETE_PROJECT,
          payload: id
        }).then(dispatch(getProjects()))
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
export const setPostLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
