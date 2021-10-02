import { Field, Form, FormikProvider, useFormik } from "formik";
import React,{useEffect,useState}from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import ContentLoading from "../../components/Loading/ContentLoading.component";
import SnackBarAlert from "../../components/snack-bar/SnackBarAlert";
import ErrorMessageShow from "../../components/utilComponent/ErrorMessage.component";
import Header from "../auth/components/Header.component";
import { productCreateAction } from "../product/redux/product.actions";
import { ProductTypes } from "../product/redux/product.types";


const ProductCreatePage = () => {

  const history = useHistory();
  const loginStateData = useSelector((state: any) => state.loginState);
  
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    price: Yup.string().required("This field is required"),
    qty: Yup.string().required("This field is required"),
    image: Yup.mixed().required()
  });

  const initialValues = {
    name: "",
    price: "",
    description: "",
    qty: "",
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

    await dispatch(productCreateAction(fd));

    const error = localStorage.getItem("error");
    if (!error) {
        history.push('/');
    }
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <>
    <FormikProvider value={formik}>
    <Header />
      {loginStateData?.loading ? (
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


          <button type="submit" className="btn btn-primary btn-block mt-2">Submit</button>
        </Form>
      )}
    </FormikProvider>
    </>
  );
};

export default ProductCreatePage;
