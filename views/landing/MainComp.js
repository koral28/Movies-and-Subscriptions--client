import { Link, Route, Switch } from "react-router-dom";
import "../../stylesheets/app.css";
import MoviesMenu from "../movies/MoviesMenu";
import SubscriptionsMenu from "../members/SubscriptionsMenu";
import UsersMenu from "../users/UsersMenu";

import { useContext } from "react";
import { sessionContext } from "./context";

const MainComp = (props) => {
  const [sessionData] = useContext(sessionContext);
  if (sessionData.permissionsOfUser != null) {
    return (
      <div>
        <h5>Hello {sessionData.userNameLoggedIn}!</h5>
        <h1>Movies - Subscriptions Web Site</h1>

        {sessionData.permissionsOfUser.includes("CreateMovies") ||
        sessionData.permissionsOfUser.includes("DeleteMovies") ||
        sessionData.permissionsOfUser.includes("ViewMovies") ||
        sessionData.permissionsOfUser.includes("UpdateMovies") ? (
          <Link to="/main/moviesMenu">
            <button>Movies</button>
          </Link>
        ) : (
          ""
        )}
        {sessionData.permissionsOfUser.includes("ViewSubscriptions") ||
        sessionData.permissionsOfUser.includes("DeleteSubscriptions") ||
        sessionData.permissionsOfUser.includes("CreateSubscriptions") ||
        sessionData.permissionsOfUser.includes("UpdateSubscriptions") ? (
          <Link to="/main/subscriptionsMenu">
            <button style={{ marginLeft: 10 }}>Subscriptions</button>
          </Link>
        ) : (
          ""
        )}
        {sessionData.adminOrUser === "admin" ? (
          <Link to="/main/UsersMenu">
            <button style={{ marginLeft: 10 }}>Users Management</button>
          </Link>
        ) : (
          ""
        )}
        <Link to="/">
          <button style={{ marginLeft: 10 }}>Log Out</button>
        </Link>
        <Switch>
          <Route path="/main/moviesMenu" component={MoviesMenu} />
          <Route path="/main/subscriptionsMenu" component={SubscriptionsMenu} />
          <Route path="/main/UsersMenu" component={UsersMenu} />
        </Switch>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default MainComp;
