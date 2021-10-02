import React, {useEffect,useState} from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { Link , useParams, useHistory} from 'react-router-dom';
import SnackBarAlert from '../../components/snack-bar/SnackBarAlert';
import { CONFIG } from '../../config/api';
import { OrderTypes } from './redux/order.types';
import { orderDetailsGetRequestAction, orderStatusUpdateRequestAction, orderUpdateRequestAction } from './redux/order.actions';
import { update } from 'lodash';
import ContentLoading from '../../components/Loading/ContentLoading.component';
import { Field, Form, FormikProvider, useFormik } from 'formik';

const OrderDetailsPage = () => {

    const orderStateData = useSelector((state: any) => state.orderState);
    const loginStateData = useSelector((state: any) => state.loginState);

    const dispatch = useDispatch();
    const history = useHistory();

    const { id }: any = useParams();

    useEffect(() => {
      dispatch(orderDetailsGetRequestAction(id));
    }, [])
    
    const initialValues = {
        qty: orderStateData?.data?.data?.order?.qty
    };
    
    const onSubmit = async (values: any) => {

        const data = {
            product_id: orderStateData?.data?.data?.order?.product_id,
            qty: values?.qty,
        }
    
        await dispatch(orderUpdateRequestAction(id,data));

        const error = localStorage.getItem("error");
        if (!error) {
            history.push('/order/list');
        }
    };

    const updateOrderStatus = async (orderId) => {
        const key = $('#key').children("option:selected").val();
        const data = {
            order_id: orderId,
            status: key
        }
        await dispatch(orderStatusUpdateRequestAction(data));

        const error = localStorage.getItem("error");
        if (!error) {
            history.push('/order/list');
        }
    }
    
    const enableReinitialize = true;

    const formik = useFormik({ initialValues, onSubmit, enableReinitialize});  
    
    return (
        <>
        <FormikProvider value={formik}>
        <div className="d-flex justify-content-between">
            <div>
                 <h1>Order details page</h1> 
                    <SnackBarAlert
                        actionTypes={[
                            OrderTypes.ORDER_CREATE_FAILED,
                            OrderTypes.ORDER_UPDATE_FAILED,
                        ]}
                    />
            </div>
        <div>
            <Link
                to="/order/list"
                className="btn btn-danger btn-sm"
                >
                Back
            </Link>
        </div>
        </div>

        {
            orderStateData?.loading ? 
            <ContentLoading/> :
            <Form>
            <div className="container">
                <div className="row">
                   <div className="col-md-4">
                   <img
                        className="img-fluid"
                        src={
                            CONFIG.IMAGE_URL +
                            orderStateData?.data?.data?.order?.product?.image
                        }
                        alt=""
                    />
                   </div>
                   <div className="col-md-8">
                       <p>Name : {orderStateData?.data?.data?.order?.product?.name}</p>
                       <p>Price : {orderStateData?.data?.data?.order?.product?.price}</p>
                       <p>Qty : {orderStateData?.data?.data?.order?.product?.qty > 0 ? orderStateData?.data?.data?.order?.product?.qty : 'Out of stock'}</p>
                       <p>Details : {orderStateData?.data?.data?.order?.product?.description}</p>
                       <p>Ordered By: {orderStateData?.data?.data?.order?.user?.name} </p>
                       {
                           loginStateData?.data?.data?.user?.role == 'admin' ? 
                           <p>
                           <select name="key" id="key">
                                <option value="">Filter Order</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="reject">Reject</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="deliverd">Deliverd</option>
                            </select>
                           </p> :   
                           
                           <p>Quantity : <Field type="number" name="qty" id="qty" placeholder="Quantity"/> </p>
                       }
                     
                       {
                        loginStateData?.data?.data?.user?.role == 'admin' ? 

                       <button className="btn btn-sm btn-success" onClick={() =>{
                           updateOrderStatus(orderStateData?.data?.data?.order?.id)
                       }}>Update status</button>

                       :
                        <button className="btn btn-sm btn-success"> Edit Order</button>

                        }

                   </div>
                </div>
            </div> 
            </Form>
            }
            </FormikProvider>
        </>
    )
}

export default OrderDetailsPage;