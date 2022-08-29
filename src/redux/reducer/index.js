import {
  CLAIM_REWARDS,
  CONTAINER_POSTS,
  EDIT_POST,
  GET_ALL_NEWS,
  GET_FORUM,
  GET_GAMES,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_TITLE,
  GET_REWARDS,
  GET_REWARDS_BY_ID,
  GET_USER_BY_EMAIL,
  GET_USERS,
  GET_USERS_BY_ID,
  ORDER_NEWS_BY_TITLE,
  POST_FORUM,
  POST_FORUM_ANSWERS,
  POST_USER,
  SEARCH_NEWS_BY_TITLE,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  allNews: [],
  news: {},
  rewards: [],
  games: [],
  rewardsById: [],
  forumById: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoadingUsers: false,
      };
    case GET_USERS_BY_ID:
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ALL_NEWS:
      return {
        ...state,
        allNews: action.payload,
        isLoadingAllNews: false,
      };
    case GET_NEWS_BY_ID:
      return {
        ...state,
        news: action.payload,
        isLoadingNews: false,
      };
    case POST_USER:
      return {
        ...state,
      };
    case GET_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
        isLoadingNews: false,
      };
    case SEARCH_NEWS_BY_TITLE:
      return {
        ...state,
        allNews: action.payload,
      };
    case ORDER_NEWS_BY_TITLE:
      let news = [...state.allNews];
      news = news.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return action.payload === "Asc" ? -1 : 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return action.payload === "Desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        allNews: action.payload === "All" ? state.newNews : news,
      };
    case POST_FORUM:
      return {
        ...state,
      };
    case CLAIM_REWARDS:
      return {
        ...state,
      };
    case GET_REWARDS:
      return {
        ...state,
        rewards: action.payload,
      };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_REWARDS_BY_ID:
      return {
        ...state,
        rewardsById: action.payload,
      };
    case CONTAINER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case EDIT_POST:
      return {
        ...state,
      };
    case POST_FORUM_ANSWERS:
      return {
        ...state,
      };
    case GET_FORUM:
      return {
        ...state,
        forumById: action.payload,
      };
    default:
      return { ...state };
  }
}
