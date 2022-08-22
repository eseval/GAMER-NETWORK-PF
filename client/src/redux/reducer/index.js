import {
  ALL_NEWS_LOADING,
  GET_ALL_NEWS,
  GET_NEWS_BY_ID, GET_NEWS_BY_TITLE,
  GET_USER_BY_EMAIL,
  GET_USERS,
  GET_USERS_BY_ID,
  NEWS_LOADING,
  POST_USER,
  USER_LOADING,
  USERS_LOADING,
  SEARCH_NEWS_BY_TITLE
} from "../actions/types"

const initialState = {
  users: [],
  isLoadinsUsers: true,
  user: {},
  isLoadingUser: true,
  allNews: [],
  isLoadingAllNews: true,
  news: {},
  isLoadingNews: true
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING: {
      return {
        ...state,
        isLoadingUsers: true
      }
    }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoadingUsers: false
      }
    case USER_LOADING: {
      return {
        ...state,
        isLoadingUser: true
      }
    }
    case GET_USERS_BY_ID:
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false
      }
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload
      }
    case ALL_NEWS_LOADING: {
      return {
        ...state,
        isLoadingAllNews: true
      }
    }
    case GET_ALL_NEWS:
      return {
        ...state,
        allNews: action.payload,
        isLoadingAllNews: false
      }
    case NEWS_LOADING: {
      return {
        ...state,
        isLoadingNews: true
      }
    }
    case GET_NEWS_BY_ID:
      return {
        ...state,
        news: action.payload,
        isLoadingNews: false
      }
    case POST_USER:
      return {
        ...state
      };
    case GET_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
        isLoadingNews: false
      }
    case SEARCH_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
      }
    default:
      return {...state}
  }
}
