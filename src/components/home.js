import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div classname="container">
            <div className="d-flex flex-column">
                <h1 className="display-1 mx-auto">Bug Tracker</h1>
                <p className="mx-auto">Track All Of Your Bugs/Tasks Here!</p>
                <Link to="/user" class="mx-auto">
                    <button type="button" class="btn btn-primary">Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;