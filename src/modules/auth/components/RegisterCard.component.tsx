import { Field, Form, FormikProvider, useFormik } from "formik";
import React,{useEffect}from "react";
import {  useSelector , useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import ErrorMessageShow from "../../../components/utilComponent/ErrorMessage.component";
import { registerAction } from "../redux/register/register.actions";
import { REGEX } from "../../../utils/helpers/regex";
import ContentLoading from "../../../components/Loading/ContentLoading.component";
import SnackBarAlert from "../../../components/snack-bar/SnackBarAlert";
import { RegisterTypes } from "../redux/register/register.types";

const RegisterCard = () => {
  
  const registerStateData = useSelector((state: any) => state.registerState);
  const loginStateData = useSelector((state: any) => state.loginState);
 
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: ""
  };
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Full Name must be at least 6 characters")
      .max(20, "Full Name must be at most 20 characters")
      .required("Enter full name"),
    email: Yup.string()
      .matches(REGEX.EMAIL_REGEX, "Email is not valid")
      .required("Enter email address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Enter password"),
    confirm_password: Yup.string()
      .when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Enter confirm password"),
    role: Yup.mixed().required("This field is required"),
  });

  if (registerStateData?.data?.isSuccess === true) {
    history.push("/login");
  }
  
  useEffect(() => {
    if (loginStateData?.data?.isSuccess === true) {
      history.push("/");
    }
  }, [loginStateData?.data?.isSuccess])

  const onSubmit = async (values: any) => {
    delete values?.confirm_password;
    await dispatch(registerAction(values));
  };

  
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
    {registerStateData?.loading ? (
      <ContentLoading />
    ) : (
    <Form>
      <h3>Create an Account</h3>
         <SnackBarAlert
            actionTypes={[
              RegisterTypes.REGISTER_FAILED
            ]}
          />
        <div className="form-group">
            <label>Name</label>
            <Field type="text" name="name" className="form-control" placeholder="Enter name" />
            <ErrorMessageShow formik={formik} name="name" />
        </div>

        <div className="form-group">
            <label>Email address</label>
            <Field type="email" name="email" className="form-control" placeholder="Enter email" />
            <ErrorMessageShow formik={formik} name="email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <Field type="password" name="password" className="form-control" placeholder="Enter password" />
            <ErrorMessageShow formik={formik} name="password" />
        </div>

        <div className="form-group">
            <label>Confirm Password</label>
            <Field type="password" name="confirm_password" className="form-control" placeholder="Enter confirm password" />
            <ErrorMessageShow formik={formik} name="confirm_password" />
        </div>

        <div className="form-group">
            <label>Select Type</label>
            <Field
                as="select"
                name="role"
                className="form-control"
              >
                <option value="0" selected> Select Role </option>
                <option value="admin"> Admin </option>
                <option value="buyer"> Buyer </option>
              </Field>
            <ErrorMessageShow formik={formik} name="role" />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-2">Submit</button>
        <p className="forgot-password text-right">
            Already have an account?  <Link to="/login"> Login </Link>
        </p>
      </Form>
    )}
  </FormikProvider>
  );
};

export default RegisterCard;
