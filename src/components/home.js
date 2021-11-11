import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="masthead" style={{ height: "70vh", display: "grid", placeItems: "center"}}>
                <div className="d-flex mb-5 flex-column" style={{zIndex: "1100"}}>
                    <h1 className="mx-auto">Bug Tracker</h1>
                    <p className="mx-auto">Track All Of Your Bugs/Tasks Here!</p>
                    <Link className="mx-auto" to="/user">
                        <button type="button" className="btn btn-primary">Sign Up</button>
                    </Link>
                </div>
            </div>
            <section className="features-icons bg-light text-center pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"></div>
                                <h3>Create</h3>
                                <p className="lead mb-0">Create and Maintain Bugs, Tasks, or Features</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="bi-layers m-auto text-primary"></i></div>
                                <h3>Maintain</h3>
                                <p className="lead mb-0">Save the progress of your bug through 5 development stages</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div className="features-icons-icon d-flex"><i className="bi-terminal m-auto text-primary"></i></div>
                                <h3>Easy to Use</h3>
                                <p className="lead mb-0">Create an account and your ready to start!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container" id="Soon">
                <div className="d-flex mt-5 mb-5 flex-column">
                    <h1 className="mx-auto">Features Coming Soon</h1>
                    <p className="mx-auto">Here are some features we're working on: </p>
                    <ul className="mx-auto">
                        <li>Password Reset</li>
                        <li>Groups to code with your team/company</li>
                        <li>Due Dates</li>
                        <li>Email Noifications</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Home;