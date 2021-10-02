import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../auth/components/Header.component";
import ContentLoading from "../../components/Loading/ContentLoading.component";
import { adminOrderDeliveredGetRequestAction } from "../buyer/redux/order.actions";

const DeliverListPage = () => {

    const orderStateData = useSelector((state: any) => state.orderState.deliveries);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminOrderDeliveredGetRequestAction());
    }, []);

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

    return (
        <>
        <Header/>
        <div className="wrapper-start">
            <div className="d-flex justify-content-between">
                <div>
                    <h5>Delivered Order List</h5> 
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
                    </tr>
                    </thead>
                    {orderStateData?.loading ? (
                        <ContentLoading />
                    ) : (
                    <tbody>
                        {orderStateData?.data?.data?.deliveries?.map(
                        (order: any, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order?.id}</td>
                                <td>{order?.product?.name}</td>
                                <td>{order?.qty}</td>
                                <td>{order?.price }</td>
                                <td>{order?.user?.name }</td>
                                <td> Delivered </td>
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

export default DeliverListPage