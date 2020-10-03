import * as types from "redux/constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
      };

    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default blogReducer;
