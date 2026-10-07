import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState("");

    const [searchId, setSearchId] = useState("");
    const [showAll, setShowAll] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const pageSize = 5;

    // Get logged-in user's role
    const role = localStorage.getItem("role");


    // =================================
    // LOAD ALL CUSTOMERS
    // =================================

    useEffect(() => {

        if (showAll) {
            fetchCustomers(currentPage);
        }

    }, [currentPage, showAll]);


    // =================================
    // GET ALL CUSTOMERS WITH PAGINATION
    // =================================

    const fetchCustomers = async (page) => {

        try {

            const response =
                await api.get(
                    `/getCustListPage?page=${page}&size=${pageSize}`
                );

            setCustomers(response.data.content);

            setTotalPages(
                response.data.totalPages
            );

            setTotalElements(
                response.data.totalElements
            );

            setMessage("");

        } catch (error) {

            console.error(error);

            setCustomers([]);
            setTotalPages(0);
            setTotalElements(0);

            setMessage(
                "Unable to load customers."
            );
        }
    };


    // =================================
    // SEARCH CUSTOMER BY ID
    // =================================

    const handleSearch = async () => {

        if (searchId.trim() === "") {

            setMessage(
                "Please enter a Customer ID."
            );

            return;
        }

        try {

            const response =
                await api.get(
                    `/getCust/${searchId}`
                );

            setCustomers([
                response.data
            ]);

            setTotalElements(1);
            setTotalPages(1);
            setCurrentPage(0);

            // Search mode
            setShowAll(false);

            setMessage(
                "Customer found successfully."
            );

        } catch (error) {

            console.error(error);

            setCustomers([]);
            setTotalElements(0);
            setTotalPages(0);

            if (error.response) {

                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    setMessage(
                        error.response.data
                    );

                } else {

                    setMessage(
                        error.response.data?.message ||
                        "Customer not found."
                    );
                }

            } else {

                setMessage(
                    "Unable to find customer."
                );
            }
        }
    };


    // =================================
    // VIEW ALL CUSTOMERS
    // =================================

    const handleViewAll = () => {

        setSearchId("");

        setMessage("");

        setCurrentPage(0);

        setShowAll(true);
    };


    // =================================
    // CLEAR SEARCH / RESULT
    // =================================

    const handleClear = () => {

        setSearchId("");

        setCustomers([]);

        setMessage("");

        setTotalElements(0);
        setTotalPages(0);
        setCurrentPage(0);

        setShowAll(false);
    };


    // =================================
    // DELETE CUSTOMER
    // =================================

    const handleDelete = async (cid) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this customer?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/delCust/${cid}`
            );

            setMessage(
                "Customer deleted successfully."
            );

            // If viewing all customers
            if (showAll) {

                fetchCustomers(
                    currentPage
                );

            } else {

                // If viewing one customer
                setCustomers([]);

                setTotalElements(0);
                setTotalPages(0);

                setSearchId("");
            }

        } catch (error) {

            console.error(error);

            if (error.response) {

                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    setMessage(
                        error.response.data
                    );

                } else {

                    setMessage(
                        error.response.data?.message ||
                        "Unable to delete customer."
                    );
                }

            } else {

                setMessage(
                    "Unable to delete customer."
                );
            }
        }
    };


    // =================================
    // PREVIOUS PAGE
    // =================================

    const handlePrevious = () => {

        if (currentPage > 0) {

            setCurrentPage(
                currentPage - 1
            );
        }
    };


    // =================================
    // NEXT PAGE
    // =================================

    const handleNext = () => {

        if (
            currentPage <
            totalPages - 1
        ) {

            setCurrentPage(
                currentPage + 1
            );
        }
    };


    // =================================
    // UI
    // =================================

    return (

        <div className="customer-container">


            {/* =========================
                HEADER
            ========================== */}

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


            {/* =========================
                SEARCH SECTION
            ========================== */}

            <div className="search-section">

                <h2>
                    Find Customer by ID
                </h2>


                <div className="search-box">

                    <input
                        type="number"
                        min="1"
                        placeholder="Enter Customer ID"
                        value={searchId}
                        onChange={(event) =>
                            setSearchId(
                                event.target.value
                            )
                        }
                    />


                    <button
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>


                    <button
                        className="view-all-button"
                        onClick={handleViewAll}
                    >
                        View All
                    </button>


                    <button
                        className="clear-button"
                        onClick={handleClear}
                    >
                        Clear
                    </button>

                </div>

            </div>


            {/* =========================
                MESSAGE
            ========================== */}

            {message && (

                <p className="message">
                    {message}
                </p>

            )}


            {/* =========================
                CUSTOMER TABLE
            ========================== */}

            {customers.length > 0 && (

                <table className="customer-table">

                    <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Product
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Quantity
                            </th>


                            {role === "ADMIN" && (

                                <th>
                                    Actions
                                </th>

                            )}

                        </tr>

                    </thead>


                    <tbody>

                        {customers.map(
                            (customer) => (

                                <tr
                                    key={
                                        customer.cid
                                    }
                                >

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

                                                <button
                                                    className="edit-button"
                                                >
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

                            )
                        )}

                    </tbody>

                </table>

            )}


            {/* =========================
                INITIAL MESSAGE
            ========================== */}

            {!showAll &&
                customers.length === 0 &&
                !message && (

                    <p>
                        Enter a Customer ID
                        to search, or click
                        "View All".
                    </p>

                )}


            {/* =========================
                TOTAL CUSTOMERS
            ========================== */}

            {customers.length > 0 && (

                <p>
                    Total Customers:{" "}
                    {totalElements}
                </p>

            )}


            {/* =========================
                PAGINATION
            ========================== */}

            {showAll &&
                customers.length > 0 && (

                    <div className="pagination">

                        <button
                            onClick={
                                handlePrevious
                            }
                            disabled={
                                currentPage === 0
                            }
                        >
                            Previous
                        </button>


                        <span>
                            Page{" "}
                            {currentPage + 1}
                            {" "}
                            of{" "}
                            {totalPages}
                        </span>


                        <button
                            onClick={
                                handleNext
                            }
                            disabled={
                                currentPage >=
                                totalPages - 1
                            }
                        >
                            Next
                        </button>

                    </div>

                )}

        </div>
    );
}

export default CustomerList;