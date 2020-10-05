import * as types from "redux/constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
  error: "",
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOGS_REQUEST || types.GET_BLOGDETAIL_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
      };

    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false, error: payload };

    case types.GET_BLOGDETAIL_SUCCESS:
      return { ...state, selectedBlog: payload };

    case types.GET_BLOGDETAIL_REQUEST:
      return { ...state, loading: false, error: payload };

    case types.SEND_REACTION_REQUEST:
    case types.CREATE_COMMENT_REQUEST:
      return { ...state, submitLoading: true };

    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_COMMENT_FAILURE:
      return { ...state, submitLoading: false };

    case types.BLOG_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
        submitLoading: false,
      };

    // case types.REVIEW_REACTION_SUCCESS:
    //   return {
    //     ...state,
    //     selectedBlog: {
    //       ...state.selectedBlog,
    //       reviews: [
    //         ...state.selectedBlog.reviews.map((review) => {
    //           if (review._id !== payload.reviewId) return review;
    //           return { ...review, reactions: payload.reactions };
    //         }),
    //       ],
    //     },
    //     submitLoading: false,
    //   };

    // case types.CREATE_BLOG_REQUEST:
    // case types.UPDATE_BLOG_REQUEST:
    // case types.DELETE_BLOG_REQUEST:
    //   return { ...state, loading: true };

    // case types.CREATE_BLOG_SUCCESS:
    //   return { ...state, loading: false };
    // case types.UPDATE_BLOG_SUCCESS:
    //   return {
    //     ...state,
    //     selectedBlog: payload,
    //     loading: false,
    //   };
    // case types.DELETE_BLOG_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     selectedBlog: {},
    //   };

    // case types.CREATE_BLOG_FAILURE:
    // case types.UPDATE_BLOG_FAILURE:
    // case types.DELETE_BLOG_FAILURE:
    //   return { ...state, loading: false };

    default:
      return { ...state };
  }
};

export default blogReducer;
