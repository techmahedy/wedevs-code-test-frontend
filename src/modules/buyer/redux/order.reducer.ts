import { OrderTypes } from "./order.types";

const INITIAL_STATE = {
  data: "",
  deliveries: {
    data: '',
    loading: false,
  },
  notifications: {
    data: '',
    loading: false,
  },
  error: "",
  loading: false
};

const orderReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OrderTypes.ORDER_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case OrderTypes.ORDER_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case OrderTypes.ORDER_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case OrderTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case OrderTypes.ORDER_CREATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case OrderTypes.ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case OrderTypes.ORDER_DELETE_SUCCESS:
        return {
          ...state,
          data: action.payload,
          error: "",
      };
    case OrderTypes.ORDER_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case OrderTypes.ORDER_DELETE_FAILED:
      return {
        ...state,
        error: action.payload,
    };
    case OrderTypes.ORDER_GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case OrderTypes.ORDER_GET_BY_ID_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case OrderTypes.ORDER_ACTION_END:
      return {
        ...state,
        loading: false,
      };
     //!delivery
     case OrderTypes.DELIVERY_ACTION_START:
      return {
        ...state,
        deliveries: {
          ...state.deliveries,
          loading: true
        }
    };
    case OrderTypes.DELIVERY_GET_SUCCESS:
      return {
        ...state,
        deliveries: {
          ...state.deliveries,
          data: action.payload
        }
    };
    case OrderTypes.DELIVERY_GET_FAILED:
      return {
        ...state,
        error: action.payload,
    };
    case OrderTypes.DELIVERY_ACTION_END:
      return {
        ...state,
        deliveries: {
          ...state.deliveries,
          loading: false
        }
    };
    default:
      return state;
  }
};

export default orderReducer;
