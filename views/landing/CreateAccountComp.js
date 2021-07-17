import { useForm } from "react-hook-form";
import "../../stylesheets/app.css";
import CreateAccount from "../../models/Utils/createAccount";
import { useContext } from "react";
import { sessionContext } from "./context";

const CreateAccountComp = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [, setSessionData] = useContext(sessionContext);

  const onSubmit = (data) => {
    CreateAccount.createAccount(data.username, data.password).then((resp) => {
      if (resp.data.success) {
        setSessionData(resp.data.mySession);
        props.history.push("/main");
      } else {
        props.history.push("/");
      }
    });
  };

  return (
    <div>
      <h1>Movies - Subscriptions Web Site</h1>
      <h3>Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        User name:{" "}
        <input
          type="text"
          name="username"
          ref={register({
            required: "Name is required!",
            minLength: { value: 5, message: "Too Short.." },
          })}
        />
        <br />
        Password: <input type="text" name="password" ref={register} />
        <br />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="submit" value="Create" />
        <br />
      </form>
    </div>
  );
};

export default CreateAccountComp;
