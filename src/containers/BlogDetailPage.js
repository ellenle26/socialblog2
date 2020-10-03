import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import Markdown from "react-markdown";
import { blogActions } from "redux/actions";
import ReviewList from "components/ReviewList";
import ReviewForm from "components/ReviewForm";
import ReactionList from "components/ReactionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import moment from "moment";

const BlogDetailPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  let blogDetail = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const submitLoading = useSelector((state) => state.blog.submitLoading);
  const [reviewText, setReviewText] = useState("");

  const getBlogDetail = () => {
    dispatch(blogActions.getBlogDetail(id));
  };

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(id, reviewText));
    setReviewText("");
  };

  const handleEmojiClick = (targetType, targetId, emoji) => {
    dispatch(blogActions.sendEmojiReaction(targetType, targetId, emoji));
  };

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  useEffect(() => {
    if(id) {
      getBlogDetail();
    }
  }, [id]);

  return (
    <>
      <div className="d-flex justify-content-between">
          <Button onClick={handleGoBackClick}>
            <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
          </Button>
          {currentUser?._id === blogDetail?.author?._id ? (
            <Link to={`/blog/edit/${blogDetail._id}`}>
              <Button variant="primary">
                <FontAwesomeIcon icon="edit" size="1x" /> Edit
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        {loading ? (
        <div className="text-center">
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </div>
      ) : (
      <>
        {blogDetail && (
          <Container
            style={{
              minHeight: "80vh",
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Col sm={12}> */}
              <Card>
                <Card.Body>
                  <Card.Title>{blogDetail.title}</Card.Title>
                  <div>
                    <Card.Text>{blogDetail.content}</Card.Text>{" "}
                    {blogDetail.images && (
                      <Image src={blogDetail.images[0]} style={{ width: "80%" }} />
                    )}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small
                    className="text-muted"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={
                        blogDetail.author.avatarUrl === ""
                          ? "../images/defaultavapic.png"
                          : `${blogDetail.author.avatarUrl}`
                      }
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                      roundedCircle
                    />{" "}
                    <div style={{ width: "fit-content", display: "flex" }}>
                      {blogDetail.author.name} <br /> wrote{" "}
                      {moment(blogDetail.updatedAt).fromNow()}
                    </div>
                  </small>
                </Card.Footer>
                <Card>
                  <Card.Body>asd</Card.Body>
                </Card>
              </Card>
            {/* </Col> */}
            
            <hr />
            <Markdown source={blogDetail.content} />
            <hr />
            <ReactionList
              reactionsData={blogDetail.reactions}
              targetType="Blog"
              targetId={blogDetail._id}
              handleEmojiClick={handleEmojiClick}
              loading={submitLoading}
              size="lg"
            />
            <hr />
            <ReviewList
              reviews={blogDetail.reviews}
              handleEmojiClick={handleEmojiClick}
              loading={submitLoading}
            />
          </Container>
        
          
        )}

          {isAuthenticated && (
              <ReviewForm
                reviewText={reviewText}
                handleInputChange={handleInputChange}
                handleSubmitReview={handleSubmitReview}
                loading={submitLoading}
              />
            )}

            
      </>
      )}
    </>
  );
};

export default BlogDetailPage;
