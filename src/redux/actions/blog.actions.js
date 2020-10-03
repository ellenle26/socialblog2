import * as types from "redux/constants/blog.constants";
import api from "redux/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const createReview = (blogId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews/blogs/${blogId}`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error)
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const sendEmojiReaction = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`/reactions`, { targetType, targetId, emoji });
    if (targetType === "Blog") {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
  }
};


const createNewBlog = (title, content, images, redirectTo="__GO_BACK__") => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.post("/blogs", { title, content, images });
    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    // dispatch(routeActions.redirect(redirectTo));
    toast.success("New blog has been created!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content, images, redirectTo="__GO_BACK__") => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.put(`/blogs/${blogId}`, { title, content, images });
    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    // dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId, redirectTo="__GO_BACK__") => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`/blogs/${blogId}`);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    // dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

export const blogActions = {
  getBlogList,
  getBlogDetail,
  createReview,
  sendEmojiReaction,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
