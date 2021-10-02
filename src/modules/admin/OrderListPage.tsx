import React, { useEffect } from "react";
import { Link , useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../auth/components/Header.component";
import SnackBarAlert from "../../components/snack-bar/SnackBarAlert";
import ContentLoading from "../../components/Loading/ContentLoading.component";
import { adminOrderGetRequestAction } from "../buyer/redux/order.actions";
import { OrderTypes } from "../buyer/redux/order.types";

const OrderListPage = () => {

    const orderStateData = useSelector((state: any) => state.orderState);
    
    const history = useHistory();
    const { id }: any= useParams();

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(adminOrderGetRequestAction());
    }, [window.location.href]);
    
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
    }, [window.location.href])
    
    const orderFilter = () => {
       const key = $('#key').children("option:selected").val();
       history.push('?key=' + key)
    }

    return (
        <>
        <Header/>
        <div className="wrapper-start">
        <SnackBarAlert
            actionTypes={[
              OrderTypes.ORDER_CREATE_SUCCESS,
              OrderTypes.ORDER_UPDATE_SUCCESS,
            ]}
          />
            <div className="d-flex justify-content-between">
                <div>
                    <h5>Order List</h5> 
                </div>
                <div>
                <select name="key" id="key" onChange={orderFilter}>
                    <option value="">Filter Order</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="reject">Reject</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="deliverd">Deliverd</option>
                </select>
                </div>
            </div>
            <div className="fof">
                <table
                    id="example2"
                    className="table table-bordered table-hover"
                >
                    <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Order Id</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Order From</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {orderStateData?.loading ? (
                        <ContentLoading />
                    ) : (
                    <tbody>
                        {orderStateData?.data?.data?.orders?.map(
                        (order: any, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order?.id}</td>
                                <td>{order?.product?.name}</td>
                                <td>{order?.qty}</td>
                                <td>{order?.price }</td>
                                <td>{order?.user?.name }</td>
                                <td>
                                {(function(){
                                    if (order?.status == 'pending') {
                                        return <span>Pending</span>
                                    } else if (order?.status == 'approved') {
                                        return <span>Approved</span>
                                    }
                                    else if (order?.status == 'reject') {
                                        return <span>Rejected</span>
                                    }
                                    else if (order?.status == 'processing') {
                                        return <span>Processing</span>
                                    }
                                    else if (order?.status == 'shipped') {
                                        return <span>Shipped</span>
                                    }
                                    else {
                                        return <span>Delivered</span>
                                    }
                                })()}
                                </td>
                                <td>
                                <Link
                                    to={`/order/details/${order?.id}`}
                                    className="btn btn-success py-0"
                                    >
                                    Edit
                                </Link>
                                </td>
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

export default OrderListPage