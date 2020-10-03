import axios from "axios";

import { AUTH_USER, LOGOUT_USER } from "./types";

//Register User
export const registerUser = userData => {
  return axios
    .post("/api/users/register", userData)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

export const loginUser = dataToSubmit => {
  return axios
    .post(`/api/users/login`, dataToSubmit)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

export const auth = () => dispatch => {
  axios
    .get(`/api/users/auth`)
    .then(response => {
      dispatch({
        type: AUTH_USER,
        payload: response.data
      });
    })
    .catch(err => {});
};

export const logoutUser = () => dispatch => {
  axios
    .get(`/api/users/logout`)
    .then(response =>
      dispatch({
        type: LOGOUT_USER
      })
    )
    .catch(err => {});
};

export const updateProfile = profileData => {
  return axios
    .post("/api/users/update_profile", profileData)
    .then(({ data }) => {
      return "Done";
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};
