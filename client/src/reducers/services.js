import { FETCH_ALL_SERVICE, FETCH_BY_SEARCH_SERVICE, FETCH_BY_CREATOR_SERVICE, FETCH_SERVICE, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE, LIKE_SERVICE, COMMENT_SERVICE } from '../constants/actionTypes';

export default (state = { isLoading: true, services: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING_SERVICE':
      return { ...state, isLoading: true };
    case 'END_LOADING_SERVICE':
      return { ...state, isLoading: false };
    case FETCH_ALL_SERVICE:
      return {
        ...state,
        services: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH_SERVICE:
    case FETCH_BY_CREATOR_SERVICE:
      return { ...state, services: action.payload.data };
    case FETCH_SERVICE:
      return { ...state, service: action.payload.service };
    case LIKE_SERVICE:
      return { ...state, services: state.services.map((service) => (service._id === action.payload._id ? action.payload : service)) };
    case COMMENT_SERVICE:
      return {
        ...state,
        services: state.services.map((service) => {
          if (service._id == +action.payload._id) {
            return action.payload;
          }
          return service;
        }),
      };
    case CREATE_SERVICE:
      return { ...state, services: [...state.services, action.payload] };
    case UPDATE_SERVICE:
      return { ...state, services: state.services.map((service) => (service._id === action.payload._id ? action.payload : service)) };
    case DELETE_SERVICE:
      return { ...state, services: state.services.filter((service) => service._id !== action.payload) };
    default:
      return state;
  }
};

