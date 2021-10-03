import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
    const [username, setUsername] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then((res) => console.log(res.data));
    }

    return (
        <div>
            <h2>Create A New User</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="username">Username: </label>
                    <input type="text" value={username} name="username" 
                        className="form-control" placeholder="Enter Username"
                        onChange={e => setUsername(e.target.value)} 
                    />
                </div>

                <input className="btn btn-primary" type="submit"/>
            </form>
        </div>
    )
}

export default CreateUser;