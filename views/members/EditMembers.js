import "../../stylesheets/app.css";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Members from "../../models/SubscriptionsDB/members/membersWSModel";

const EditMembers = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  let componentMounted = useRef(true);

  useEffect(() => {
    if (componentMounted) {
      props.members.forEach((member) => {
        /*eslint-disable eqeqeq*/
        if (props.memberName == member.Name) {
          setEmail(member.Email);
          setCity(member.City);
        }
      });
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false if we leave the page
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data) => {
    let memberObj = {
      name: data.name,
      email: data.email,
      city: data.city,
    };
    Members.updateMembersData(memberObj).then((resp) =>
      props.history.push("/main/subscriptionsMenu")
    );
  };
  return (
    <div>
      <b>Edit Member: {props.memberName}</b>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name:{" "}
        <input
          type="text"
          name="name"
          defaultValue={props.memberName}
          ref={register({
            required: "Name is required!",
            minLength: { value: 5, message: "Too Short.." },
          })}
        />
        <br />
        Email:{" "}
        <input type="text" name="email" defaultValue={email} ref={register} />
        <br />
        {errors.name && <p>{errors.name.message}</p>}
        City:{" "}
        <input type="text" name="city" defaultValue={city} ref={register} />
        <br />
        <button type="submit" style={{ marginLeft: 5 }}>
          Update
        </button>
        <Link to="/main/subscriptionsMenu">
          <button style={{ marginLeft: 10 }}>cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(EditMembers);
