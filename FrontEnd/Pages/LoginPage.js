import { Fragment } from "react";
import Login from "../LoginComponent/Login";
import { Outlet } from "react-router-dom";
import MainNavigationPage from "./MainNavigationPage";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../Store/AuthSlice";

const LoginPage = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (
    localStorage.getItem("email") &&
    localStorage.getItem("name") &&
    localStorage.getItem("token")
  ) {
    const UserInfo = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
    };
    dispatch(AuthActions.UpdateUserInfoLogin(UserInfo));

  }

  return (
    <Fragment>
      {!isLogin && <Login />}
      {isLogin && <MainNavigationPage />}
      {isLogin && (
        <div className="correction">
          <Outlet />
        </div>
      )}
    </Fragment>
  );
};
export default LoginPage;
