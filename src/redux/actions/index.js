import axios from "axios";
import {
  CLAIM_REWARDS,
  CLEAN_ALLNEWS_STATE,
  CLEAN_FORUM, CLEAN_GAMES_BY_ID_STATE,
  CLEAN_GAMES_STATE,
  CLEAN_NEWS_STATE,
  CLEAN_REWAR_STATE,
  CONTAINER_POSTS,
  EDIT_POST,
  GET_ALL_NEWS,
  GET_FORUM,
  GET_GAMES,
  GET_GAMES_BY_ID,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_TITLE,
  GET_REWARDS,
  GET_REWARDS_BY_ID,
  GET_USER_BY_EMAIL,
  GET_USERS,
  GET_USERS_BY_ID,
  ORDER_BY_COMMENTS,
  ORDER_NEWS_BY_TITLE,
  POST_FORUM,
  POST_FORUM_ANSWERS,
  POST_USER,
  SEARCH_NEWS_BY_TITLE,
  LOADING_USER, GET_GENRES
} from "./types";

const USERS_URL = "https://pf-henry-gamesportal.herokuapp.com/users";
const NEWS_URL = "https://pf-henry-gamesportal.herokuapp.com/news";
const FORUM_URL = "https://pf-henry-gamesportal.herokuapp.com/forum";
const REWARDS_URL = "https://pf-henry-gamesportal.herokuapp.com/reward";
const GAMES_URL = "https://pf-henry-gamesportal.herokuapp.com/games";
const ANSWER_URL = "https://pf-henry-gamesportal.herokuapp.com/answers";
const GENRES_URL = "https://pf-henry-gamesportal.herokuapp.com/genre"

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
      return dispatch({ type: GET_USERS_BY_ID, payload: json.data }, { type: LOADING_USER });
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
      console.log(newDataUser);
      if (newDataUser.data.coins >= price) {
        await axios.put(`${USERS_URL}/${id}`, data);
        newDataUser = await axios.get(
          `https://pf-henry-gamesportal.herokuapp.com/users/${id}`
        );
        window.localStorage.setItem(
          "userLogged",
          JSON.stringify(newDataUser.data)
        );
      } else {
        window.localStorage.setItem(
          "userLogged",
          JSON.stringify(newDataUser.data)
        );
        return alert("insuficient founds");
      }
      window.localStorage.setItem(
        "userLogged",
        JSON.stringify(newDataUser.data)
      );
      return dispatch({ type: CLAIM_REWARDS, payload: newDataUser });
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

export function postForumAnswers(payload) {
  return async function (dispatch) {
    try {
      console.log(payload);
      await axios.post(ANSWER_URL, payload); // Necesitamos una tabla para guardar los comentarios del foro
      return dispatch({ type: POST_FORUM_ANSWERS });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getForum(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${FORUM_URL}/${id}`);
      return dispatch({ type: GET_FORUM, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanNewsState() {
  return {
    type: CLEAN_NEWS_STATE,
  };
}

export function cleanRewardState() {
  return {
    type: CLEAN_REWAR_STATE,
  };
}

export function cleanAllNewsState() {
  return {
    type: CLEAN_ALLNEWS_STATE,
  };
}

export function cleanGamesState() {
  return {
    type: CLEAN_GAMES_STATE,
  };
}

export function cleanForum() {
  return {
    type: CLEAN_FORUM,
  };
}

export function orderByComments(value) {
  try {
    return { type: ORDER_BY_COMMENTS, payload: value };
  } catch (error) {
    console.log(error);
  }
}

export function getGamesById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${GAMES_URL}/${id}`);
      return dispatch({ type: GET_GAMES_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanGamesByIdState() {
  return {
    type: CLEAN_GAMES_BY_ID_STATE,
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      let json = await axios.get(GENRES_URL);
      return dispatch({ type: GET_GENRES, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  }
}