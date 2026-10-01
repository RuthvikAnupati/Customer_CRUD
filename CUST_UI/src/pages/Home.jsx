function Home() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return (
        <div className="home-container">

            <div className="home-card">

                <h1>
                    Customer Management System
                </h1>

                <p>
                    Manage customer information easily
                    and securely.
                </p>

                {!token && (
                    <div>

                        <p>
                            Please login to manage customers.
                        </p>

                    </div>
                )}

                {token && (
                    <div>

                        <h3>
                            Welcome!
                        </h3>

                        <p>
                            You are logged in as:
                            {" "}
                            <strong>{role}</strong>
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Home;