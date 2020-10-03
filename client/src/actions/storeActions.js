import axios from "axios";

import {
  GET_STORES,
  GET_STORE,
  CLEAR_STORE,
  STORE_LOADING,
  GET_TAGS
} from "./types";

export const getStores = page => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  let url = page ? `/api/stores/page/${page}` : "/api/stores";
  axios
    .get(url)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getStoresByTag = tag => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/tags/${tag}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getStoresByHearts = () => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/hearts`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getTopStores = () => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/top`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getStoresBySearch = searchTerm => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/search?q=${searchTerm}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getStore = id => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/id/${id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORE,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORE,
        payload: null
      });
    });
};

export const getStoreBySlug = slug => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/slug/${slug}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORE,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORE,
        payload: null
      });
    });
};

//Add Store
export const addStore = values => dispatch => {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" }
  };
  for (let key in values) {
    formData.append(key, JSON.stringify(values[key]));
  }
  formData.append("file", values.file);
  return axios
    .post("/api/stores/add", formData, config)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

//Edit Store
export const editStore = (id, values) => dispatch => {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" }
  };
  for (let key in values) {
    formData.append(key, JSON.stringify(values[key]));
  }
  formData.append("file", values.file);
  return axios
    .post(`/api/stores/id/${id}/edit`, formData, config)
    .then(res => {
      return "Done";
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

export const getTags = () => dispatch => {
  dispatch({ type: CLEAR_STORE });
  // dispatch(setStoreLoading());
  axios
    .get(`/api/stores/tags`)
    .then(({ data }) => {
      dispatch({
        type: GET_TAGS,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_TAGS,
        payload: []
      });
    });
};

export const reviewStore = (id, data) => {
  return axios
    .post(`/api/stores/add_review/${id}`, data)
    .then(response => {
      return "Done";
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

//Set Loading State
export const setStoreLoading = () => {
  return {
    type: STORE_LOADING
  };
};
