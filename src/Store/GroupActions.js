import axios from "axios";
import { PersonalGroupActions } from "./PersonalGroupSlice";

export const GetUpdatedGroup = () => {
  return async (dispatch) => {
    const GroupsInfo = async () => {
      const token = localStorage.getItem("token");
      const res = await axios(`http://localhost:5000/group/getgroups`, {
        headers: { Authorization: token },
      });

      return res.data;
    };
    try {
      const data = await GroupsInfo();
      dispatch(PersonalGroupActions.UpdatedUserGroupsInfo(data.allgrpusr));
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetGroupMember = (groupid) => {
  return async (dispatch) => {
    const GetGroupMember = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/group/getgroupusers/${groupid}`,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    };
    try {
      const data = await GetGroupMember();
      const Users = data.allgrpusr;
      dispatch(PersonalGroupActions.getGroupMembers(Users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const AddMemberToGroupAdmin = (memberdetail) => {
  return async (dispatch) => {
    const AddMemberToGroup = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/group/addusertogroup",
        memberdetail,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    };
    try {
      const data = await AddMemberToGroup();
      console.log(data.allgrpusr);
      dispatch(PersonalGroupActions.AddUserToGroup(data.allgrpusr));
    } catch (err) {
      console.log(err);
    }
  };
};

export const RemoveMemberFromGroup = (groupid, userid) => {
  return async (dispatch) => {
    const RemoveMemberFromGroup = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/group/deleteuser/${groupid}/${userid}`,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    };
    try {
      await RemoveMemberFromGroup();
      dispatch(PersonalGroupActions.RemoveUserFromGroup(userid));
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteUserGroup = (groupid) => {
  return async (dispatch) => {
    const DeleteUserGroup = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/group/deletegroup/${groupid}`,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    };
    try {
      await DeleteUserGroup();
      dispatch(PersonalGroupActions.RemoveGroupUser(groupid));
    } catch (err) {
      console.log(err);
    }
  };
};

export const SendMessageInGroup = (message, groupId) => {
  return async (dispatch) => {
    const SendMessageInGroup = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/message/sendmsg/${groupId}`,
        message,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    };
    try {
      const data = await SendMessageInGroup();
      dispatch(PersonalGroupActions.newGroupMessageRecived(data.newUserDetail));
    } catch (err) {
      console.log(err);
    }
  };
};

export const GetAllGroupMessages = (groupId) => {
  return async (dispatch) => {
    const GetGroupMesseges = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/message/getgroupmessages/${groupId}`,
        {
          headers: { Authorization: token },
        }
      );

      return res.data;
    };
    try {
      const data = await GetGroupMesseges();
      dispatch(PersonalGroupActions.isGroupMsgUpdate(data.messages));
    } catch (err) {
      console.log(err);
    }
  };
};
