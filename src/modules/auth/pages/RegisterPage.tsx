import React from "react";
import RegisterCard from "../components/RegisterCard.component";

const RegisterPage = () => {

  return (
    <>
      <div className="login-page user-register-page">
        <div className="login-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-8 right-item register-col">
                <div className="card">
                  <div className="card-body login-card-body">
                    <RegisterCard />
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
export default RegisterPage;
