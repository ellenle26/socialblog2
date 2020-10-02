import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "components/AlertMsg";
import NotFoundPage from "components/NotFoundPage";
import AddEditBlogPage from "containers/AddEditBlogPage";
import BlogDetailPage from "containers/BlogDetailPage";
import HomePage from "containers/HomePage";
import LoginPage from "containers/LoginPage";
import PublicNavbar from "containers/PublicNavbar";
import RegisterPage from "containers/RegisterPage";
import PrivateRoute from "containers/Routes/PrivateRoute";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
