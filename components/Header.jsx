import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon
import "../styles/Header.css"; // Ensure correct path to your CSS

const Header = () => {
  return (
    <nav className="header">
      <div className="nav-left">
        <h1 className="logo">QuickKart</h1>
        <ul className="nav-links">
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
        </ul>
      </div>
      <div className="nav-center">
        <input type="text" className="search-bar" placeholder="Search for products..." />
      </div>
      <div className="nav-right">
        <Link to="/signin" className="nav-signin">Sign In</Link>
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
