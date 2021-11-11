import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Bug from "./bug";

const BugList = () => {
    const [username, setUsername] = useState('');
    const [bugs, setBugs] = useState([]);
    const [toAuth, setToAuth] = useState(false);
    
    useEffect(() => {
        axios.get('https://bug-tracker-project1.herokuapp.com/api/private', {headers: {Authorization: `Bearer ${sessionStorage.token}`}})
            .then((res) => {
                setUsername(res.data.data.username);
                axios.get(`https://bug-tracker-project1.herokuapp.com/bugs/user/${res.data.data.username}`)
                    .then(res => {
                        setBugs([...res.data]);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [])

    const unassignedList = bugs
        .filter((bug) => bug.status === "Unassigned")
        .map((bug) => <Bug key={bug["_id"]} bug={bug} />)

    const toDoList = bugs
        .filter((bug) => bug.status === "To Do")
        .map((bug) => <Bug key={bug["_id"]} bug={bug} />)

    const inProgressList = bugs
        .filter((bug) => bug.status === "In Progress")
        .map((bug) => <Bug key={bug["_id"]} bug={bug} />)
    
    const qaList = bugs
        .filter((bug) => bug.status === "QA")
        .map((bug) => <Bug key={bug["_id"]} bug={bug} />)
    
    const completeList = bugs
        .filter((bug) => bug.status === "Complete")
        .map((bug) => <Bug key={bug["_id"]} bug={bug} />)

    return ( 
        <div>
            {toAuth && <Redirect to="/user" />}
            {
                !sessionStorage.token ?
                <div className="container">
                    <div className="col-5 mx-auto">
                        <h1>Sign In to see your bugs!</h1>
                        <button className="btn btn-primary" onClick={setToAuth(true)}>
                            Sign In
                        </button>
                    </div>
                </div>
                :
                <div className="container mt-4">
                    <h1 className="text-capitalize">{ username } Bug List</h1>
                    <br/>
                    <div className="d-grid gap-5">
                        <div className="row row-cols-3 pt-1" style={{minHeight: "35vh"}}>
                            <ul className="list-group col">
                                <h4 className="align-self-center">To Do</h4>
                                { toDoList }
                            </ul>
                            <ul className="list-group col">
                                <h4 className="align-self-center">In Progress</h4>
                                { inProgressList }
                            </ul>
                            <ul className="list-group col">
                                <h4 className="align-self-center">Waiting On QA</h4>
                                { qaList }
                            </ul>
                        </div>
                        <div className="row row-cols border-top pt-1">
                            <ul className="list-group col ">
                                <h4 className="align-self-center">Unassgined</h4>
                                <div className="row row-cols-3">
                                    { unassignedList }
                                </div>
                            </ul>
                        </div>
                        <div className="row row-cols border-top pt-1">
                            <ul className="list-group col">
                                <h4 className="align-self-center">Completed</h4>
                                <div className="row row-cols-3">
                                    { completeList }
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>        
    )
}

export default BugList;