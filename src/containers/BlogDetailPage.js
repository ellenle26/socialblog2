import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "redux/actions";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import moment from "moment";

const BlogDetailPage = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  let blogDetail = useSelector((state) => state.blog.selectedBlog);

  const getBlogDetail = () => {
    dispatch(blogActions.getBlogDetail(id));
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    blogDetail && (
      <Container
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col sm={12}>
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
        </Col>
      </Container>
    )
  );
};

export default BlogDetailPage;
