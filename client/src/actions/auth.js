import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error!',
      text: 'Please enter valid email and password',
      icon: 'error'
    })
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error!',
      text: 'Please enter valid details',
      icon: 'error'
    })
  }
};
