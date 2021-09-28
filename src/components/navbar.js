import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Bug Tracker</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Bugs</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/create">Create Bug</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/user">Create User</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;