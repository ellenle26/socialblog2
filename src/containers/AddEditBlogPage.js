import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  Image,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { blogActions, routeActions } from "redux/actions";

const AddEditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";
  const blogId = params.id;

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: "ellenlinh",
        upload_preset: "gzkez3bx",
      },
      (error, result) => {
        if (result.event === "success") {
          let newImg = result.info.secure_url;
          let newImgArr = [...formData.images, newImg];
          setFormData({ ...formData, images: [...newImgArr] });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  useEffect(() => {
    if (blogId) {
      if (!selectedBlog) {
        dispatch(blogActions.getSingleBlog(blogId));
      }
      setFormData((formData) => ({
        ...formData,
        title: selectedBlog.title,
        content: selectedBlog.content,
        images: selectedBlog.images,
      }));
    }
  }, [blogId, selectedBlog, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(blogActions.createNewBlog(title, content, images));
    } else if (addOrEdit === "Edit") {
      dispatch(
        blogActions.updateBlog(selectedBlog._id, title, content, images)
      );
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(blogActions.deleteBlog(selectedBlog._id, "/"));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [redirectTo, dispatch, history]);

  return (
    <Container>
      <Row style={{ margin: "20px 0" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 style={{ textAlign: "center" }}>{addOrEdit} blog</h3>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
            {formData.images.length > 0 ? (
              formData.images.map((url) => (
                <Image
                  src={url}
                  style={{
                    width: "120px",
                    heigh: "120px",
                    marginBottom: "15px",
                  }}
                />
              ))
            ) : (
              <></>
            )}
            <Button
              variant="info"
              style={{ width: "100%", marginBottom: "15px" }}
              onClick={() => {
                openWidget();
              }}
            >
              Add images
            </Button>
            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button
                  className="mr-3"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="primary">
                  Submit
                </Button>
              )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Blog
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditBlogPage;
