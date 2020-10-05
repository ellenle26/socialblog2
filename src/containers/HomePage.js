import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BlogCard from "components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "redux/actions";
import { useHistory, Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import PaginationBar from "components/PaginationBar";

const HomePage = () => {
  const history = useHistory();
  let blogList = useSelector((state) => state.blog.blogs);
  let loading = useSelector((state) => state.blog.loading);
  let [activePage, setActivePage] = useState(1);
  let totalPageNum = useSelector((state) => state.blog.totalPageNum);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const gotoBlogDetail = (index) => {
    history.push(`/blogs/${index}`);
  };

  useEffect(() => {
    dispatch(blogActions.getBlogList(activePage));
  }, [dispatch, activePage]);

  return (
    <Container>
      <Row style={{ margin: "20px 0" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 style={{ textAlign: "center" }}>What's new ?</h3>
        </Col>
      </Row>
      {isAuthenticated && (
        <Row style={{ margin: "0 0 20px 0", textAlign: "center" }}>
          <Col>
            <Link to="/blog/add">
              <Button variant="light">How you doin ?</Button>
            </Link>
          </Col>
        </Row>
      )}
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ScaleLoader color="black" size={150} loading={true} />
        ) : (
          blogList.map((blog) => (
            <BlogCard
              blog={blog}
              key={blog._id}
              gotoBlogDetail={gotoBlogDetail}
            />
          ))
        )}
      </Row>
      {loading ? (
        <></>
      ) : (
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PaginationBar
            activePage={activePage}
            totalPageNum={totalPageNum}
            setActivePage={setActivePage}
          />
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
