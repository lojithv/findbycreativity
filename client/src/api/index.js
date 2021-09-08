import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByUsername = (username) => API.get(`/posts/creator?name=${username}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchService = (id) => API.get(`/services/${id}`);
export const fetchServices = (page) => API.get(`/services?page=${page}`);
export const fetchServicesByUsername = (username) => API.get(`/services/creator?name=${username}`);
export const fetchServicesByCreator = (name) => API.get(`/services/creator?name=${name}`);
export const fetchServicesBySearch = (searchQuery) => API.get(`/services/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createService = (newService) => API.post('/services', newService);
export const likeService = (id) => API.patch(`/services/${id}/likeItem`);
export const commentService = (value, id) => API.post(`/services/${id}/commentItem`, { value });
export const updateService = (id, updatedService) => API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

export const fetchItem = (id) => API.get(`/items/${id}`);
export const fetchItems = (page) => API.get(`/items?page=${page}`);
export const fetchItemsByUsername = (username) => API.get(`/items/creator?name=${username}`);
export const fetchItemsByCreator = (name) => API.get(`/items/creator?name=${name}`);
export const fetchItemsBySearch = (searchQuery) => API.get(`/items/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createItem = (newItem) => API.post('/items', newItem);
export const likeItem = (id) => API.patch(`/items/${id}/likeItem`);
export const commentItem = (value, id) => API.post(`/items/${id}/commentItem`, { value });
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
