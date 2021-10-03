import axios from "axios";
import React, { useState, useEffect } from "react";

const BugList = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState([]);
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/bugs')
            .then(res => {
                console.log(typeof res.data);
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
        <li className="list-group-item" key={bug["_id"]}>{bug.bugName}</li>
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
                    <h2>Bug List</h2>
                    <ul className="list-group">
                        { bugList }
                    </ul>
                </div>
            }
        </div>        
    )
}

export default BugList;