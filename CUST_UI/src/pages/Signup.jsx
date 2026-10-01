import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER"
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
                    "/auth/signup",
                    formData
                );

            setMessage(response.data);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error(error);

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    error.response.data ||
                    "Signup failed."
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
                Sign Up
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />

                </div>


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


                <div className="form-group">

                    <label>
                        Role
                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >

                        <option value="USER">
                            USER
                        </option>

                        <option value="ADMIN">
                            ADMIN
                        </option>

                    </select>

                </div>


                <button
                    type="submit"
                    className="form-button"
                >
                    Sign Up
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

export default Signup;