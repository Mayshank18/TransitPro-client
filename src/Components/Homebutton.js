import { withRouter } from "react-router";
import "../Styling/login.css";
import "../App.css";
import "./Homebutton.css"
const Homebutton = withRouter(({ history }) => {
  return (
    <div>
     <div className="button-parent">
        <button
          onClick={() => history.push("/login")}
          className={" "}
        >
          Login
        </button>
      
      
        <button onClick={() => history.push("/signup")}>Signup</button>
        </div>
    </div>
  );
});

export default Homebutton;
