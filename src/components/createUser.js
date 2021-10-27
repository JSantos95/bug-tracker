import React, { useState } from "react";
import axios from "axios";

// if newUser prop is true this form will register a user, else for login 
const CreateUser = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authentication = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        }
        console.log(user);

        if(props.newUser) {
            user.email = email;
            axios.post('http://localhost:5000/api/auth/register', user)
            .then((res) => console.log(res.data))
        } else {
            axios.post('http://localhost:5000/api/auth/login', user)
            .then((res) => console.log(res.data))
        }
    }

    return (
        <div className="container-fluid">
            <div className="col-5 mx-auto">
                { props.newUser ? <h2>Create New Account</h2> : <h2>Log In</h2> }
                <div className="container-fluid">
                    <form onSubmit={authentication}>
                        {
                            props.newUser && 
                            <div className="mb-3">
                                <label htmlFor="email">Email: </label>
                                <input type="email" value={email} name="email" 
                                    className="form-control" placeholder="Enter Email"
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </div>
                        }

                        <div className="mb-3">
                            <label htmlFor="username">Username: </label>
                            <input type="text" value={username} name="username" 
                                className="form-control" placeholder="Enter Username"
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password: </label>
                            <input type="password" value={password} name="password" 
                                className="form-control" placeholder="Enter Password"
                                minlength="5" required
                                onChange={e => setPassword(e.target.value)} 
                            />
                            {
                                props.newUser && 
                                <span id="passwordHelpInline" className="form-text">
                                    Must at least 5 characters long
                                </span>
                            }
                        </div>

                        <input className="btn btn-primary" type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;