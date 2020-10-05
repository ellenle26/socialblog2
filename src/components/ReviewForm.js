import React from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

const ReviewForm = ({
  currentUser,
  // reviewText,
  handleInputChange,
  handleComment,
  // loading,
}) => {
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        height: "fit-content!important",
      }}
    >
      <Col sm={1}>
        <Image
          src={
            currentUser.avatarUrl == ""
              ? "../images/defaultavapic.png"
              : currentUser.avatarUrl
          } //apear img after login
          style={{
            width: "30px",
            height: "30px",
          }}
          roundedCircle
        />
      </Col>
      <Col sm={11}>
        <Form inline onSubmit={(e) => handleComment(e)}>
          <Form.Control
            type="text"
            placeholder="Comment something"
            style={{ width: "80%" }}
            onChange={(e) => handleInputChange(e)}
          />
          &nbsp;
          <Button variant="secondary" type="submit">
            Send
          </Button>
        </Form>
      </Col>
    </Row>
    // <Form onSubmit={handleSubmitReview}>
    //   <Form.Group as={Row}>
    //     <Form.Label htmlFor="review" column sm="2">
    //       Review:
    //     </Form.Label>
    //     <Col sm="8">
    //       <Form.Control
    //         id="review"
    //         type="text"
    //         value={reviewText}
    //         onChange={handleInputChange}
    //       />
    //     </Col>
    //     {loading ? (
    //       <Button variant="primary" type="button" disabled>
    //         <span
    //           className="spinner-border spinner-border-sm"
    //           role="status"
    //           aria-hidden="true"
    //         ></span>
    //         Submitting...
    //       </Button>
    //     ) : (
    //       <Button type="submit" disabled={!reviewText}>
    //         Submit
    //       </Button>
    //     )}
    //   </Form.Group>
    // </Form>
  );
};

export default ReviewForm;
