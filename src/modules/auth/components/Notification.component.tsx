import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoading from "../../../components/Loading/ContentLoading.component";
import { orderNotificationGetRequestAction } from "../../admin/redux/notification.actions";

const Notification = () => {

    const notificationStateData = useSelector((state: any) => state.notificationState);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(orderNotificationGetRequestAction());
    }, [window.location.href]);

  return (
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Notification
        </a>
        {notificationStateData?.loading ? (
          <ContentLoading />
              ) : (
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
          {notificationStateData?.data?.data?.notifications?.map(
             (notification: any, index) => {
                return (
            <p className="dropdown-item" >{notification?.data}</p>
            );
          }
        )}
        </div>
          )}
    </li> 
   );
};

export default Notification;
