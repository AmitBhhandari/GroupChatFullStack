import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../Store/AuthSlice";

import "./Login.css";

import axios from "axios";
import { useNavigate } from "react-router";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [Login, setIsLogin] = useState(true);
  const [isUserResetPassword, SetUserResetPassword] = useState(false);

  let url;
  const EnteredNameRef = useRef();
  const EnteredEmailRef = useRef();
  const EnteredPasswordRef = useRef();
  const EnteredMobileNoRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let EnteredName = " ";
    let EnteredMobileno = " ";
    if (!Login) {
      EnteredName = EnteredNameRef.current.value;
      EnteredMobileno = EnteredMobileNoRef.current.value;
    }
    const EnteredEmail = EnteredEmailRef.current.value;
    const EnteredPassword = EnteredPasswordRef.current.value;

    if (Login) {
      url = `http://localhost:5000/user/login`;
    } else {
      url = `http://localhost:5000/user/signup`;
    }
    const loginDetails = {
      email: EnteredEmail,
      password: EnteredPassword,
    };
    const SignInDetails = {
      name: EnteredName,
      phone: EnteredMobileno,
      email: EnteredEmail,
      password: EnteredPassword,
    };
    const LoginObject = Login ? loginDetails : SignInDetails;

    const UserLoginHandler = async (loginDetails) => {
      await axios
        .post(url, loginDetails)
        .then((res) => {
          if (Login) {
            const email = res.data.email;
            const name = res.data.name;
            const token = res.data.token;
            console.log(token);
            const UserInfo = {
              email,
              name,
              token,
            };
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("token", res.data.token);
            dispatch(AuthActions.UpdateUserInfoLogin(UserInfo));
            Navigate('/home');
            window.location.reload(true);
          }

          if (!Login) {
            setIsLogin(!Login);
          }
        })
        .catch((err) => {
          alert("Cheack Your Email And Password");
          console.log(err);
        });
    };
    EnteredEmailRef.current.value = " ";
    EnteredPasswordRef.current.value = " ";
    UserLoginHandler(LoginObject);
  };

  const onLoginHandler = () => {
    setIsLogin(!Login);
  };

  const onPasswordHandler = () => {
    SetUserResetPassword(!isUserResetPassword);
  };

  const onPasswordForgotHandler = async (enteredmail) => {
    const obj = {
      email: enteredmail,
    };
    try {
      const data = await axios.post("http://localhost:5000/auth/forgot", obj);
      SetUserResetPassword(!isUserResetPassword);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {!isUserResetPassword && (
        <div className="form-main">
          <h1 className="form-main__title">
            {Login ? `Login Form` : `SignUp Form`}
          </h1>
          <form className="form-main__form" onSubmit={onSubmitHandler}>
            {!Login && (
              <label name="email" id="email">
                Enter Your Name:{" "}
              </label>
            )}
            {!Login && <input type="text" ref={EnteredNameRef} required />}
            {!Login && (
              <label name="email" id="email">
                Enter Your Mobile No:{" "}
              </label>
            )}
            {!Login && <input type="text" ref={EnteredMobileNoRef} required />}

            <label name="email" id="email">
              Enter Your Email:{" "}
            </label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              ref={EnteredEmailRef}
              required
            />
            <label name="password" id="password">
              Enter Your password:{" "}
            </label>
            <input type="password" ref={EnteredPasswordRef} required />
            <input
              type="submit"
              className="form-main__form_button"
              value={Login ? `Login` : `SignUp`}
            ></input>
            {Login && (
              <input
                type="button"
                className="form-main__form_button"
                value={`CreateAccount`}
                onClick={onLoginHandler}
              ></input>
            )}
            {Login && (
              <input
                type="button"
                className="form-main__form_button"
                value={`ForgotPassword`}
                onClick={onPasswordHandler}
              ></input>
            )}
            {!Login && (
              <input
                type="button"
                className="form-main__form_button"
                value={`BackToLogin`}
                onClick={onLoginHandler}
              ></input>
            )}
          </form>
        </div>
      )}
      {isUserResetPassword && (
        <ForgotPassword
          onLoginPageBack={onPasswordHandler}
          onPasswordForgot={onPasswordForgotHandler}
        />
      )}
    </Fragment>
  );
};

export default Login;
