import * as types from "redux/constants/blog.constants";
import api from "redux/api";

const getBlogList = (pageNum = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });

  try {
    const res = await api.get(`/blogs?page=${pageNum}&limit=${limit}`);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
    console.log("blog data ne", res.data.data);
  } catch (err) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: err });
  }
};

const getBlogDetail = (id) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGDETAIL_REQUEST, payload: null });

  try {
    const res = await api.get(`/blogs/${id}`);
    dispatch({ type: types.GET_BLOGDETAIL_SUCCESS, payload: res.data.data });
    console.log("singledata ne", res.data.data);
  } catch (err) {
    dispatch({ type: types.GET_BLOGDETAIL_FAILURE, payload: err });
  }
};

export const blogActions = {
  getBlogList,
  getBlogDetail,
};
