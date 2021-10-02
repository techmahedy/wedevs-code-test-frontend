import { AxiosAuthInstance } from "../../../config/api/auth.axios";
import { store } from "../../../config/redux/store";
import { snackBarAlert } from "../../../redux/alert/alert.action";
import { OrderTypes } from "./order.types";

export const adminOrderGetRequestAction = () => async (dispatch: any) => {

  const params = new URLSearchParams(window.location.search)
  const key = params.get('key') ? params.get('key') : '';

  dispatch({
    type: OrderTypes.ORDER_ACTION_START,
  });
  await AxiosAuthInstance.get(`/order/list?key=${key}`).then(
    (res: any) => {
      dispatch({
        type: OrderTypes.ORDER_GET_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.ORDER_GET_FAILED,
        payload: error,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
    }
  );
};

export const orderDetailsGetRequestAction = (id: any) => async (dispatch: any) => {

  dispatch({
    type: OrderTypes.ORDER_ACTION_START,
  });
  await AxiosAuthInstance.get(`/order/${id}`).then(
    (res: any) => {
      dispatch({
        type: OrderTypes.ORDER_GET_BY_ID_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.ORDER_GET_BY_ID_FAILED,
        payload: error,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
    }
  );
};


export const orderCreatePostRequestAction = (formData: any) => async (dispatch: any) => {

  dispatch({
    type: OrderTypes.ORDER_ACTION_START,
  });
  await AxiosAuthInstance.post('/order',formData).then(
    (res: any) => {
      dispatch({
        type: OrderTypes.ORDER_CREATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          OrderTypes.ORDER_CREATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.ORDER_CREATE_FAILED,
        payload: true,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          OrderTypes.ORDER_CREATE_FAILED
        )
      );
    }
  );
};

export const orderStatusUpdateRequestAction = (formData: any) => async (dispatch: any) => {

  dispatch({
    type: OrderTypes.ORDER_ACTION_START,
  });
  await AxiosAuthInstance.post('/order/status',formData).then(
    (res: any) => {
      dispatch({
        type: OrderTypes.ORDER_UPDATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          OrderTypes.ORDER_UPDATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.ORDER_UPDATE_FAILED,
        payload: true,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          OrderTypes.ORDER_UPDATE_FAILED
        )
      );
    }
  );
};

export const orderUpdateRequestAction = (id: any, formData: any) => async (dispatch: any) => {

  dispatch({
    type: OrderTypes.ORDER_ACTION_START,
  });
  await AxiosAuthInstance.post(`/order/edit/${id}`, formData).then(
    (res: any) => {
      dispatch({
        type: OrderTypes.ORDER_UPDATE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          OrderTypes.ORDER_UPDATE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.ORDER_UPDATE_FAILED,
        payload: true,
      });
      dispatch({
        type: OrderTypes.ORDER_ACTION_END,
      });
      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end
      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          OrderTypes.ORDER_UPDATE_FAILED
        )
      );
    }
  );
};

export const adminOrderDeliveredGetRequestAction = () => async (dispatch: any) => {
  dispatch({
    type: OrderTypes.DELIVERY_ACTION_START,
  });
  await AxiosAuthInstance.get("/order/deliver/list").then(
    (res: any) => {
      dispatch({
        type: OrderTypes.DELIVERY_GET_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: OrderTypes.DELIVERY_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: OrderTypes.DELIVERY_GET_FAILED,
        payload: error,
      });
      dispatch({
        type: OrderTypes.DELIVERY_ACTION_END,
      });
    }
  );
};
