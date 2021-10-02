import { AxiosAuthInstance } from "../../../config/api/auth.axios";
import { NorificationTypes } from "./notification.types";

export const orderNotificationGetRequestAction = () => async (dispatch: any) => {
    dispatch({
      type: NorificationTypes .NOTIFICATION_ACTION_START,
    });
    await AxiosAuthInstance.get("/notifications").then(
      (res: any) => {
        dispatch({
          type: NorificationTypes.NOTIFICATION_GET_SUCCESS,
          payload: res?.data,
        });
        dispatch({
          type: NorificationTypes.NOTIFICATION_ACTION_END,
        });
      },
      (error: any) => {
        dispatch({
          type: NorificationTypes.NOTIFICATION_GET_FAILED,
          payload: error,
        });
        dispatch({
          type: NorificationTypes.NOTIFICATION_ACTION_END,
        });
      }
    );
  };