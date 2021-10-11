import axios from "axios";
import React, { useState, useEffect } from "react";
import Bug from "./bug";

const BugList = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState([]);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/bugs')
            .then(res => {
                setBugs([...res.data]);
            });
    }, [user])

    const signIn = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/users')
            .then((res) => {
                const index = res.data.map(user => user.username).indexOf(username);
                index >= 0 ?
                    setUser(res.data[index]) :
                    console.log("Not a valid username");   
            })
    }

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
            {
                user.length === 0 ?
                <div>
                    <h1>Sign In to see your bugs!</h1>
                    <form onSubmit={signIn}>
                        <div className="mb-3">
                            <label htmlFor="username">Username: </label>
                            <input type="text" value={username} name="username" 
                                className="form-control" placeholder="Enter Username"
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </div>

                        <input className="btn btn-primary" type="submit" value="Sign-In"/>
                    </form>
                </div>
                :
                <div>
                    <h1>Bug List</h1>
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