import React, {useEffect,useState} from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { Link , useParams, useHistory} from 'react-router-dom';
import ContentLoading from '../../components/Loading/ContentLoading.component';
import SnackBarAlert from '../../components/snack-bar/SnackBarAlert';
import { CONFIG } from '../../config/api';
import { orderCreatePostRequestAction } from '../buyer/redux/order.actions';
import { productDeleteRequestAction, productGetByIdAction, productGetRequestAction } from './redux/product.actions';
import { ProductTypes } from './redux/product.types';

const ProductDetailsPage = () => {

    const productStateData = useSelector((state: any) => state.productState);
    const loginStateData = useSelector((state: any) => state.loginState);
    
    const dispatch = useDispatch();
    const history = useHistory();

    const { id }: any = useParams();

    useEffect(() => {
      dispatch(productGetByIdAction(id));
    }, [])
    
    const makeAnOrder = async (productId) => {

       const qty = $('#qty').val();
       const data = {
            product_id: productId,
            qty: qty ? qty : 1
       }

      await dispatch(orderCreatePostRequestAction(data));
      const error = localStorage.getItem("error");
      if (!error) {
          history.push('/order/list');
      }
    }

    return (
        <>
        <div className="d-flex justify-content-between">
            <div>
                 <h1>Product details page</h1> 
            </div>
        <div>
            <Link
                to="/"
                className="btn btn-danger btn-sm"
                >
                Back
            </Link>
        </div>
        </div>
            <div className="container">
                <div className="row">
                   <div className="col-md-4">
                   <img
                        className="img-fluid"
                        src={
                            CONFIG.IMAGE_URL +
                            productStateData?.data?.data?.product?.image
                        }
                        alt=""
                    />
                   </div>
                   <div className="col-md-8">
                       <p>Name : {productStateData?.data?.data?.product?.name}</p>
                       <p>Price : {productStateData?.data?.data?.product?.price}</p>
                       <p>Qty : {productStateData?.data?.data?.product?.qty > 0 ? productStateData?.data?.data?.product?.qty : 'Out of stock'}</p>
                       <p>Details : {productStateData?.data?.data?.product?.description}</p>

                       {
                           loginStateData?.data?.data?.user?.role == 'buyer' ? 
                       <p>
                           Quantity : 
                           <input type="number" name="qty" id="qty" placeholder="Quantity"/> 
                        </p> : '' 

                        }

                       <button className="btn btn-sm btn-success" onClick={()=>{
                           makeAnOrder(productStateData?.data?.data?.product?.id)
                       }}>Ordrer</button>
                   </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailsPage