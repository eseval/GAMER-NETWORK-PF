import axios from "axios";
import { POST_USER, GET_USERS, GET_USERS_BY_ID, USERS_LOADING, USER_LOADING, GET_ALL_NEWS, ALL_NEWS_LOADING, GET_NEWS_BY_ID, NEWS_LOADING, GET_USER_BY_EMAIL } from "./types";

const USERS_URL = 'https://pf-henry-gamesportal.herokuapp.com/users';
const NEWS_URL = 'https://pf-henry-gamesportal.herokuapp.com/news';

export function postUser(data) {
  return async function (dispatch) {
    try {
      await axios.post(USERS_URL, data);
      return dispatch({ type: POST_USER })
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      let json = await axios.get(USERS_URL);
      return (
        dispatch({type: USERS_LOADING}),
        dispatch({type: GET_USERS, payload: json.data})
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${USERS_URL}/${id}`);
      return (
        dispatch({type: USER_LOADING}),
        dispatch({type: GET_USERS_BY_ID, payload: json.data})
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${USERS_URL}?email=${email}`)
      return dispatch({type: GET_USER_BY_EMAIL, payload: json.data})
    } catch (error) {
    console.log(error)
    }
  }
}

export function getAllNews() {
  return async function (dispatch) {
    try {
      let json = await axios.get(NEWS_URL);
      return (
        dispatch({type: ALL_NEWS_LOADING}),
        dispatch({type: GET_ALL_NEWS, payload: json.data})
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNewsById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${NEWS_URL}/${id}`);
      return (
        dispatch({type: NEWS_LOADING}),
        dispatch({type: GET_NEWS_BY_ID, payload: json.data})
      );
    } catch (error) {
      console.log(error);
    }
  };
}