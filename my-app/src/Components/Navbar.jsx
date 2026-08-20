import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="flex p-2">
      <div>Logo</div>
      <ul className="flex gap-2">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>about</li>
        </Link>
      </ul>
    </div>
  );
};
