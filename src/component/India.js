import {Link, NavLink } from "react-router-dom";

function India() {
  return (
    <div>

<h1>Welcome to India</h1>

        <Link to="/up">UP</Link>
      <NavLink 
        to="/bihar"
        className={({ isActive }) => isActive ? "active" : ""}>
        Bihar
      </NavLink>
      
    </div>
  );
}

export default India;
