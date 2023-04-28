import { useRef } from "react";
import "./CreateGroup.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { PersonalGroupActions } from "../../Store/PersonalGroupSlice";

const CreateGroup = (props) => {
  const EnteredGroupName = useRef();
  const dispatch = useDispatch();

  const onCreateGroupHandler = async (e) => {
    e.preventDefault();
    const GroupInfo = {
      groupname: EnteredGroupName.current.value,
    };
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/group/creategroup",
      GroupInfo,
      { headers: { Authorization: token } }
    );
    dispatch(PersonalGroupActions.UserAddGroup(res.data.newGroupDetail));
    props.onCloseGroup();
  };
  const oncloseGroupHandler = () => {
    props.onCloseGroup();
  };

  return (
    <div className="main-creategroup">
      <h1>CREATE GROUP</h1>
      <form onSubmit={onCreateGroupHandler}>
        <label>Enter Group Name :</label>
        <input type="text" ref={EnteredGroupName} required />
        <input type="submit" value={`CREATE`} />
        <button onClick={oncloseGroupHandler}>CLOSE</button>
      </form>
    </div>
  );
};

export default CreateGroup;
