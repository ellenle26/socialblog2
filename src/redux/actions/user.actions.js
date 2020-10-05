import * as types from "redux/constants/user.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getUserList = () => async (dispatch) => {
  dispatch({ type: types.GET_USERLIST_REQUEST, payload: null });
  try {
    const res = await api.get(`/users`);
    dispatch({ type: types.GET_USERLIST_SUCCESS, payload: res.data.data });
    console.log("co user roi ne");
  } catch (err) {
    dispatch({ type: types.GET_USERLIST_FAILURE, payload: err });
    console.log("no user nha");
  }
};

export const userActions = {
  getUserList,
};
