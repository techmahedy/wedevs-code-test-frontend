import AxiosWithOutAuthInstance from "../../../../config/api/withoutauth.axios";
import { RegisterTypes } from "./register.types";
import { store } from "../../../../config/redux/store";
import { snackBarAlert } from "../../../../redux/alert/alert.action";

export const registerAction = (formData: any) => async (dispatch: any) => {

  dispatch({
    type: RegisterTypes.ACTION_START,
  });
  AxiosWithOutAuthInstance.post("/signup", formData).subscribe(
    (res: any) => {
      dispatch({
        type: RegisterTypes.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: RegisterTypes.ACTION_END,
      });
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          RegisterTypes.REGISTER_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: RegisterTypes.REGISTER_FAILED,
        payload: error,
      });
      dispatch({
        type: RegisterTypes.ACTION_END,
      });
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          RegisterTypes.REGISTER_FAILED
        )
      );
    }
  );
};
