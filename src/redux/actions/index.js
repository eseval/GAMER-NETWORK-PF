import axios from "axios";
import {
  GET_ALL_NEWS,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_TITLE,
  GET_USER_BY_EMAIL,
  GET_USERS,
  GET_USERS_BY_ID,
  POST_USER,
  SEARCH_NEWS_BY_TITLE,
  ORDER_NEWS_BY_TITLE,
  POST_FORUM,
  GET_REWARDS,
  CLAIM_REWARDS,
  GET_GAMES,
  GET_REWARDS_BY_ID,
  CONTAINER_POSTS,
  EDIT_POST,
} from "./types";

const USERS_URL = "https://pf-henry-gamesportal.herokuapp.com/users";
const NEWS_URL = "https://pf-henry-gamesportal.herokuapp.com/news";
const FORUM_URL = "https://pf-henry-gamesportal.herokuapp.com/forum";
const REWARDS_URL = "https://pf-henry-gamesportal.herokuapp.com/reward";
const GAMES_URL = "https://pf-henry-gamesportal.herokuapp.com/games";

export function postUser(data) {
  return async function (dispatch) {
    try {
      await axios.post(USERS_URL, data);
      return dispatch({ type: POST_USER });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      let json = await axios.get(USERS_URL);
      return dispatch({ type: GET_USERS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${USERS_URL}/${id}`);
      return dispatch({ type: GET_USERS_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${USERS_URL}?email=${email}`);
      window.localStorage.setItem("userLogged", JSON.stringify(json.data[0]));
      return dispatch({ type: GET_USER_BY_EMAIL, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllNews() {
  return async function (dispatch) {
    try {
      let json = await axios.get(NEWS_URL);
      return dispatch({ type: GET_ALL_NEWS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNewsById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${NEWS_URL}/${id}`);
      return dispatch({ type: GET_NEWS_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNewsByTitle(title) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${NEWS_URL}?title=${title}`);
      return dispatch({
        type: GET_NEWS_BY_TITLE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchBarsearch(payload) {
  return async function (dispatch) {
    try {
      console.log(payload);
      const json = await axios.get(`${NEWS_URL}?title=${payload}`);
      console.log(json);
      return dispatch({
        type: SEARCH_NEWS_BY_TITLE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderNewsByTitle(payload) {
  return {
    type: ORDER_NEWS_BY_TITLE,
    payload,
  };
}

export function postForum(payload) {
  return async function (dispatch) {
    try {
      await axios.post(FORUM_URL, payload);
      return dispatch({ type: POST_FORUM });
    } catch (error) {
      console.log(error);
    }
  };
}

export function claimRewards(data, id, price) {
  return async function (dispatch) {
    try {
      let newDataUser = await axios.get(
        `https://pf-henry-gamesportal.herokuapp.com/users/${id}`
      );
      if (newDataUser.data.coins > price) {
        await axios.put(`${USERS_URL}/${id}`, data);
        newDataUser = await axios.get(
          `https://pf-henry-gamesportal.herokuapp.com/users/${id}`
        );
        window.localStorage.setItem(
          "userLogged",
          JSON.stringify(newDataUser.data)
        );
      } else {
        return alert("insuficient founds");
      }
      return dispatch({ type: CLAIM_REWARDS });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRewards() {
  return async function (dispatch) {
    try {
      const json = await axios.get(REWARDS_URL);
      return dispatch({ type: GET_REWARDS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRewardsById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${REWARDS_URL}/${id}`);
      return dispatch({ type: GET_REWARDS_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGames() {
  return async function (dispatch) {
    try {
      let json = await axios.get(GAMES_URL);
      return dispatch({ type: GET_GAMES, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllPosts() {
  return async function (dispatch) {
    try {
      let comment = await axios.get(FORUM_URL);
      return dispatch({
        type: CONTAINER_POSTS,
        payload: comment.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editPost(id, data) {
  return async function (dispatch) {
    try {
      await axios.put(`${FORUM_URL}/${id}`, data);
      return dispatch({
        type: EDIT_POST,
      });
    } catch (error) {}
  };
}
