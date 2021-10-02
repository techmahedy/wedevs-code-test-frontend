import { NorificationTypes } from "./notification.types";

const INITIAL_STATE = {
  data: "",
  error: "",
  loading: false
};

const notificationReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case NorificationTypes .NOTIFICATION_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case NorificationTypes.NOTIFICATION_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case NorificationTypes.NOTIFICATION_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
   
    case NorificationTypes.NOTIFICATION_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
