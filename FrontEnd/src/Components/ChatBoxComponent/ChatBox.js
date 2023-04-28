import "./ChatBox.css";
import GroupList from "./GroupList";
import ChatBoxMessage from "./ChatBoxMessage";
import GroupParticipants from "./GroupParticipants";
import { Fragment, useRef, useState } from "react";
import AddMemberToGroup from "./AddMemberToGroup";
import { useDispatch, useSelector } from "react-redux";
import { PersonalGroupActions } from "../../Store/PersonalGroupSlice";
import { SendMessageInGroup } from "../../Store/GroupActions";
import SendFileGroup from "./SendFileGroup";

const ChatBox = () => {
  const [isGroupInfo, SetIsGroupInfo] = useState(false);
  const [showMessageBox, setIsMessageBox] = useState(false);
  const [isGroupAdd, SetIsGroupAdd] = useState(false);
  const [groupInfo, setIsGroupInfo] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSendFile, setIsSendFile] = useState(false);
  const GroupId = useSelector((state) => state.PersonalGroups.isGroupId);

  const UserEnteredMessgaerRef = useRef();

  const dispatch = useDispatch();

  const oncloseGroupInfoHandler = () => {
    SetIsGroupInfo(!isGroupInfo);
  };
  const onAddMemberToGroup = () => {
    SetIsGroupAdd(!isGroupAdd);
  };
  const onAdminHandler = (result) => {
    setIsAdmin(result);
  };

  const onShowSendFileHandler = () => {
    setIsSendFile(!isSendFile);
  };

  const onMessageSender = (e) => {
    e.preventDefault();
    const messageuser = UserEnteredMessgaerRef.current.value;
    const sendMessage = {
      message: messageuser,
    };
    dispatch(SendMessageInGroup(sendMessage, GroupId));
    console.log(sendMessage);
    UserEnteredMessgaerRef.current.value = " ";
  };
  const onGetGroupData = (data) => {
    setIsMessageBox(true);
    dispatch(PersonalGroupActions.isGroupIdUpdate(data.groupId));
    const newData = [{ ...data }];
    dispatch(PersonalGroupActions.UserCurrentActiveGroup(newData));
    setIsGroupInfo(!groupInfo);
  };

  return (
    <div>
      {isGroupInfo && (
        <GroupParticipants onShowGroupInfo={oncloseGroupInfoHandler} />
      )}
      {isGroupAdd && <AddMemberToGroup onAddMember={onAddMemberToGroup} />}
      <GroupList ongetGroupInfo={onGetGroupData} onadmin={onAdminHandler} />
      <div className="main-chatbox__message">
        <section className="main-chatbox__message_position">
          <ChatBoxMessage
            isAdmin={isAdmin}
            onShowGroupInfo={oncloseGroupInfoHandler}
            onAddMember={onAddMemberToGroup}
          />
          {showMessageBox && (
            <form
              onSubmit={onMessageSender}
              className="main-chatbox__message_position_send"
            >
              <input
                ref={UserEnteredMessgaerRef}
                type="text"
                className="main-chatbox__message_position_send-text"
                placeholder="type a text"
                required
              />

              <input
                type="submit"
                value={`SEND`}
                className="main-chatbox__message_position_send-button"
              />
            </form>
          )}
          {showMessageBox && <button className={isAdmin?`main-chatbox__message_position_send-button-sendfile-admin` : `main-chatbox__message_position_send-button-sendfile-noadmin`}  onClick={onShowSendFileHandler}>SEND FILE</button>}
          {isSendFile && <SendFileGroup onclose={onShowSendFileHandler}/>}
        </section>
      </div>
    </div>
  );
};

export default ChatBox;
