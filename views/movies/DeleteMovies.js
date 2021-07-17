import "../../stylesheets/app.css";
import { useEffect } from "react";
import Movies from "../../models/SubscriptionsDB/movies/moviesWSModel";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const DeleteMovies = (props) => {
  useEffect(() => {
    props.data.movies.map((movie) => {
      /*eslint-disable eqeqeq*/
      if (props.movieName == movie.Name) {
        Movies.deleteMoviesData(movie.Name).then((resp) =>
          props.history.push("/main/moviesMenu")
        );
      }
      return <div></div>;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
};
export default withRouter(connect(mapStateToProps)(DeleteMovies));
