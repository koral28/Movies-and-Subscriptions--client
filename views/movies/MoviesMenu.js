import { Link, Route, Switch } from "react-router-dom";
import AddMovies from "./AddMovies";
import AllMovies from "./AllMovies";
import EditMovies from "./EditMovies";
import DeleteMovies from "./DeleteMovies";
import Movies from "../../models/SubscriptionsDB/movies/moviesWSModel";
import Members from "../../models/SubscriptionsDB/members/membersWSModel";
import Subscriptions from "../../models/SubscriptionsDB/subscriptions/subscriptionsWSModel";
import "../../stylesheets/style.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const MoviesMenu = (props) => {
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  let componentMounted = useRef(true); // (3) component is mounted

  useEffect(() => {
    if (componentMounted) {
      Movies.getMoviesData().then((resp) =>
        props.dispatch({
          type: "SET",
          payload: resp.data,
        })
      );
      Members.getMembersData().then((resp) => setMembers(resp.data));
      Subscriptions.getSubscriptionsData().then((resp) =>
        setSubscriptions(resp.data)
      );
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false if we leave the page
    };
  }, [props]);

  return (
    <div>
      <div style={{ marginTop: 50 }}>
        <ul className="Movies">
          <h3>Movies</h3>
          <Link to="/main/moviesMenu/allMovies">
            <button>All Movies</button>
          </Link>
          <Link to="/main/moviesMenu/addMovies">
            <button style={{ marginLeft: 5, marginRight: 5 }}>Add Movie</button>
          </Link>
          <Switch>
            <Route
              path="/main/moviesMenu/allMovies"
              render={() => (
                <AllMovies subscriptions={subscriptions} members={members} />
              )}
            />
            <Route path="/main/moviesMenu/addMovies" component={AddMovies} />
            <Route
              path="/main/moviesMenu/editMovies/:movie"
              render={(props) => (
                <EditMovies movieName={props.match.params.movie} />
              )}
            />
            <Route
              path="/main/moviesMenu/deleteMovies/:movie"
              render={(props) => (
                <DeleteMovies movieName={props.match.params.movie} />
              )}
            />
          </Switch>
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MoviesMenu);
