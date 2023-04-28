import { useState } from "react";
import "./ChatBoxMessage.css";
import { useSelector } from "react-redux";
import GroupMessageUi from "../ChatBoxUis/GroupMessageUi";

const ChatBoxMessage = (props) => {
  const GroupName = useSelector(
    (state) => state.PersonalGroups.isActiveGroupName
  );
  const GroupMessages = useSelector(
    (state) => state.PersonalGroups.isGrpupMesseges
  );
  const GroupId = useSelector((state) => state.PersonalGroups.isGroupId);
 console.log(GroupMessages);
  const GroupMessageslist = GroupMessages.map((data) => {
    return (
      <GroupMessageUi
        key={data.msgid}
        id={data.msgid}
        userName={data.Username}
        message={data.message}
      />
    );
  });

  const onCloseGroupInfoHandler = () => {
    props.onShowGroupInfo();
  };

  const onAddMemberToGroup = () => {
    props.onAddMember();
  };

  return (
    <div className="main-user-message">
      <h1>{GroupName}</h1>

     {props.isAdmin && <div className="main-user-message__button">
        <button onClick={onCloseGroupInfoHandler}>GROUP INFO</button>
        <button onClick={onAddMemberToGroup}>ADD MEMBER</button>
      </div>}
      <ul className="main-user-message_list">{GroupMessageslist}</ul>
    </div>
  );
};

export default ChatBoxMessage;
