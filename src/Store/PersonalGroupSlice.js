import { createSlice, current } from "@reduxjs/toolkit";

const InitialState = {
  ListOfUserGroup: [],
  isGroupActive: [],
  isActiveGroupName: `No Group Selected`,
  isGroupId: false,
  isActiveGroupMember: [],
  isGrpupMesseges: [],
};

const PersonalGroupSlice = createSlice({
  name: "PersonalUserGroupInfo",
  initialState: InitialState,
  reducers: {
    UpdatedUserGroupsInfo(state, action) {
      const GroupInfoupdate = [];
      const Groups = action.payload;
      Groups.map((data) => {
        const GroupInfo = {
          groupName: data.groupName,
          groupId: data.groupId,
        };
        GroupInfoupdate.push(GroupInfo);
      });
      state.isGroupId = GroupInfoupdate;
      state.ListOfUserGroup = Groups;
    },
    UserAddGroup(state, action) {
      const NewGroup = action.payload;
      state.ListOfUserGroup = [...state.ListOfUserGroup, NewGroup];
    },
    UserCurrentActiveGroup(state, action) {
      const CurrentActiveGroup = action.payload;
      state.isActiveGroupName = CurrentActiveGroup[0].groupName;
      state.isGroupActive = CurrentActiveGroup;
    },
    getGroupMembers(state, action) {
      state.isActiveGroupMember = action.payload;
    },
    AddUserToGroup(state, action) {
      const UpdatedUser = action.payload;
      state.isActiveGroupMember = UpdatedUser;
    },
    RemoveUserFromGroup(state, action) {
      const userid = action.payload;
      console.log(userid);
      const UpdatedData = state.isActiveGroupMember.filter((data) => {
        return data.userId != userid;
      });
      state.isActiveGroupMember = UpdatedData;
    },
    RemoveGroupUser(state, action) {
      const GroupId = action.payload;
      console.log(current(state.ListOfUserGroup));
      const UpdatedGroups = state.ListOfUserGroup.filter((data) => {
        return data.groupId != GroupId;
      });
      state.ListOfUserGroup = UpdatedGroups;
    },
    isGroupIdUpdate(state, action) {
      state.isGroupId = action.payload;
    },
    isGroupMsgUpdate(state, action) {
      const AllGroupmsg = action.payload;
      state.isGrpupMesseges = AllGroupmsg;
    },
    newGroupMessageRecived(state, action) {
      const NeMessage = action.payload;
      state.isGrpupMesseges = [...state.isGrpupMesseges, NeMessage];
    },
  },
});

export default PersonalGroupSlice.reducer;

export const PersonalGroupActions = PersonalGroupSlice.actions;
