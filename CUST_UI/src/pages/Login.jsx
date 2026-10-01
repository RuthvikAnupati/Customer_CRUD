import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            const response =
                await api.post(
                    "/auth/login",
                    formData
                );

            const token = response.data;

            localStorage.setItem(
                "token",
                token
            );

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            localStorage.setItem(
                "role",
                payload.role
            );

            localStorage.setItem(
                "email",
                payload.sub
            );

            setMessage(
                "Login successful"
            );

            navigate("/customers");

        } catch (error) {

            console.error(error);

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    error.response.data ||
                    "Invalid email or password"
                );

            } else {

                setMessage(
                    "Unable to connect to server."
                );
            }
        }
    };

    return (

        <div className="form-container">

            <h1>
                Login
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />

                </div>


                <button
                    type="submit"
                    className="form-button"
                >
                    Login
                </button>

            </form>


            {message && (
                <p className="message">
                    {message}
                </p>
            )}

        </div>
    );
}

export default Login;