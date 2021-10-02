import { Field, Form, FormikProvider, useFormik } from "formik";
import React,{useEffect,useState}from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import ContentLoading from "../../components/Loading/ContentLoading.component";
import SnackBarAlert from "../../components/snack-bar/SnackBarAlert";
import ErrorMessageShow from "../../components/utilComponent/ErrorMessage.component";
import { CONFIG } from "../../config/api";
import Header from "../auth/components/Header.component";
import { productGetByIdAction, productUpdateAction } from "../product/redux/product.actions";
import { ProductTypes } from "../product/redux/product.types";


const ProductEditPage = () => {

  const history = useHistory();
  const loginStateData = useSelector((state: any) => state.loginState);
  const productStateData = useSelector((state: any) => state.productState);
  
  const { id }:any = useParams();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(productGetByIdAction(id));
  }, []);
  
  const product = productStateData?.data?.data?.product;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    price: Yup.string().required("This field is required"),
    qty: Yup.string().required("This field is required"),
  });

  const initialValues = {
    name: product?.name,
    price: product?.price,
    description: product?.description,
    qty: product?.qty,
    image: ""
  };
  
  const [imageState, setImageState] = useState({
    image: ""
  });

  const handleFileChange = (e: any) => {
    setImageState({
        image: e.target.files[0],
    });
  };

  useEffect(() => {
    formik.setFieldValue("image", imageState.image);
  }, [imageState.image]);

  const onSubmit = async (values: any) => {

    const fd = new FormData();

    fd.append("name", values.name);
    fd.append("description", values.description);
    fd.append("qty", values.qty);
    fd.append("price", values.price);
    fd.append("image", imageState.image);

    await dispatch(productUpdateAction(id,fd));

    const error = localStorage.getItem("error");
    if (!error) {
        history.push('/');
    }
  };
  
  const enableReinitialize = true;

  const formik = useFormik({ initialValues, onSubmit, validationSchema, enableReinitialize});

  return (
    <>
    <FormikProvider value={formik}>
    <Header />
      {productStateData?.loading ? (
        <ContentLoading />
      ) : (
      <Form>
        <h5 className="mt-3">Create new product </h5>
          <SnackBarAlert
            actionTypes={[
              ProductTypes.PRODUCT_CREATE_FAILED
            ]}
          />
          <div className="form-group mt-1">
              <label>Product name</label>
              <Field type="text" name="name" className="form-control" placeholder="Enter name" />
              <ErrorMessageShow formik={formik} name="name" />
          </div>

          <div className="form-group mt-1">
              <label>Description</label>
              <Field type="text" name="description" className="form-control" placeholder="Enter description" />
              <ErrorMessageShow formik={formik} name="description" />
          </div>

          <div className="form-group mt-1">
              <label>Quantity</label>
              <Field type="number" name="qty" min="0" className="form-control" placeholder="Enter qty" />
              <ErrorMessageShow formik={formik} name="qty"/>
          </div>

          <div className="form-group mt-1">
              <label>Price</label>
              <Field type="number" name="price" className="form-control" placeholder="Enter price" />
              <ErrorMessageShow formik={formik} name="price" />
          </div>

          <div className="form-group mt-1">
              <label>Product Image</label>
              <input 
                    type="file" 
                    name="image" 
                    className="form-control"
                    onChange={handleFileChange}
                />
              <ErrorMessageShow formik={formik} name="image" />
          </div>

          <div className="form-group mt-2">
              <img
                className="img-fluid"
                src={
                    CONFIG.IMAGE_URL +
                    product?.image
                }
                width="50"
                height="50"
                alt=""
            />
          </div>
           


          <button type="submit" className="btn btn-primary btn-block mt-2">Submit</button>
        </Form>
      )}
    </FormikProvider>
    </>
  );
};

export default ProductEditPage;
