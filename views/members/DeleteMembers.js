import "../../stylesheets/app.css";
import { useEffect, useRef } from "react";
import Members from "../../models/SubscriptionsDB/members/membersWSModel";
import { withRouter } from "react-router-dom";

const DeleteMembers = (props) => {
  let componentMounted = useRef(true);
  useEffect(() => {
    if (componentMounted) {
      props.members.forEach((member) => {
        /*eslint-disable eqeqeq*/
        if (props.memberName == member.Name) {
          Members.deleteMembersData(member.Name).then((resp) =>
            props.history.push("/main/subscriptionsMenu")
          );
        }
      });
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false if we leave the page
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
};
export default withRouter(DeleteMembers);
