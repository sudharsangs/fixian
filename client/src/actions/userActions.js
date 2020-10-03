import axios from "axios";

export const heartStore = id => {
  return axios
    .post(`/api/stores/${id}/heart`)
    .then(({ data }) => {
      return "Done";
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};
