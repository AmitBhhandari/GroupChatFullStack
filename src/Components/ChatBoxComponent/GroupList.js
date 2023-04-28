import { useEffect, useState } from "react";
import "./GroupList.css";
import CreateGroup from "./CreateGroup";
import GroupListUi from "../ChatBoxUis/GroupListUi";
import { useDispatch, useSelector } from "react-redux";

import { GetUpdatedGroup } from "../../Store/GroupActions";
import { GetGroupMember } from "../../Store/GroupActions";
import { DeleteUserGroup } from "../../Store/GroupActions";
import { GetAllGroupMessages } from "../../Store/GroupActions";
const GroupList = (props) => {
  const [createGroup, setIsCreateGrpup] = useState(false);
  const dispatch = useDispatch();
  const GroupList = useSelector(
    (state) => state.PersonalGroups.ListOfUserGroup
  );

  const GetSingleGroupInfo = (data) => {
    if (data.is_admin) {
      props.onadmin(true);
    } else {
      props.onadmin(false);
    }
    props.ongetGroupInfo(data);
    dispatch(GetAllGroupMessages(data.groupId));
    dispatch(GetGroupMember(data.groupId));
  };

  const onDeleteGroupHandler = (data) => {
    dispatch(DeleteUserGroup(data.groupId));
  };

  let UpdatedData;
  if (GroupList.length >= 1) {
    UpdatedData = GroupList.map((data) => {
      return (
        <GroupListUi
          isuserName={data.is_admin}
          key={data.id}
          id={data.id}
          GroupName={data.groupName}
          onGetGroupInfo={GetSingleGroupInfo.bind(this, data)}
          onDeleteGroup={onDeleteGroupHandler.bind(this, data)}
        />
      );
    });
  }

  const onsetIsCreateGroup = () => {
    setIsCreateGrpup(!createGroup);
  };

  useEffect(() => {
    dispatch(GetUpdatedGroup());
  }, []);

  return (
    <div className="main-grouplist">
      <h1>Group List</h1>
      <button onClick={onsetIsCreateGroup}>ADD GROUP</button>
      {createGroup && <CreateGroup onCloseGroup={onsetIsCreateGroup} />}
      <ul className="main-grouplist__list">{UpdatedData}</ul>
    </div>
  );
};
export default GroupList;
