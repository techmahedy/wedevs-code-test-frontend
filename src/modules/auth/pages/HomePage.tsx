import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDeleteRequestAction, productGetRequestAction } from "../../product/redux/product.actions";
import ContentLoading from "../../../components/Loading/ContentLoading.component";
import Header from "../components/Header.component";
import SnackBarAlert from "../../../components/snack-bar/SnackBarAlert";
import { ProductTypes } from "../../product/redux/product.types";

const HomePage = () => {

    const loginStateData = useSelector((state: any) => state.loginState);
    const productStateData = useSelector((state: any) => state.productState);

    const [count, setCounter] = useState(0)

    const dispatch = useDispatch();
    
    const deleteProduct = async (productId: any) => {
        await dispatch(productDeleteRequestAction(productId));
        setCounter(count+1);
    }
    
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
    }, [count])

    useEffect(() => {
        dispatch(productGetRequestAction());
    }, [count]);

    return (
        <>
        <Header/>

        <div className="wrapper-start">
        <SnackBarAlert
            actionTypes={[
              ProductTypes.PRODUCT_CREATE_SUCCESS,
              ProductTypes.PRODUCT_DELETE_SUCCESS,
              ProductTypes.PRODUCT_UPDATE_SUCCESS,
            ]}
          />
        <div className="d-flex justify-content-between">
                <div>
                    <h5>Product List</h5> 
                </div>
                {
                    loginStateData?.data?.data?.user?.role == 'admin' ?
               
                <div>
                    <Link
                        to="/product/create"
                        className="btn btn-danger btn-sm">
                        Create Product
                    </Link>
                    </div> : ''
                }
                </div>
            <div className="fof">
                <table
                    id="example2"
                    className="table table-bordered table-hover"
                >
                    <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {productStateData?.loading ? (
                        <ContentLoading />
                    ) : (
                    <tbody>
                        {productStateData?.data?.data?.products?.map(
                        (product: any, index) => {
                            return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product?.name}</td>
                                <td>{product?.qty}</td>
                                <td>{product?.price }</td>
                                <td>
                                {
                                    loginStateData?.data?.data?.user?.role == 'admin' ?

                                <button
                                    onClick={()=>{
                                        deleteProduct(product?.id)
                                    }}
                                    className="btn btn-default"
                                    >
                                    Delete
                                </button>

                                   :
                                                                 
                                <Link
                                    to={`/product/details/${product?.id}`}
                                    className="btn btn-default"
                                    >
                                    Details
                                </Link>  }

                                {
                                     loginStateData?.data?.data?.user?.role == 'admin' ?
                                     <Link
                                        to={`/product/edit/${product?.id}`}
                                        className="btn btn-default"
                                        >
                                        Edit
                                    </Link> : ''
                                }

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

export default HomePage