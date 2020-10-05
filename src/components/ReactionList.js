import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Form,
  Col,
  Row,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import {
  faLaugh,
  faFrown,
  faThumbsUp,
  faHeart,
  faAngry,
} from "@fortawesome/free-regular-svg-icons";
import "App.css";

const ReactionList = ({
  blogDetail,
  // reactionsData,
  // targetType,
  // targetId,
  handleEmojiClick,
  // loading,
  // size,
}) => {
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="emoji"
        onClick={() => handleEmojiClick("Blog", blogDetail._id, "laugh")}
      >
        <FontAwesomeIcon icon={faLaugh} size="lg" />
        <span> &nbsp;{blogDetail.reactions.laugh}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="emoji"
        onClick={() => handleEmojiClick("Blog", blogDetail._id, "sad")}
      >
        <FontAwesomeIcon icon={faFrown} size="lg" />
        <span> &nbsp;{blogDetail.reactions.sad}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="emoji"
        onClick={() => handleEmojiClick("Blog", blogDetail._id, "like")}
      >
        <FontAwesomeIcon icon={faThumbsUp} size="lg" />
        <span> &nbsp;{blogDetail.reactions.like}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="emoji"
        onClick={() => handleEmojiClick("Blog", blogDetail._id, "love")}
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <span> &nbsp;{blogDetail.reactions.love}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="emoji"
        onClick={() => handleEmojiClick("Blog", blogDetail._id, "angry")}
      >
        <FontAwesomeIcon icon={faAngry} size="lg" />
        <span> &nbsp;{blogDetail.reactions.angry}</span>
      </div>
    </div>

    // <div>
    //   <ul className="reactions">
    //     <li>
    //       <button
    //         onClick={() => handleEmojiClick(targetType, targetId, "like")}
    //         disabled={loading}
    //       >
    //         <FontAwesomeIcon icon="thumbs-up" size={size} />
    //       </button>
    //       {reactionsData?.like}{" "}
    //     </li>
    //     <li>
    //       <button
    //         onClick={() => handleEmojiClick(targetType, targetId, "love")}
    //         disabled={loading}
    //       >
    //         <FontAwesomeIcon icon="heart" size={size} />
    //       </button>
    //       {reactionsData?.love}{" "}
    //     </li>
    //     <li>
    //       <button
    //         onClick={() => handleEmojiClick(targetType, targetId, "laugh")}
    //         disabled={loading}
    //       >
    //         <FontAwesomeIcon icon="laugh" size={size} />
    //       </button>
    //       {reactionsData?.laugh}{" "}
    //     </li>
    //     <li>
    //       <button
    //         onClick={() => handleEmojiClick(targetType, targetId, "sad")}
    //         disabled={loading}
    //       >
    //         <FontAwesomeIcon icon="sad-cry" size={size} />
    //       </button>
    //       {reactionsData?.sad}{" "}
    //     </li>
    //     <li>
    //       <button
    //         onClick={() => handleEmojiClick(targetType, targetId, "angry")}
    //         disabled={loading}
    //       >
    //         <FontAwesomeIcon icon="angry" size={size} />
    //       </button>
    //       {reactionsData?.angry}{" "}
    //     </li>
    //   </ul>
    // </div>
  );
};

export default ReactionList;
