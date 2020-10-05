import * as types from "redux/constants/user.constants";
const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERLIST_REQUEST:
      return { ...state, loading: true };

    case types.GET_USERLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload.users,
        totalPageNum: payload.totalPages,
      };

    default:
      return state;
  }
};

export default userReducer;
