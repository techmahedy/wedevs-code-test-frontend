import { ActivityTypes } from "./activity.types";


const INITIAL_STATE = {
  data: "",
  error: "",
  loading: false
};

const activityReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActivityTypes .ACTIVITY_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case ActivityTypes.ACTIVITY_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ActivityTypes.ACTIVITY_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
   
    case ActivityTypes.ACTIVITY_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default activityReducer;
