import { Fragment } from "react";

const GroupMessageUi = (props) => {
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const cheack = isValidUrl(props.message);

  const Username = localStorage.getItem("name");
  return (
    <Fragment>
      {!cheack ? (
        <div
          className={
            Username == props.userName
              ? `main-user-message_list_sender`
              : `main-user-message_list_reciver`
          }
        >
          <li className="main-user-message_list_username">{props.userName}</li>
          <li className="main-user-message_list_messege">{props.message}</li>
        </div>
      ) : (
        <div
          className={
            Username == props.userName
              ? `group-message_media-sender`
              : `group-message_media-reciver`
          }
        >
          <label>{props.userName}</label>
          <a href={props.message}>DOWNLOAD IMAGE</a>
        </div>
      )}
    </Fragment>
  );
};

export default GroupMessageUi;
