import { START_LOADING_SERVICE, END_LOADING_SERVICE, FETCH_ALL_SERVICE, FETCH_SERVICE, FETCH_BY_SEARCH_SERVICE, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE, LIKE_SERVICE, COMMENT_SERVICE, FETCH_BY_CREATOR_SERVICE, FETCH_BY_USERNAME_SERVICE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getService = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_SERVICE });

    const { data } = await api.fetchService(id);

    dispatch({ type: FETCH_SERVICE, payload: { service: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getServices = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_SERVICE });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchService(page);

    dispatch({ type: FETCH_ALL_SERVICE, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_SERVICE });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_SERVICE });
    const { data: { data } } = await api.fetchServicesByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR_SERVICE, payload: { data } });
    dispatch({ type: END_LOADING_SERVICE });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByUsername = (username) => async (dispatch) => { return
  try {
    dispatch({ type: START_LOADING_SERVICE });
    const { data: { data } } = await api.fetchServicesByCreator(username);

    dispatch({ type: FETCH_BY_USERNAME_SERVICE, payload: { data } });
    dispatch({ type: END_LOADING_SERVICE });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_SERVICE });
    const { data: { data } } = await api.fetchServicesBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH_SERVICE, payload: { data } });
    dispatch({ type: END_LOADING_SERVICE });
  } catch (error) {
    console.log(error);
  }
};

export const createService = (service, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_SERVICE });
    const { data } = await api.createService(service);

    dispatch({ type: CREATE_SERVICE, payload: data });

    history.push(`/users/services/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateService = (id, service) => async (dispatch) => {
  try {
    const { data } = await api.updateService(id, service);

    dispatch({ type: UPDATE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeService = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeService(id, user?.token);

    dispatch({ type: LIKE_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentService = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentService(value, id);

    dispatch({ type: COMMENT_SERVICE, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    await await api.deleteService(id);

    dispatch({ type: DELETE_SERVICE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
