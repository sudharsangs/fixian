import {
  GET_STORES,
  GET_STORE,
  CLEAR_STORE,
  STORE_LOADING,
  GET_TAGS
} from "../actions/types";

const initialState = {
  stores: [],
  tags: [],
  store: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case CLEAR_STORE:
      return {
        ...state,
        store: null,
        stores: [],
        loading: false
      };
    case GET_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    case STORE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
