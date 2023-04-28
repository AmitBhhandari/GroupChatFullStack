import { useRef } from "react";
import axios from "axios";

import "./ForgotPassword.css";

const ForgotPassword = (props) => {
  const UserEnteredEmailRef = useRef();

  const GoLoginPage = () => {
    props.onLoginPageBack();
  };

  const onPasswordForgotHandler = async (e) => {
    e.preventDefault();
    const email = UserEnteredEmailRef.current.value;
    props.onPasswordForgot(email);
    const obj = {
      email: email,
    };
    try {
      const data = await axios.post(
        "http://localhost:5000/password/forgotpassword",
        obj
      );
      console.log(data.data);
      alert("Cheack Your Email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-form">
      <h2 className="main-form__title">FORGOT PASSWORD</h2>
      <form onSubmit={onPasswordForgotHandler} className="main-form__data">
        <label className="main-form__data_label">Enter Email: </label>
        <input ref={UserEnteredEmailRef} type="email" required />
        <input
          type="submit"
          value="Get Password Reset Link"
          className="main-form__data_button"
        />
      </form>
      <button onClick={GoLoginPage}>Go Back To Login</button>
    </div>
  );
};

export default ForgotPassword;
