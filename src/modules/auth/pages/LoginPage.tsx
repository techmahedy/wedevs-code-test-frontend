import React from "react";
import LoginCard from "../components/LoginCard.component";
import { connect } from "react-redux";

const LoginPage = (loginStateData) => {

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-8 right-item login-col">
                <div className="card">
                  <div className="card-body login-card-body">
                    <LoginCard />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 bottom-item" id="footer">
                <div className="login-footer">
                  <div className="footer-copyright">
                     All Right Reserved By Example.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    loginStateData: state?.loginStateData,
  };
};
export default connect(mapStateToProps)(LoginPage);
