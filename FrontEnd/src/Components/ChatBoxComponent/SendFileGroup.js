import axios from "axios";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { PersonalGroupActions } from "../../Store/PersonalGroupSlice";

import "./SendFileGroup.css";


const SendFileGroup = (props) => {
  const GroupId = useSelector((state) => state.PersonalGroups.isGroupId);

  const dispatch = useDispatch();

  const onFileSendHandler = async (e, formData) => {
    e.preventDefault();
    uploadFile(formData);
    props.onclose();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    onFileSendHandler(e, formData);
    form.reset();
  };

  async function uploadFile(formData) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/media/sendmedia/${GroupId}`,
        formData,
        {
          headers: { Authorization: token },
        }
      );
      const data = res.data.response;
      const newData = { ...data, url: res.data.url };
      console.log(newData);
      dispatch(PersonalGroupActions.newGroupMessageRecived(newData));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-filesend">
    <form id="myForm" onSubmit={handleSubmit}>
      <input type="file" name="myFile" id="myfile" />
      <button type="submit">Upload</button>
    </form>
    </div>
  );
};

export default SendFileGroup;
