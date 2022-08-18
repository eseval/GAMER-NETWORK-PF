import axios from "axios";
import { GET_USERS } from "./types";

export function getUsers() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/users");
      return dispatch({
        type: GET_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
