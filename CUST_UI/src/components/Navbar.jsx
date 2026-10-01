import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-title">
                Customer Management System
            </div>

            <div className="navbar-links">

                <Link to="/">
                    Home
                </Link>

                {!token && (
                    <>
                        <Link to="/signup">
                            Signup
                        </Link>

                        <Link to="/login">
                            Login
                        </Link>
                    </>
                )}

                {token && (
                    <>
                        <Link to="/customers">
                            Customers
                        </Link>

                        <span className="role-text">
                            {role}
                        </span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;