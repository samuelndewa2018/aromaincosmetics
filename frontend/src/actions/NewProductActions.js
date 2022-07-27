import axios from "axios";
import {
  ADMIN_NEWPRODUCT_FAIL,
  ADMIN_NEWPRODUCT_REQUEST,
  ADMIN_NEWPRODUCT_SUCCESS,
  ALL_NEWPRODUCT_FAIL,
  ALL_NEWPRODUCT_REQUEST,
  ALL_NEWPRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_NEWPRODUCT_FAIL,
  DELETE_NEWPRODUCT_REQUEST,
  DELETE_NEWPRODUCT_SUCCESS,
  DELETE_NEWREVIEW_FAIL,
  DELETE_NEWREVIEW_REQUEST,
  DELETE_NEWREVIEW_SUCCESS,
  NEW_NEWPRODUCT_FAIL,
  NEW_NEWPRODUCT_REQUEST,
  NEW_NEWPRODUCT_SUCCESS,
  NEW_NEWREVIEW_FAIL,
  NEW_NEWREVIEW_REQUEST,
  NEW_NEWREVIEW_SUCCESS,
  NEWPRODUCT_DETAILS_FAIL,
  NEWPRODUCT_DETAILS_REQUEST,
  NEWPRODUCT_DETAILS_SUCCESS,
  UPDATE_NEWPRODUCT_FAIL,
  UPDATE_NEWPRODUCT_REQUEST,
  UPDATE_NEWPRODUCT_SUCCESS,
  ALL_NEWREVIEW_REQUEST,
  ALL_NEWREVIEW_SUCCESS,
  ALL_NEWREVIEW_FAIL,
} from "../constans/NewProductConstans";

// get all products
export const getNewProduct =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_NEWPRODUCT_REQUEST,
      });
      let link = `/api/v1/new/products?keyword=${keyword}&page=${currentPage}`;
      if (category) {
        link = `/api/v1/new/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_NEWPRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_NEWPRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products Details
export const getNewProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWPRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/new/product/${id}`);
    dispatch({
      type: NEWPRODUCT_DETAILS_SUCCESS,
      payload: data.newproduct,
    });
  } catch (error) {
    dispatch({
      type: NEWPRODUCT_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};

// NEW REVIEW
export const newNewReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_NEWREVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/new/product/review`,
      reviewData,
      config
    );
    dispatch({
      type: NEW_NEWREVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_NEWREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product --------Admin
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_NEWPRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/new/product/new`,
      productData,
      config
    );
    dispatch({
      type: NEW_NEWPRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_NEWPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
export const getAdminNewProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_NEWPRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/new/products");
    dispatch({
      type: ADMIN_NEWPRODUCT_SUCCESS,
      payload: data.newproducts,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_NEWPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product ------Admin
export const deleteNewProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NEWPRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/v1/new/product/${id}`);
    dispatch({
      type: DELETE_NEWPRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NEWPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateNewProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NEWPRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/new/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_NEWPRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NEWPRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllNewReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_NEWREVIEW_REQUEST });
    const { data } = await axios.get(`/api/v1/new/reviews?id=${id}`);
    dispatch({
      type: ALL_NEWREVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_NEWREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product ------ Admin
export const deleteNewReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NEWREVIEW_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/new/reviews?id=${reviewId}&productId=${productId}`
    );
    dispatch({
      type: DELETE_NEWREVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NEWREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
