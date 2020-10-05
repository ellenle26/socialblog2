import React from "react";
import Moment from "react-moment";
import ReactionList from "components/ReactionList";
import { Card, Image } from "react-bootstrap";

const ReviewList = ({
  // reviews, handleEmojiClick, loading,
  blogDetail,
}) => {
  return (
    <Card.Text>
      <u>Comments : </u>
      <br />
      {console.log("review", blogDetail.reviews)}
      {blogDetail.reviews
        ? blogDetail.reviews.map((review) => (
            <div style={{ marginTop: "10px" }}>
              {
                <Image
                  src={
                    review.user.avatarUrl
                      ? review.user.avatarUrl
                      : "../images/defaultavapic.png"
                  }
                  alt=""
                  roundedCircle
                  style={{ width: "30px", height: "30px" }}
                />
              }{" "}
              &nbsp;
              {review.user.name ? (
                <span>{review.user.name} said : </span>
              ) : (
                <span>Noname said : </span>
              )}
              {review.content}
            </div>
          ))
        : "No comments"}
    </Card.Text>
    // <>
    //   {reviews?.length > 0 && (
    //     <ul className="list-unstyled">
    //       {reviews.map((review) => (
    //         <ReviewContent
    //           key={review._id}
    //           review={review}
    //           handleEmojiClick={handleEmojiClick}
    //           loading={loading}
    //         />
    //       ))}
    //     </ul>
    //   )}
    // </>
  );
};

// const ReviewContent = ({ review, handleEmojiClick, loading }) => {
//   return (

// <div className="comment">
//   <span className="comment_body">{review?.content}</span>
//   <br />
//   <span className="comment_by">posted by </span>
//   <span className="comment_user">{review?.user?.name}</span>
//   <span className="comment_on"> on </span>
//   <span className="comment_date">
//     <Moment fromNow>{review?.createdAt}</Moment>
//   </span>
//   <ReactionList
//     reactionsData={review.reactions}
//     targetType="Review"
//     targetId={review._id}
//     handleEmojiClick={handleEmojiClick}
//     loading={loading}
//     size="xs"
//   />
// </div>
//   );
// };

export default ReviewList;
