import React, { lazy, Suspense, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch ,useHistory } from "react-router-dom";
import Preloader from "./components/Preloader/preloader.components";
import PrivateRoute from "./customRoutes/private.route";
import DeliverListPage from "./modules/admin/DeliverListPage";
import OrderListPage from "./modules/admin/OrderListPage";
import ProductCreatePage from "./modules/admin/ProductCreatePage";
import ProductEditPage from "./modules/admin/ProductEditPage";
import OrderHistory from "./modules/auth/pages/OrderHistory";
import OrderDetailsPage from "./modules/buyer/OrderDetailsPage";
import ProductDetailsPage from "./modules/product/ProductDetailsPage";

const LoginCardComponent = lazy(() => import("./modules/auth/components/LoginCard.component"));
const RegisterCardComponent = lazy(() => import("./modules/auth/components/RegisterCard.component"));
const HomePage = lazy(() => import("./modules/auth/pages/HomePage"));

const App = () => {
  
  const loginStateData = useSelector((state: any) => state.loginState);

  return (
    <div className="auth-wrapper">
        <div className="auth-inner">
          <Suspense fallback={<Preloader />}>
            <Router>
              <Switch>
                <Route exact={true} path="/login" component={LoginCardComponent} />
                <Route exact={true} path="/register" component={RegisterCardComponent} />
                <PrivateRoute exact={true} path="/" Component={HomePage}/>
                <PrivateRoute exact={true} path="/product/details/:id" Component={ProductDetailsPage}/>
                <PrivateRoute exact={true} path="/product/create" Component={ProductCreatePage}/>
                <PrivateRoute exact={true} path="/product/edit/:id" Component={ProductEditPage}/>
                <PrivateRoute exact={true} path="/order/list" Component={OrderListPage}/>
                <PrivateRoute exact={true} path="/deliver/list" Component={DeliverListPage}/>
                <PrivateRoute exact={true} path="/order/details/:id" Component={OrderDetailsPage}/>
                <PrivateRoute exact={true} path="/order/activity" Component={OrderHistory}/>
              </Switch>
            </Router>
          </Suspense>
        </div>
    </div>
  );
};

export default App;

