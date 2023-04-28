import GroupParticipantsUi from "../ChatBoxUis/GroupParticipantsUi";
import "./GroupParticipants.css";
import { useSelector } from "react-redux";
import { RemoveMemberFromGroup } from "../../Store/GroupActions";
import { useDispatch } from "react-redux";

const GroupParticipants = (props) => {
  const dispatch = useDispatch();

  const GroupUser = useSelector(
    (state) => state.PersonalGroups.isActiveGroupMember
  );

  const onRemoveUserHandler = (data) => {
    dispatch(RemoveMemberFromGroup(data.groupId, data.userId));
  };

  const UpdatedGroupUser = GroupUser.map((data) => {
    return (
      <GroupParticipantsUi
        key={Math.random()}
        id={data.id}
        UserName={data.userName}
        isAdmin={data.is_admin}
        onRemove={onRemoveUserHandler.bind(this, data)}
      />
    );
  });
  const onCloseGroupInfoHandler = () => {
    props.onShowGroupInfo();
  };

  return (
    <div className="main-groupparticipants">
      <ul>
        <h3>GROUP MEMBER</h3>
        {UpdatedGroupUser}
      </ul>
      <button onClick={onCloseGroupInfoHandler}>CLOSE</button>
    </div>
  );
};

export default GroupParticipants;
