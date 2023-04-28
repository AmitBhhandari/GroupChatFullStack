import "./HomePage.css";

import ImageProfile from "../../Images/UserProfile.png";
import { useSelector } from "react-redux";
import axios from "axios";

const HomePage = () => {
  const UserName = useSelector((state) => state.auth.name);

  const onPasswordForgotHandler = async () => {
    const obj = {
      email: localStorage.getItem("email"),
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
    <div className="main-header">
      <h1 className="main-header__title">WELCOME TO CHAT-BOX APP</h1>
      <div className="main-header__profile">
        <h1>PROFILE</h1>
        <img src={ImageProfile}></img>
        <h2>{UserName.toUpperCase()}</h2>
        <button onClick={onPasswordForgotHandler}>CHANGE PASSWORD</button>
      </div>
    </div>
  );
};

export default HomePage;
