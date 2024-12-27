import { Link } from "react-router";

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>Oops! The page you are looking for doesn't exist.</p>
            <Link to="/" >Go back home</Link>
        </div>
    );
}
