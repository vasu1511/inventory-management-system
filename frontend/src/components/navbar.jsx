import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div>
        <Link
          className="text-white me-3"
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className="text-white me-3"
          to="/products"
        >
          Products
        </Link>

        <Link
          className="text-white me-3"
          to="/customers"
        >
          Customers
        </Link>

        <Link
          className="text-white"
          to="/orders"
        >
          Orders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;