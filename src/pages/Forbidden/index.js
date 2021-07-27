import { Link } from "react-router-dom";
export const Forbidden = () => {
    return (
        <center>
            <img src="https://media.giphy.com/media/njYrp176NQsHS/giphy.gif"></img>
            <h2>Uh oh!Looks like you are not supposed to be here</h2>
            <h3>Let's get you back to the <Link to="/">main page</Link></h3>
        </center>
    );
}