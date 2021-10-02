import { Field, Form, FormikProvider, useFormik } from "formik";
import React,{useEffect}from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { loginAction } from "../redux/login/login.actions";
import ErrorMessageShow from "../../../components/utilComponent/ErrorMessage.component";
import ContentLoading from "../../../components/Loading/ContentLoading.component";
import { REGEX } from "../../../utils/helpers/regex";
import SnackBarAlert from "../../../components/snack-bar/SnackBarAlert";
import { RegisterTypes } from "../redux/register/register.types";
import { LoginTypes } from "../redux/login/login.types";

const LoginCard = ({
  loginAction,
  loginStateData,
}: any) => {

  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(REGEX.EMAIL_REGEX, "Email is not valid")
      .required('This field is required'),
    password: Yup.string().required("This field is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    await loginAction(values);
  };
  
  useEffect(() => {
    if (loginStateData?.data?.isSuccess === true) {
      history.push("/");
    }
  }, [loginStateData?.data?.isSuccess])

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
      {loginStateData?.loading ? (
        <ContentLoading />
      ) : (
      <Form>
        <h3>Sign In</h3>
          <SnackBarAlert
            actionTypes={[
              RegisterTypes.REGISTER_SUCCESS,
              LoginTypes.LOGIN_FAILED
            ]}
          />
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

          <button type="submit" className="btn btn-primary btn-block mt-2">Submit</button>
          <p className="forgot-password text-right">
              Register  <Link to="/register"> Register </Link>
          </p>
        </Form>
      )}
    </FormikProvider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginState
  };
};

export default connect(mapStateToProps, { loginAction })(LoginCard);
