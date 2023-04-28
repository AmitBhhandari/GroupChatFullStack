import { Fragment } from "react";
import "./GroupParticipantsUi.css";

const GroupParticipantsUi = (props) => {

const onRemoveUserHandler = ()=>{
    props.onRemove();
}
  return (
    <Fragment>
      <li className={props.isAdmin ? `admintrue` : `adminfalse`} onClick={onRemoveUserHandler}>
        {props.UserName}
      </li>
    </Fragment>
  );
};

export default GroupParticipantsUi;
