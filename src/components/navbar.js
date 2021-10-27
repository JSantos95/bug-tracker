import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Bug Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/bug">Bugs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create Bug</Link>
                        </li>
                    </ul>
                    <Link to="/user" class="d-flex">
                        <button type="button" class="btn btn-primary">
                            Login/Register 
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;