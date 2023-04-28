import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Store/AuthSlice";

import './MainNavigationPage.css';

const MainNavigationPage = () => {
   const dispatch=useDispatch();
  
    const onLogoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    dispatch(AuthActions.UpdateUserInfoLogout());
  };

  return (
    <header className="header">
      <nav className="header-navigation">
        <ul className="header-navigation__list">
          <li>
            <NavLink
              className={"header-navigation__list__title-home"}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={"header-navigation__list__title-chatbox"}
              to="/chatbox"
            >
              CHAT-BOX
            </NavLink>
          </li>
        </ul>
        <input onClick={onLogoutHandler} type="button" value="LOGOUT" />
      </nav>
    </header>
  );
};

export default MainNavigationPage;
