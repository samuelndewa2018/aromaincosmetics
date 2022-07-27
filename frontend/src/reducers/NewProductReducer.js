import {
  ALL_NEWPRODUCT_FAIL,
  ALL_NEWPRODUCT_REQUEST,
  ALL_NEWPRODUCT_SUCCESS,
  CLEAR_ERRORS,
  NEWPRODUCT_DETAILS_FAIL,
  NEWPRODUCT_DETAILS_REQUEST,
  NEWPRODUCT_DETAILS_SUCCESS,
  NEW_NEWREVIEW_REQUEST,
  NEW_NEWREVIEW_SUCCESS,
  NEW_NEWREVIEW_RESET,
  NEW_NEWREVIEW_FAIL,
  ADMIN_NEWPRODUCT_REQUEST,
  ADMIN_NEWPRODUCT_SUCCESS,
  ADMIN_NEWPRODUCT_FAIL,
  NEW_NEWPRODUCT_REQUEST,
  NEW_NEWPRODUCT_SUCCESS,
  NEW_NEWPRODUCT_FAIL,
  NEW_NEWPRODUCT_RESET,
  DELETE_NEWPRODUCT_REQUEST,
  UPDATE_NEWPRODUCT_REQUEST,
  DELETE_NEWPRODUCT_SUCCESS,
  UPDATE_NEWPRODUCT_SUCCESS,
  DELETE_NEWPRODUCT_FAIL,
  UPDATE_NEWPRODUCT_FAIL,
  DELETE_NEWPRODUCT_RESET,
  UPDATE_NEWPRODUCT_RESET,
  DELETE_NEWREVIEW_REQUEST,
  DELETE_NEWREVIEW_SUCCESS,
  DELETE_NEWREVIEW_FAIL,
  DELETE_NEWREVIEW_RESET,
  ALL_NEWREVIEW_REQUEST,
  ALL_NEWREVIEW_SUCCESS,
  ALL_NEWREVIEW_FAIL,
} from "../constans/NewProductConstans";

export const newproductsReducer = (state = { newproducts: [] }, action) => {
  switch (action.type) {
    case ALL_NEWPRODUCT_REQUEST:
    case ADMIN_NEWPRODUCT_REQUEST:
      return {
        loading: true,
        newproducts: [],
      };
    case ALL_NEWPRODUCT_SUCCESS:
      return {
        loading: false,
        newproducts: action.payload.newproducts,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ADMIN_NEWPRODUCT_SUCCESS:
      return {
        loading: false,
        newproducts: action.payload,
      };
    case ALL_NEWPRODUCT_FAIL:
    case ADMIN_NEWPRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newproductDetailsReducer = (
  state = { newproduct: {} },
  action
) => {
  switch (action.type) {
    case NEWPRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case NEWPRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        newproduct: action.payload,
      };
    case NEWPRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Product review
export const newnewReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_NEWREVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_NEWREVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_NEWREVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_NEWREVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// New Product ----Admin
export const newnewProductReducer = (state = { newproduct: {} }, action) => {
  switch (action.type) {
    case NEW_NEWPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_NEWPRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newproduct: action.payload.product,
      };
    case NEW_NEWPRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_NEWPRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Product
export const deletenewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NEWPRODUCT_REQUEST:
    case UPDATE_NEWPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWPRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_NEWPRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_NEWPRODUCT_FAIL:
    case UPDATE_NEWPRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NEWPRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_NEWPRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// All reviews --- Admin
export const newproductReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_NEWREVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_NEWREVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_NEWREVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Review ----- Admin
export const deletenewReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NEWREVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_NEWREVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NEWREVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
