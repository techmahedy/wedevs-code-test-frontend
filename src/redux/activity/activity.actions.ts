import { AxiosAuthInstance } from "../../config/api/auth.axios";
import { ActivityTypes } from "./activity.types";


export const orderActivityGetRequestAction = () => async (dispatch: any) => {
    dispatch({
      type: ActivityTypes .ACTIVITY_ACTION_START,
    });
    await AxiosAuthInstance.get("/activities").then(
      (res: any) => {
        dispatch({
          type: ActivityTypes.ACTIVITY_GET_SUCCESS,
          payload: res?.data,
        });
        dispatch({
          type: ActivityTypes.ACTIVITY_ACTION_END,
        });
      },
      (error: any) => {
        dispatch({
          type: ActivityTypes.ACTIVITY_GET_FAILED,
          payload: error,
        });
        dispatch({
          type: ActivityTypes.ACTIVITY_ACTION_END,
        });
      }
    );
  };