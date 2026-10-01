import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditCustomer() {

    const { cid } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cname: "",
        productName: "",
        price: "",
        quantity: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchCustomer();
    }, [cid]);

    const fetchCustomer = async () => {

        try {

            const response =
                await api.get(`/getCust/${cid}`);

            const customer = response.data;

            setFormData({
                cname: customer.cname,
                productName: customer.productName,
                price: customer.price,
                quantity: customer.quantity
            });

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to load customer."
            );
        }
    };

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

            const customerData = {
                cname: formData.cname,
                productName: formData.productName,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            };

            await api.put(
                `/updateCust/${cid}`,
                customerData
            );

            setMessage(
                "Customer updated successfully."
            );

            setTimeout(() => {
                navigate("/customers");
            }, 1000);

        } catch (error) {

            console.error(error);

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    error.response.data ||
                    "Unable to update customer."
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
                Edit Customer
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Customer Name
                    </label>

                    <input
                        type="text"
                        name="cname"
                        value={formData.cname}
                        onChange={handleChange}
                        placeholder="Enter customer name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        min="0"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        min="1"
                        required
                    />

                </div>


                <button
                    type="submit"
                    className="form-button"
                >
                    Update Customer
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

export default EditCustomer;