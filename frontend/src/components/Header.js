import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { getUserInfo } from "../Helpers/localStorage";
import { signOut } from "../Helpers/apiCalls";

function Header() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const setUserState = () => {
    if (!user) {
      const userState = getUserInfo();
      if (userState) {
        setUser(userState);
      }
    }
  };
  const SignOut = () => {
    signOut()
      .then((response) => {
        if (response?.status == "ok") {
          localStorage.clear();
          setUser(null);
        }
        window.location.reload();
      })
      .catch();
  };
  useEffect(() => {
    setUserState();
  });
  return (
    <div className="header">
      <div className="header-title">
        <a href="/">AbstractionPost</a>
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/search" className="nav-link">
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/recommendations" className="nav-link">
            Recommendations
          </Link>
        </li>

        {user ? (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/bookmarks" className="nav-link">
                Bookmarks
              </Link>
            </li>
            <li className="dropDown">
              <img
                src={require("../assets/profilePic.png")}
                alt="profile pic"
              />
              <div className="dropdownContentSettings">
                <div className="arrow-up"></div>

                <Link to="#" className="dropButtonSettings">
                  MY POSTS
                </Link>

                <Link to="/newpost" className="dropButtonSettings">
                  NEW POST
                </Link>
                <button className="dropButtonSettings" onClick={SignOut}>
                  SIGNOUT
                </button>
              </div>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/signin" className="nav-link">
                Singin
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
}
export default withRouter(Header);
{
  /* <li className="dropDown">
<img src={require("../assets/profilePic.png")} alt="profile pic" />
<div className="dropdownContentSettings">
  <div className="arrow-up"></div>

  <a href="#" className="dropButtonSettings">
    MY POSTS
  </a>

  <a href="#" className="dropButtonSettings">
    NEW POST
  </a>

  <a href="#" className="dropButtonSettings">
    SIGNOUT
  </a>
</div>
</li> */
}

// <li className="nav-item">
// <Link to="/signin" className="nav-link">
//   Singin
// </Link>
// </li>
// <li className="nav-item">
// <Link to="/signup" className="nav-link">
//   Signup
// </Link>
// </li>
