import { Fragment } from "react";
import "./GroupListUi.css";

const GroupListUi = (props) => {
  const onInfoOfSingleGroup = () => {
    props.onGetGroupInfo();
  };
  const onRemoveGroupHandler = () => {
    props.onDeleteGroup();
  };

  return (
    <Fragment>
      <div>
        <li onClick={onInfoOfSingleGroup}>{props.GroupName}</li>
        {props.isuserName && (
          <button
            className="group-remove_button"
            onClick={onRemoveGroupHandler}
          >
            X
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default GroupListUi;