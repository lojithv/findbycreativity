import { FETCH_ALL_ITEM, FETCH_BY_SEARCH_ITEM, FETCH_BY_CREATOR_ITEM, FETCH_POST_ITEM, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, LIKE_ITEM, COMMENT_ITEM } from '../constants/actionTypes';

export default (state = { isLoading: true, items: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING_ITEM':
      return { ...state, isLoading: true };
    case 'END_LOADING_ITEM':
      return { ...state, isLoading: false };
    case FETCH_ALL_ITEM:
      return {
        ...state,
        items: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH_ITEM:
    case FETCH_BY_CREATOR_ITEM:
      return { ...state, items: action.payload.data };
    case FETCH_POST_ITEM:
      return { ...state, item: action.payload.item };
    case LIKE_ITEM:
      return { ...state, items: state.items.map((item) => (item._id === action.payload._id ? action.payload : item)) };
    case COMMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id == +action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case CREATE_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_ITEM:
      return { ...state, items: state.items.map((item) => (item._id === action.payload._id ? action.payload : item)) };
    case DELETE_ITEM:
      return { ...state, items: state.items.filter((item) => item._id !== action.payload) };
    default:
      return state;
  }
};

