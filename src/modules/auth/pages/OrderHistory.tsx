import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDeleteRequestAction, productGetRequestAction } from "../../product/redux/product.actions";
import ContentLoading from "../../../components/Loading/ContentLoading.component";
import Header from "../components/Header.component";
import { orderActivityGetRequestAction } from "../../../redux/activity/activity.actions";

const OrderHistory = () => {

    const activityStateData = useSelector((state: any) => state.activityState);

    const [count, setCounter] = useState(0)

    const dispatch = useDispatch();
    
    useEffect(() => {
        setTimeout(()=>{
          $("#example2").DataTable({
            destroy: true,
            dom: "rBftlip",
            buttons: [
              {

              },
            ],
            lengthMenu: [
              [10, 20, 50, 100, -1],
              [10, 20, 50, 100, "All"],
            ],
            pageLength: 10,
        });
        },1000)
    }, [])

    useEffect(() => {
        dispatch(orderActivityGetRequestAction());
    }, [count]);

    return (
        <>
        <Header/>

        <div className="wrapper-start">
        <div className="d-flex justify-content-between">
                <div>
                    <h5>Order Activity List</h5> 
                </div>
                </div>
            <div className="fof table-responsive">
                <table
                    id="example2"
                    className="table table-bordered table-hover"
                >
                    <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>User</th>
                        <th>Event</th>
                        <th>Old Value</th>
                        <th>Updated Value</th>
                        <th>URL</th>
                        <th>IP</th>
                        <th>Agent</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                    </thead>
                    {activityStateData?.loading ? (
                        <ContentLoading />
                    ) : (
                    <tbody>
                        {activityStateData?.data?.data?.map(
                        (activity: any, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{activity?.user}</td>
                                <td>{activity?.event}</td>
                                {
                                    activity?.old_values?.qty ? 
                              
                                <td>
                                    Qty: {activity?.old_values?.qty} <br/>
                                    Price: {activity?.old_values?.price}
                                </td>
                                : <td>{activity?.old_values?.status}</td> }

                                {
                                    activity?.old_values?.qty ? 
                              
                                <td>
                                    Qty: {activity?.new_values?.qty} <br/>
                                    Price: {activity?.new_values?.price}
                                </td>
                                : <td>{activity?.new_values?.status}</td> }

                                <td>{activity?.url}</td>
                                <td>{activity?.ip_address}</td>
                                <td>{activity?.user_agent}</td>
                                <td>{activity?.created_at}</td>
                                <td>{activity?.updated_at}</td>
                            </tr>
                            );
                        }
                        )}
                    </tbody>
                    )}
                </table>
            </div>
        </div>
        </>
    )
}

export default OrderHistory