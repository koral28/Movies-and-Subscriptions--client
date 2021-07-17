import "../../stylesheets/style.css";
import { useForm } from "react-hook-form";
import Members from "../../models/SubscriptionsDB/members/membersWSModel";
import { withRouter } from "react-router-dom";

const AddSubscriptions = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    let memberObj = {
      name: data.name,
      email: data.email,
      city: data.city,
    };

    Members.saveMembersData(memberObj).then((resp) =>
      props.history.push("/main/subscriptionsMenu")
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        Name:{" "}
        <input
          type="text"
          name="name"
          ref={register({
            required: "Name is required!",
            minLength: { value: 5, message: "Too Short.." },
          })}
        />
        <br />
        Email: <input type="text" name="email" ref={register} />
        <br />
        City:{" "}
        <input
          type="text"
          name="city"
          ref={register({
            required: "Name is required!",
            minLength: { value: 5, message: "Too Short.." },
          })}
        />
        <br />
        {errors.name && <p>{errors.name.message}</p>}
        <button>Save</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default withRouter(AddSubscriptions);
