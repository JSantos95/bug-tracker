import React, { useState } from "react";
import classNames from "classnames";
import ViewBug from "./viewBug";

const Bug = ({ bug }) => {
    const [viewBug, setViewBug] = useState(false);

    const shade = classNames (
        "list-group-item", "list-group-item-action", {
        "list-group-item-success": bug.priority === "Low",
        "list-group-item-warning": bug.priority === "med",
        "list-group-item-danger": bug.priority === "high",
    })

    return (
        <div>
            <li className="d-flex flex-row position-relative">
                <a href="#" className={shade}>{ bug.bugName }</a>
            </li>
        </div>
    )
}

export default Bug;