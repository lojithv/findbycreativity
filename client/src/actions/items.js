import { START_LOADING_ITEM, END_LOADING_ITEM, FETCH_ALL_ITEM, FETCH_POST_ITEM, FETCH_BY_SEARCH_ITEM, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, LIKE_ITEM, COMMENT_ITEM, FETCH_BY_CREATOR_ITEM, FETCH_BY_USERNAME_ITEM } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ITEM });

    const { data } = await api.fetchItem(id);

    dispatch({ type: FETCH_POST_ITEM, payload: { item: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getItems = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ITEM });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchItems(page);

    dispatch({ type: FETCH_ALL_ITEM , payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const getItemsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ITEM });
    const { data: { data } } = await api.fetchItemsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR_ITEM, payload: { data } });
    dispatch({ type: END_LOADING_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const getItemsByUsername = (username) => async (dispatch) => { return
  try {
    dispatch({ type: START_LOADING_ITEM });
    const { data: { data } } = await api.fetchItemsByCreator(username);

    dispatch({ type: FETCH_BY_USERNAME_ITEM, payload: { data } });
    dispatch({ type: END_LOADING_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ITEM });
    const { data: { data } } = await api.fetchItemsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH_ITEM, payload: { data } });
    dispatch({ type: END_LOADING_ITEM });
  } catch (error) {
    console.log(error);
  }
};

export const createItem = (item, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ITEM });
    const { data } = await api.createItem(item);

    dispatch({ type: CREATE_ITEM, payload: data });

    history.push(`/users/items/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, item);

    dispatch({ type: UPDATE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeItem = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeItem(id, user?.token);

    dispatch({ type: LIKE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentItem = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentItem(value, id);

    dispatch({ type: COMMENT_ITEM, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await await api.deleteItem(id);

    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (error) {
    console.log(error);
  }
};
