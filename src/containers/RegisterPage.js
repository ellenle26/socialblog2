import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authActions, routeActions } from "redux/actions";
import { css } from "@emotion/core";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloud_name: "ellenlinh",
        upload_preset: "gzkez3bx",
      },
      (error, result) => {
        if (result.event === "success") {
          setFormData({ ...formData, avatarUrl: result.info.secure_url });
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, avatarUrl } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    dispatch(authActions.register(name, email, password, avatarUrl));
  };

  return (
    <Container>
      <Row style={{ margin: "20px 0" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 style={{ textAlign: "center" }}>
            <FontAwesomeIcon icon="user" size="sm" /> &nbsp;Create your account
          </h3>
        </Col>
      </Row>
      {!message ? (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Button
              variant="info"
              style={{ width: "100%", marginBottom: "15px" }}
              onClick={() => {
                openWidget();
              }}
            >
              Add avatar
            </Button>
            <div style={{ textAlign: "center" }}>
              <Image
                src={formData.avatarUrl}
                style={{ width: "120px", heigh: "120px", marginBottom: "15px" }}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="form-text text-danger">{errors.name}</small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="form-text text-danger">
                    {errors.email}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className="btn-block" type="submit" variant="primary">
                Register
              </Button>

              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={{ span: 6, offset: 3 }} style={{ textAlign: "center" }}>
            <Alert variant="success">{message}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RegisterPage;
