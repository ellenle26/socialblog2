import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import moment from "moment";

const BlogCard = ({ blog }) => {
  console.log(blog);
  return (
    blog && (
      <Col sm={6} style={{ marginBottom: "20px" }}>
        <Card>
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>{" "}
            {blog.images &&
              blog.images.map((item) => (
                <Image src={blog.images[0]} style={{ width: "200px" }} />
              ))}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              <Image
                src={
                  blog.author.avatarUrl === ""
                    ? "../images/defaultavapic.png"
                    : `${blog.author.avatarUrl}`
                }
                style={{ width: "30px" }}
                roundedCircle
              />{" "}
              {blog.author.name} wrote {moment(blog.updatedAt).fromNow()}
            </small>
          </Card.Footer>
        </Card>
      </Col>
    )
  );
};

export default BlogCard;
