import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const pageSize = 5;

    // Get logged-in user's role
    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchCustomers(currentPage);
    }, [currentPage]);

    const fetchCustomers = async (page) => {

        try {

            const response =
                await api.get(
                    `/getCustListPage?page=${page}&size=${pageSize}`
                );

            setCustomers(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            setMessage("");

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to load customers."
            );
        }
    };

    const handleDelete = async (cid) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this customer?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(`/delCust/${cid}`);

            setMessage(
                "Customer deleted successfully."
            );

            fetchCustomers(currentPage);

        } catch (error) {

            console.error(error);

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    "Unable to delete customer."
                );

            } else {

                setMessage(
                    "Unable to delete customer."
                );
            }
        }
    };

    const handlePrevious = () => {

        if (currentPage > 0) {

            setCurrentPage(
                currentPage - 1
            );
        }
    };

    const handleNext = () => {

        if (currentPage < totalPages - 1) {

            setCurrentPage(
                currentPage + 1
            );
        }
    };

return (
    <div className="customer-container">

        <div className="customer-header">

            <h1>
                Customers
            </h1>

            {role === "ADMIN" && (
                <Link to="/add-customer">
                    <button className="add-button">
                        + Add Customer
                    </button>
                </Link>
            )}

        </div>

        {message && (
            <p className="message">
                {message}
            </p>
        )}

        <table className="customer-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>

                    {role === "ADMIN" && (
                        <th>Actions</th>
                    )}

                </tr>

            </thead>

            <tbody>

                {customers.length > 0 ? (

                    customers.map((customer) => (

                        <tr key={customer.cid}>

                            <td>
                                {customer.cid}
                            </td>

                            <td>
                                {customer.cname}
                            </td>

                            <td>
                                {customer.productName}
                            </td>

                            <td>
                                ₹{customer.price}
                            </td>

                            <td>
                                {customer.quantity}
                            </td>

                            {role === "ADMIN" && (

                                <td>

                                    <Link
                                        to={`/edit-customer/${customer.cid}`}
                                    >
                                        <button className="edit-button">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                customer.cid
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>
                            )}

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan={
                                role === "ADMIN"
                                    ? "6"
                                    : "5"
                            }
                        >
                            No customers found.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

        <p>
            Total Customers: {totalElements}
        </p>

        <div className="pagination">

            <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
            >
                Previous
            </button>

            <span>
                Page {currentPage + 1}
                {" "}
                of
                {" "}
                {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={
                    currentPage >= totalPages - 1
                }
            >
                Next
            </button>

        </div>

    </div>
);
}

export default CustomerList;