import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import moment from "moment";
import "App.css";

const BlogCard = ({ blog, gotoBlogDetail }) => {
  return (
    blog && (
      <Col sm={6} style={{ marginBottom: "20px", maxWidth: "320px" }}>
        {console.log(blog._id)}
        <Card>
          <Card.Body>
            <Card.Title
              style={{
                height: "50px",
                borderBottom: "solid 1px lightgrey",
                overflow: "hidden",
              }}
              onClick={() => {
                gotoBlogDetail(blog._id);
              }}
            >
              {blog.title}
            </Card.Title>
            <div
              style={{
                height: "200px",
                overflow: "scroll",
                textAlign: "center",
              }}
            >
              <Card.Text>{blog.content}</Card.Text>{" "}
              {blog.images && (
                <Image src={blog.images[0]} style={{ width: "80%" }} />
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
                  blog.author.avatarUrl === ""
                    ? "../images/defaultavapic.png"
                    : `${blog.author.avatarUrl}`
                }
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
                roundedCircle
              />{" "}
              <div style={{ width: "fit-content", display: "flex" }}>
                {blog.author.name} <br /> wrote{" "}
                {moment(blog.updatedAt).fromNow()}
              </div>
            </small>
          </Card.Footer>
        </Card>
      </Col>
    )
  );
};

export default BlogCard;
