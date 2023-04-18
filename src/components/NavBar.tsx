import { Link } from "react-router-dom";
import "../css/NavBar.css";

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <div className="logo"></div>
        </Link>
      </div>
    </nav>
  );
}
