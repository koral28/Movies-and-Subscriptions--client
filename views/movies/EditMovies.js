import "../../stylesheets/app.css";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import Movies from "../../models/SubscriptionsDB/movies/moviesWSModel";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const EditMovies = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [movieGeners, setMovieGeners] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [moviePremired, setMoviePremired] = useState("");
  let componentMounted = useRef(true); // (3) component is mounted

  useEffect(() => {
    props.data.movies.map((movie) => {
      /*eslint-disable eqeqeq*/
      if (componentMounted) {
        if (props.movieName == movie.Name) {
          setMovieGeners(movie.Genres);
          setMovieImage(movie.Image);
          setMoviePremired(movie.Premiered);
        }
      }
      return () => {
        // This code runs when component is unmounted
        componentMounted.current = false; // (4) set it to false if we leave the page
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data) => {
    let moviesObj = {
      Name: data.name,
      Genres: data.geners,
      Image: data.img,
      Premiered: data.premired,
    };
    Movies.updateMoviesData(moviesObj).then((resp) =>
      props.history.push("/main/moviesMenu")
    );
  };

  return (
    <div>
      <b>Edit Movie: {props.movieName}</b>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name:{" "}
        <input
          type="text"
          name="name"
          defaultValue={props.movieName}
          ref={register({
            required: "Name is required!",
            minLength: { value: 5, message: "Too Short.." },
          })}
        />
        <br />
        Genres:{" "}
        <input
          type="text"
          name="geners"
          defaultValue={movieGeners}
          ref={register}
        />
        <br />
        {errors.name && <p>{errors.name.message}</p>}
        Image url:{" "}
        <input
          type="text"
          name="img"
          defaultValue={movieImage}
          ref={register}
        />
        <br />
        Premired:{" "}
        <input
          type="text"
          name="premired"
          defaultValue={moviePremired}
          ref={register}
        />
        <br />
        <button style={{ marginLeft: 10 }} type="submit">
          Update
        </button>
        <Link to="/main/moviesMenu">
          <button style={{ marginLeft: 10 }}>cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(EditMovies));
