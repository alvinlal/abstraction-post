import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Categories from "./components/Categories";
import Recommendations from "./components/Recommendations";
import Bookmarks from "./components/Bookmarks";
import MyPosts from "./components/MyPosts";
import NewPost from "./components/NewPost";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import PostView from "./components/PostView";
import ErrorBoundary from "./components/ErrorBoundary";

const Routes = () => {
  return (
    <div className="apps">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={(props) => <Home {...props} />} />
          <Route
            path="/search"
            exact
            component={(props) => <Search {...props} />}
          />
          <Route
            exact
            path="/categories"
            component={(props) => <Categories {...props} />}
          />
          <Route
            exact
            path="/recommendations"
            component={(props) => <Recommendations {...props} />}
          />
          <Route
            exact
            path="/bookmarks"
            component={(props) => <Bookmarks {...props} />}
          />
          <Route
            exact
            path="/signin"
            component={(props) => <Signin {...props} />}
          />
          <Route
            exact
            path="/signup"
            component={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/newpost"
            component={(props) => <NewPost {...props} />}
          />
          <Route
            exact
            path="/post/:id"
            component={(props) => (
              <ErrorBoundary>
                <PostView {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default Routes;
