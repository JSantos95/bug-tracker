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
                console.log(res.data);
                setBugs([...res.data]);
            });
    }, [user])

    const signIn = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/users')
            .then((res) => {
                const index = res.data.map(user => user.username).indexOf(username)
                index !== -1 ?
                    setUser(res.date[index]) :
                    console.log("Not a valid username");   
            })
    }

    const bugList = bugs.map((bug) =>
        <Bug key={bug["_id"]} bug={bug} />
    )

    return ( 
        <div>
            {
                user.length !== 0 ?
                <div>
                    <h2>Sign In to see your bugs!</h2>
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
                    <h2>Bug List</h2><br/>
                    <div className="row row-cols-5">
                        <ul className="list-group col">
                            <h4>Unassgined</h4>
                            { bugList }
                        </ul>
                        <ul className="list-group col">
                            <h4>To Do</h4>
                            { bugList }
                        </ul>
                        <ul className="list-group col">
                            <h4>In Progress</h4>
                            { bugList }
                        </ul>
                        <ul className="list-group col">
                            <h4>QA</h4>
                            { bugList }
                        </ul>
                        <ul className="list-group col">
                            <h4>Complete</h4>
                            { bugList }
                        </ul>
                    </div>
                </div>
            }
        </div>        
    )
}

export default BugList;