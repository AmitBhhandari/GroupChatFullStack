import { useRef } from "react";
import "./AddMemberToGroup.css";
import { useDispatch } from "react-redux";
import { AddMemberToGroupAdmin } from "../../Store/GroupActions";

const AddMemberToGroup = (props) => {
  const dispatch = useDispatch();
  const EnteredUsernameRef = useRef();
  const EnteredGroupNameRef = useRef();
  const wantToChooseAdminRef = useRef();

  const onAddMemberToGroup = (e) => {
    e.preventDefault();
    props.onAddMember();

    const NewMember = {
      username: EnteredUsernameRef.current.value,
      is_admin: wantToChooseAdminRef.current.value,
      groupName: EnteredGroupNameRef.current.value,
    };
    console.log(NewMember);
    dispatch(AddMemberToGroupAdmin(NewMember));

    EnteredGroupNameRef.current.value = " ";
    wantToChooseAdminRef.current.value = " ";
  };
  const onCloseAddMember = () => {
    props.onAddMember();
  };

  return (
    <div className="main-addmember">
      <h3>ADD MEMBER</h3>
      <form onSubmit={onAddMemberToGroup}>
        <label>ENTER USERNAME: </label>
        <input type="text" ref={EnteredUsernameRef} />
        <label>ENTER GROUPNAME : </label>
        <input type="text" ref={EnteredGroupNameRef} />
        <label>ADD ADMIN: </label>
        <select ref={wantToChooseAdminRef}>
          <option value={`Yes`}>Yes</option>
          <option value={`No`}>No</option>
        </select>
        <input
          className="main-addmember_form_button"
          type="submit"
          value={`ADD TO GROUP`}
        />
      </form>
      <button onClick={onCloseAddMember}>CLOSE</button>
    </div>
  );
};

export default AddMemberToGroup;
