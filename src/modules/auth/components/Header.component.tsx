import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from '../redux/logout/logout.actions';
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification.component";

const Header = () => {

    const loginStateData = useSelector((state: any) => state.loginState);
    const notifications = useSelector((state: any) => state.orderState.notifications);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction());
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {
            loginStateData?.data?.data?.user?.role == 'admin' ? 
            <Link to="/" className="navbar-brand">Admin Module</Link> :
            <Link to="/" className="navbar-brand">Buyer Module</Link>
        }
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav text-right">
                <li className="nav-item">
                    <Link to="/order/list" className="nav-link">Order List</Link>
                </li>
                <li className="nav-item">
                    <Link to="/order/activity" className="nav-link">Order Activity</Link>
                </li>
                {
                    loginStateData?.data?.data?.user?.role == 'admin' ? 
                    <li className="nav-item">
                        <Link to="/deliver/list" className="nav-link">Deliver List</Link>
                    </li> : ''
                }
                
                {
                    loginStateData?.data?.data?.user?.role == 'admin' ? 
                                    
                   <Notification /> : ''
                }

                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {loginStateData?.data?.data?.user?.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" onClick={logout}>Logout</a>
                </div>
                </li>
            </ul>
            </div>
        </nav>
   );
};

export default Header;
